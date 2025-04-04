import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { getProducts, getProductsByCategory } from "@/lib/products"
import { CartProvider } from "@/lib/cart-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MenuPage() {
  const allProducts = getProducts()
  const specialtyProducts = getProductsByCategory("specialty")
  const coffeeProducts = getProductsByCategory("coffee")
  const teaProducts = getProductsByCategory("tea")

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
              <p className="text-lg text-muted-foreground">
                Explore our wide range of specialty coffee, tea, and other delicious beverages.
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="specialty">Specialty</TabsTrigger>
                <TabsTrigger value="coffee">Coffee</TabsTrigger>
                <TabsTrigger value="tea">Tea</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="specialty">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {specialtyProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="coffee">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {coffeeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tea">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {teaProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

