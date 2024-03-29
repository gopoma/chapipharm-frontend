import { Category } from "./category.interface";

export interface Product {
  _id       ?  : string;
  name        : string;
  laboratory  : string;
  stock       : number;
  price       : number;
  description : string;
  images   ?  : string[];
  offer    ?  : boolean;
  categories  : string[],
}