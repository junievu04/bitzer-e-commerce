"use client";

import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import useEmblaCarousel from "embla-carousel-react";
import { forwardRef, ReactNode, useCallback, useEffect, useState } from "react";
import PaginationBullet from "./pagination-bullet";
import ScrollButton from "./scroll-button";

// ─── Types ────────────────────────────────────────────────────────────────────

/** How many items are visible at once — controls flex basis of each slide. */
export type CarouselVariant =
  | "single" // 1 item full-width (hero, featured)
  | "auto" // items size themselves
  | "two" // 2 visible on desktop
  | "three" // 3 visible on desktop
  | "four"; // 4 visible on desktop

export interface CarouselProps {
  children: ReactNode;
  variant?: CarouselVariant;
  /** Show prev/next arrow buttons */
  navigation?: boolean;
  /** Show pagination dots */
  pagination?: boolean;
  /** Gap between slides in px */
  gap?: number;
  /** Loop around at the ends */
  loop?: boolean;
  /** Callback with the current selected index */
  onChange?: (index: number) => void;
  /**
   * "outside" (default) — buttons float just outside the track edges (left="-5" / right="-5")
   * "inside"            — buttons sit inside the track edges (left="4" / right="4"), white style
   */
  navPosition?: "outside" | "inside";
}

// ─── Slide flex-basis map ─────────────────────────────────────────────────────

const BASIS: Record<CarouselVariant, string> = {
  single: "0 0 100%",
  auto: "0 0 auto",
  two: "0 0 calc(50% - 8px)",
  three: "0 0 calc(33.333% - 11px)",
  four: "0 0 calc(25% - 12px)",
};

// On mobile everything collapses to single or two
const BASIS_MOBILE: Record<CarouselVariant, string> = {
  single: "0 0 100%",
  auto: "0 0 auto",
  two: "0 0 calc(100% - 16px)",
  three: "0 0 calc(85% - 16px)",
  four: "0 0 calc(85% - 16px)",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      variant = "three",
      navigation = true,
      pagination = false,
      gap = 16,
      loop = false,
      onChange,
      navPosition = "outside",
    },
    _ref,
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: "start",
      containScroll: "trimSnaps",
      loop,
      duration: 25,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const update = useCallback(() => {
      if (!emblaApi) return;
      const i = emblaApi.selectedScrollSnap();
      setSelectedIndex(i);
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      onChange?.(i);
    }, [emblaApi, onChange]);

    useEffect(() => {
      if (!emblaApi) return;
      const onInit = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
        onChange?.(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("init", onInit);
      emblaApi.on("select", update);
      emblaApi.on("reInit", update);
      emblaApi.on("scroll", update);

      if (emblaApi.internalEngine()) {
        onInit();
      }

      return () => {
        emblaApi.off("init", onInit);
        emblaApi.off("select", update);
        emblaApi.off("reInit", update);
        emblaApi.off("scroll", update);
      };
    }, [emblaApi, update, onChange]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const snapCount = emblaApi?.scrollSnapList().length ?? 0;

    return (
      <Stack gap="5">
        {/* ── Track + absolute nav buttons ────────────────────────────── */}
        <Box position="relative">
          {/* Prev — absolute left, vertically centered */}
          {navigation && (
            <Box
              position="absolute"
              left={navPosition === "inside" ? "4" : "-5"}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
            >
              <ScrollButton
                direction="prev"
                disabled={!canPrev}
                onClick={scrollPrev}
              />
            </Box>
          )}

          <Box overflow="hidden" ref={emblaRef}>
            <Box
              display="flex"
              style={{ gap: `${gap}px` }}
              className={css({
                "& > *": {
                  flex: {
                    base: BASIS_MOBILE[variant],
                    md: BASIS[variant],
                  },
                  minW: "0",
                },
              })}
            >
              {children}
            </Box>
          </Box>

          {/* Next — absolute right, vertically centered */}
          {navigation && (
            <Box
              position="absolute"
              right={navPosition === "inside" ? "4" : "-5"}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
            >
              <ScrollButton
                direction="next"
                disabled={!canNext}
                onClick={scrollNext}
              />
            </Box>
          )}
        </Box>

        {/* ── Pagination dots ─────────────────────────────────────────── */}
        {pagination && snapCount > 1 && (
          <Flex justify="center" gap="1.5" h="2">
            {emblaApi
              ?.scrollSnapList()
              .map((_, i) => (
                <PaginationBullet
                  key={i}
                  active={i === selectedIndex}
                  onClick={() => emblaApi.scrollTo(i)}
                />
              ))}
          </Flex>
        )}
      </Stack>
    );
  },
);

Carousel.displayName = "Carousel";

export default Carousel;
