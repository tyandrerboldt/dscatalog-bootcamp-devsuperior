export type Category = {
  id: number;
  name: string;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  date: string;
  categories: Category[];
}

export type ProductResponse = {
  content: Product[];
  totalPages: number;
}