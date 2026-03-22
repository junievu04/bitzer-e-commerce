export interface ServiceFormInput {
  name: string;
  slug?: string;
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
