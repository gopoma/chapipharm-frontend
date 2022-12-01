import { Category } from "./category.interface";

export interface Product {
  id: number;
  name: string;
  laboratory: string;
  stock: number;
  price: number;
  description: number;
  image: string;
  offer: boolean;
  categories: Category[],
}