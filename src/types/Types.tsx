export interface categoryInterface {
  id: string;
  categoryName: string;
  imageUrl: string;
}

export interface productInterface {
  id: string;
  productName: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: any;
  sold: number;
}
