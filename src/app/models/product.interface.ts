export interface ProductImage {
  color?: string;
  url: string;
  isMain?: boolean;
}

export interface Specification {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  specifications: Specification[];
}
export const ProductImages  = [
   'https://importmobilsas.com/cdn/shop/products/s21.jpg?v=1685489202',
   'https://mensworld.com.bd/wp-content/uploads/2023/10/CSF-3317.jpg',
   'https://bevgo.com.co/wp-content/uploads/2020/12/321.jpg',
  'https://shop.ninacampbell.com/cdn/shop/products/115582_Bathhatblueheart.jpg?v=1636211351'
]
