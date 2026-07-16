export type CartProduct = {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  price: number;
  inventory: number;
  ageRestricted: boolean;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};
