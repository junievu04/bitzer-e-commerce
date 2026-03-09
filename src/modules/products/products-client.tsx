"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { PRODUCT_CATEGORIES } from "./product-filter";
import { ProductWrapper } from "./product-wrapper";
import { PaginationState, Product, ProductFilterState } from "./types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "2DTS-2Y-40S",
    slug: "may-nen-bitzer-2dts-2y-40s",
    name: "Máy Nén Bitzer Model 2DTS-2Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 10,
    description:
      "Máy nén Bitzer bán kín 2 xi lanh, công suất cao, tiết kiệm năng lượng",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "2DES-3Y-40S",
    slug: "may-nen-bitzer-2des-3y-40s",
    name: "Máy Nén Bitzer Model 2DES-3Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 8,
    description:
      "Máy nén Bitzer bán kín 2 xi lanh, hiệu suất cao cho hệ thống lạnh",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "2FES-2Y-40S",
    slug: "may-nen-bitzer-2fes-2y-40s",
    name: "Máy Nén Bitzer Model 2FES-2Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 15,
    description: "Máy nén Bitzer bán kín, thiết kế compact, dễ dàng lắp đặt",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "2FES-3Y-40S",
    slug: "may-nen-bitzer-2fes-3y-40s",
    name: "Máy Nén Bitzer Model 2FES-3Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 12,
    description: "Máy nén Bitzer bán kín, độ bền cao, hoạt động ổn định",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "2GES-2Y-40S",
    slug: "may-nen-bitzer-2ges-2y-40s",
    name: "Máy Nén Bitzer Model 2GES-2Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 6,
    description: "Máy nén Bitzer bán kín, công nghệ Đức, chất lượng cao",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4TES-9Y-40S",
    slug: "may-nen-bitzer-4tes-9y-40s",
    name: "Máy Nén Bitzer Model 4TES-9Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 4,
    description:
      "Máy nén Bitzer 4 xi lanh, công suất lớn cho kho lạnh công nghiệp",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4TES-12Y-40S",
    slug: "may-nen-bitzer-4tes-12y-40s",
    name: "Máy Nén Bitzer Model 4TES-12Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 7,
    description: "Máy nén Bitzer 4 xi lanh, hiệu suất vượt trội",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4CES-6Y-40S",
    slug: "may-nen-bitzer-4ces-6y-40s",
    name: "Máy Nén Bitzer Model 4CES-6Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 9,
    description: "Máy nén Bitzer bán kín, tiết kiệm điện năng",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4FES-5Y-40S",
    slug: "may-nen-bitzer-4fes-5y-40s",
    name: "Máy Nén Bitzer Model 4FES-5Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 11,
    description: "Máy nén Bitzer bán kín, vận hành êm ái",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4HE-18Y-40P",
    slug: "may-nen-bitzer-4he-18y-40p",
    name: "Máy Nén Bitzer Model 4HE-18Y-40P",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 3,
    description: "Máy nén Bitzer công suất cao cho hệ thống lạnh lớn",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4NES-14Y-40P",
    slug: "may-nen-bitzer-4nes-14y-40p",
    name: "Máy Nén Bitzer Model 4NES-14Y-40P",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 5,
    description: "Máy nén Bitzer 4 xi lanh, độ tin cậy cao",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "4PES-15Y-40P",
    slug: "may-nen-bitzer-4pes-15y-40p",
    name: "Máy Nén Bitzer Model 4PES-15Y-40P",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 8,
    description: "Máy nén Bitzer bán kín, thiết kế hiện đại",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "HSK-5343-30",
    slug: "may-nen-truc-vit-bitzer-hsk-5343-30",
    name: "Máy Nén Trục Vít Bitzer HSK-5343-30",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 2,
    description: "Máy nén trục vít Bitzer, công suất lớn cho công nghiệp",
    category: {
      id: "may-nen-truc-vit-bitzer",
      name: "Máy Nén Trục Vít Bitzer",
      slug: "may-nen-truc-vit-bitzer",
    },
  },
  {
    id: "HSK-6461-40",
    slug: "may-nen-truc-vit-bitzer-hsk-6461-40",
    name: "Máy Nén Trục Vít Bitzer HSK-6461-40",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 3,
    description: "Máy nén trục vít Bitzer, hiệu suất cao",
    category: {
      id: "may-nen-truc-vit-bitzer",
      name: "Máy Nén Trục Vít Bitzer",
      slug: "may-nen-truc-vit-bitzer",
    },
  },
  {
    id: "4VES-7Y-40P",
    slug: "may-nen-bitzer-4ves-7y-40p",
    name: "Máy Nén Bitzer Model 4VES-7Y-40P",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 6,
    description: "Máy nén Bitzer bán kín, công nghệ tiên tiến",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
  {
    id: "6HE-28Y-40P",
    slug: "may-nen-bitzer-6he-28y-40p",
    name: "Máy Nén Bitzer Model 6HE-28Y-40P",
    image: "/images/products/bitzer-compressor-1.png",
    price: null,
    quantity: 2,
    description: "Máy nén Bitzer 6 xi lanh, công suất cực lớn",
    category: {
      id: "may-nen-bitzer-duc",
      name: "Máy Nén Bitzer Đức",
      slug: "may-nen-bitzer-duc",
    },
  },
];

const ITEMS_PER_PAGE = 12;

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [sortBy, setSortBy] = useState<ProductFilterState["sortBy"]>("default");
  const [currentPage, setCurrentPage] = useState(1);

  const filter: ProductFilterState = useMemo(
    () => ({
      categorySlug: categoryFromUrl,
      sortBy,
    }),
    [categoryFromUrl, sortBy],
  );

  const updateUrl = useCallback(
    (categorySlug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categorySlug) {
        params.set("category", categorySlug);
      } else {
        params.delete("category");
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (filter.categorySlug) {
      result = result.filter((p) => p.category.slug === filter.categorySlug);
    }

    switch (filter.sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [filter]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const pagination: PaginationState = {
    currentPage,
    totalPages: Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1,
    totalItems: filteredProducts.length,
    itemsPerPage: ITEMS_PER_PAGE,
  };

  const handleFilterChange = (newFilter: ProductFilterState) => {
    setSortBy(newFilter.sortBy);
    setCurrentPage(1);
    updateUrl(newFilter.categorySlug);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const categoryTitle = filter.categorySlug
    ? PRODUCT_CATEGORIES.find((c) => c.slug === filter.categorySlug)?.name
    : "Tất cả sản phẩm";

  return (
    <ProductWrapper
      products={paginatedProducts}
      filter={filter}
      pagination={pagination}
      onFilterChange={handleFilterChange}
      onPageChange={handlePageChange}
      categoryTitle={categoryTitle}
      categorySlug={categoryFromUrl}
    />
  );
}
