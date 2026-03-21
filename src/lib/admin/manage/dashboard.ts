"use server";

import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Service } from "@/models/Service";

export interface DashboardStats {
  products: number;
  categories: number;
  services: number;
  outOfStock: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [products, categories, services, outOfStock] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments({ isActive: true }),
    Service.countDocuments({ isActive: true }),
    Product.countDocuments({ stock: { $lte: 0 } }),
  ]);

  return { products, categories, services, outOfStock };
}
