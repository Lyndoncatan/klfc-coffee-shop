import type { Product } from "@/types/product"

// This would normally come from a database
export const products: Product[] = [
  {
    id: "1",
    name: "Coffee Jelly",
    description: "Our specialty coffee jelly with whipped cream topping",
    price: 120,
    image: "/images/coffee-jelly.png",
    category: "specialty",
    featured: true,
  },
  {
    id: "2",
    name: "Coffee Moca",
    description: "Rich mocha coffee with whipped cream",
    price: 110,
    image: "/images/coffee-moca.png",
    category: "coffee",
  },
  {
    id: "3",
    name: "Cheesecake",
    description: "Creamy cheesecake flavored drink",
    price: 130,
    image: "/images/cheesecake.png",
    category: "specialty",
  },
  {
    id: "4",
    name: "Hot Brew",
    description: "Classic hot brewed coffee",
    price: 90,
    image: "/images/hotbrew.png",
    category: "coffee",
  },
  {
    id: "5",
    name: "Okinawa",
    description: "Special Okinawa-style milk tea",
    price: 125,
    image: "/images/okinawa.png",
    category: "tea",
  },
  {
    id: "6",
    name: "Cookies & Cream",
    description: "Creamy drink with cookie crumbles",
    price: 135,
    image: "/images/cookies-cream.png",
    category: "specialty",
  },
  {
    id: "7",
    name: "Taro Cream",
    description: "Smooth taro-flavored cream drink",
    price: 140,
    image: "/images/taro-cream.png",
    category: "specialty",
  },
  {
    id: "8",
    name: "Vanilla Coffee",
    description: "Coffee with vanilla flavor and whipped cream",
    price: 115,
    image: "/images/vanilla-coffee.png",
    category: "coffee",
  },
  {
    id: "9",
    name: "Strawberry Cream",
    description: "Sweet strawberry cream drink",
    price: 130,
    image: "/images/strawberry-cream.png",
    category: "specialty",
  },
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

// In a real app, these functions would make API calls
export function addProduct(product: Omit<Product, "id">): Product {
  const newProduct = {
    ...product,
    id: Math.random().toString(36).substring(2, 9),
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return undefined

  products[index] = { ...products[index], ...updates }
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

