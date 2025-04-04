import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts, getProducts } from "@/lib/products"
import { CartProvider } from "@/lib/cart-provider"
import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/logo"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const products = getProducts().slice(0, 3) // Just show first 3 products

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[500px] bg-gradient-to-r from-klfc-orange to-klfc-yellow">
            <div className="container h-full flex flex-col justify-center items-start gap-6 relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl">
                Experience the Best Coffee Jelly in Town
              </h1>
              <p className="text-lg md:text-xl text-white max-w-xl">
                KLFC brings you premium coffee and specialty drinks with our signature coffee jelly.
              </p>
              <Button asChild size="lg" className="bg-white text-klfc-orange hover:bg-gray-100">
                <Link href="/menu">View Our Menu</Link>
              </Button>
            </div>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
              <Image
                src="/images/coffee-jelly.png"
                alt="Coffee Jelly"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-16 bg-muted">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <Button asChild variant="outline">
                  <Link href="/menu">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* Popular Products */}
          <section className="py-16">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Popular Drinks</h2>
                <Button asChild variant="outline">
                  <Link href="/menu">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-muted">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">About KLFC</h2>
                  <p className="text-lg mb-4">
                    KLFC is a premium coffee shop specializing in coffee jelly and other specialty drinks. Our mission
                    is to provide the highest quality beverages in a warm and welcoming environment.
                  </p>
                  <p className="text-lg mb-6">
                    We source only the finest ingredients and our baristas are trained to create the perfect cup every
                    time.
                  </p>
                  <Button asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
                <div className="relative h-[400px]">
                  <Image src="/images/hotbrew.png" alt="KLFC Coffee Shop" fill className="object-contain" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 bg-klfc-brown text-white">
          <div className="container flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo size="small" />
              <p className="text-sm">© 2025 KLFC Coffee Shop. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

