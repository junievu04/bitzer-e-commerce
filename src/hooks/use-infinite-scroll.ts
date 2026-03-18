"use client";

import { throttle } from "lodash-es";
import { RefObject, useEffect, useRef, useState } from "react";

const useInfiniteScroll = (
  ref?: RefObject<HTMLElement | null>,
  scrollThreshold: number = 200,
  disabled: boolean = false,
) => {
  const disabledRef = useRef(disabled);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    const handler = throttle(() => {
      if (disabledRef.current) {
        return;
      }
      if (ref?.current) {
        const boundingClient = ref.current.getBoundingClientRect();
        setIsBottom(
          boundingClient.bottom <= window.innerHeight + scrollThreshold,
        );
        return;
      }
      setIsBottom(
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - scrollThreshold,
      );
    }, 200);

    window.addEventListener("scroll", handler, false);
    return () => {
      window.removeEventListener("scroll", handler, false);
    };
  }, [ref, scrollThreshold, disabled]);

  return isBottom;
};

export default useInfiniteScroll;
