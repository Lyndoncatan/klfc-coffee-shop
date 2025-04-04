"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import { getProducts, deleteProduct } from "@/lib/products"
import type { Product } from "@/types/product"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { CartProvider } from "@/lib/cart-provider"

export default function AdminPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }

    // Load products
    setProducts(getProducts())
  }, [user, isLoading, router])

  const handleDeleteProduct = (id: string) => {
    const success = deleteProduct(id)
    if (success) {
      setProducts(products.filter((product) => product.id !== id))
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the product.",
        variant: "destructive",
      })
    }
    setProductToDelete(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Button asChild>
                <a href="/admin/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </a>
              </Button>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative w-12 h-12 rounded-md overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₱{product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/admin/products/${product.id}`}>
                                <Pencil className="h-4 w-4" />
                              </a>
                            </Button>
                            <AlertDialog
                              open={productToDelete === product.id}
                              onOpenChange={(open) => !open && setProductToDelete(null)}
                            >
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setProductToDelete(product.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the product "{product.name}". This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

