export interface ServiceFormInput {
  name: string;
  thumbnail?: string;
  images?: string;
  brief?: string;
  description?: string;
  features?: string;
}

export type PopulatedCategory = {
  _id: { toString(): string };
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
};

export type PopulatedProductSpecification = {
  label: string;
  value: string;
};
