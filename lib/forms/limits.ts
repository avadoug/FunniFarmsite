export const checkoutFieldLimits = {
  address1: 160,
  address2: 160,
  city: 80,
  country: 40,
  email: 254,
  firstName: 80,
  items: 25,
  lastName: 80,
  phone: 40,
  postalCode: 20,
  productId: 160,
  quantity: 99,
  state: 40,
} as const;

export const contactFieldLimits = {
  email: 254,
  message: 4000,
  name: 120,
} as const;
