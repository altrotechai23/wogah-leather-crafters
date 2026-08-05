import { ProductFormValues } from "../validators/product";


export const defaultProductValues: ProductFormValues = {
  name: "",

  slug: "",

  category: "",

  tagline: "",

  description: "",

  price: 0,

  stock: 0,

  sku: "",

  bestseller: false,

  isNew: false,

  published: true,

  details: [""],

  colors: [
    {
      name: "",
      hex: "#000000",
      stock: 0,
    },
  ],
  images: []
};