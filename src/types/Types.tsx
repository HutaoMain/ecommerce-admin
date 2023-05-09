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

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  userRole: string;
  street: string;
  barangay: string;
  postalCode: number;
  municipality: string;
  city: string;
  contactNumber: number;
}
