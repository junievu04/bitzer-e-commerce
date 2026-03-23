export interface ServiceFormInput {
  name: string;
  thumbnail?: string;
  images?: string;
  brief?: string;
  description?: string;
  features?: string;
}

export interface ProductFormInput {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  images?: string;
  brief?: string;
  description?: string;
  specifications?: ProductSpecification[];
}

export interface ProductUpdateInput {
  price?: number;
  stock?: number;
  description?: string;
  images?: string;
  specifications?: ProductSpecification[];
}

export type PopulatedCategory = {
  _id: { toString(): string };
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
};
