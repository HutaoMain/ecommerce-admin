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
  category: {
    id: string;
    categoryName: string;
    imageUrl: string;
  };
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

export interface orderInterface {
  id: string;
  email: string;
  userFullName: string;
  totalPrice: string;
  orderList: string;
  status: string;
  paymentMethod: string;
  receipt: string;
}

export interface orderListInterface {
  id: string;
  imageUrl: string;
  description: string;
  price: number;
  productName: string;
  quantity: number;
  sold: number;
}

export interface totalPricePerMonthInterface {
  totalPrice: number;
  orderDate: string;
}
