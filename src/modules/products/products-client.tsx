"use client";

import Button from "@/components/button";
import { House, MagnifyingGlass } from "@/components/icons";
import Link from "@/components/link";
import { Spinner } from "@/components/spinner";
import Text from "@/components/text";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { ProductWrapper } from "@/modules/products";
import {
  CategoryDTO,
  ProductCard,
  ProductsDTO,
  ProductSearchParams,
  ProductSortType,
} from "@/types/api";
import { Box, Center, Stack } from "@/vendors/styled-system/jsx";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash-es";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import fetchProducts from "./utils/fetch-products";

interface Props {
  products?: ProductsDTO | null;
  categories?: CategoryDTO[] | [];
}

const initialSearchParams: ProductSearchParams = {
  text: undefined,
  categorySlug: undefined,
  sortBy: "default",
  next: null,
};

export default function ProductsClient({
  products: initialData,
  categories,
}: Props) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isBottom = useInfiniteScroll(elementRef);

  const [allProducts, setAllProducts] = useState<ProductCard[]>(
    initialData?.products ?? [],
  );
  const [next, setNext] = useState<string | null>(initialData?.next ?? null);
  const [searchParams, setSearchParams] =
    useState<ProductSearchParams>(initialSearchParams);
  const [fetchEnabled, setFetchEnabled] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => fetchProducts({ searchParams }),
    enabled: fetchEnabled,
    throwOnError: false,
  });

  // Chỉ bật fetch sau lần đầu
  useEffect(() => {
    if (searchParams !== initialSearchParams) {
      setFetchEnabled(true);
    }
  }, [searchParams]);

  // Scroll bottom → load thêm
  useEffect(() => {
    if (!isLoading && next && isBottom) {
      setSearchParams((prev) => ({ ...prev, next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  // Xử lý data trả về
  useEffect(() => {
    if (!data) return;
    setAllProducts((prev) =>
      searchParams.next ? [...prev, ...data.products] : data.products,
    );
    setNext(data.next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateUrl = useCallback(
    (categorySlug: string | null, text?: string, sortBy?: ProductSortType) => {
      const params = new URLSearchParams(urlSearchParams.toString());
      if (categorySlug) {
        params.set("category", categorySlug);
      } else {
        params.delete("category");
      }
      if (text !== undefined) {
        if (text) {
          params.set("text", text);
        } else {
          params.delete("text");
        }
      }
      if (sortBy !== undefined) {
        if (sortBy && sortBy !== "default") {
          params.set("sortBy", sortBy);
        } else {
          params.delete("sortBy");
        }
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, urlSearchParams],
  );

  const handleFilterChange = useCallback(
    (newSortBy: ProductSortType, newCategory: string | null) => {
      updateUrl(newCategory, undefined, newSortBy);
      setSearchParams({
        text: urlSearchParams.get("text") ?? undefined,
        categorySlug: newCategory ?? undefined,
        sortBy: newSortBy,
        next: null,
      });
    },
    [urlSearchParams, updateUrl],
  );

  const handleSearch = useCallback(
    (text: string) => {
      updateUrl(urlSearchParams.get("category") ?? null, text);
      setSearchParams({
        text: text || undefined,
        categorySlug: urlSearchParams.get("category") ?? undefined,
        sortBy: searchParams.sortBy,
        next: null,
      });
    },
    [urlSearchParams, searchParams.sortBy, updateUrl],
  );

  useEffect(() => {
    const category = urlSearchParams.get("category");
    const text = urlSearchParams.get("text");
    const sortBy = urlSearchParams.get("sortBy");

    if (!category && !text && !sortBy) {
      setSearchParams(initialSearchParams);
      setAllProducts(initialData?.products ?? []);
      setNext(initialData?.next ?? null);
      setFetchEnabled(false);
    }
  }, [urlSearchParams]);

  return (
    <Box ref={elementRef}>
      <ProductWrapper
        products={allProducts}
        categories={categories ?? []}
        totalLoaded={allProducts.length}
        categorySlug={urlSearchParams.get("category") ?? ""}
        sortBy={searchParams.sortBy ?? "default"}
        searchText={urlSearchParams.get("text") ?? ""}
        onSortChange={(s) =>
          handleFilterChange(s, urlSearchParams.get("category") ?? null)
        }
        onCategoryChange={(c) =>
          handleFilterChange(searchParams.sortBy ?? "default", c)
        }
        onSearch={handleSearch}
      />

      {isLoading && (
        <Center w="100%">
          <Spinner my="1" />
        </Center>
      )}

      {!isLoading && next === null && isEmpty(allProducts) && (
        <Center py="16">
          <Stack gap="4" align="center">
            <MagnifyingGlass size="lg" tone="secondary" />
            <Text variant="paragraph-1" weight="bold" tone="primary">
              Không tìm thấy sản phẩm
            </Text>
            <Text variant="paragraph-2" tone="secondary" textAlign="center">
              Hiện chưa có sản phẩm nào. Hãy quay về trang chủ để khám phá thêm!
            </Text>
            <Link href="/">
              <Button variant="secondary" leftIcon={House}>
                Về trang chủ
              </Button>
            </Link>
          </Stack>
        </Center>
      )}
    </Box>
  );
}
