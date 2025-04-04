"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-provider"
import { getProductById, updateProduct } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CartProvider } from "@/lib/cart-provider"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [isNew, setIsNew] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "specialty",
    featured: false,
  })

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }

    // Check if this is a new product or editing existing
    if (params.id === "new") {
      setIsNew(true)
    } else {
      // Load product data
      const product = getProductById(params.id as string)
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          featured: product.featured || false,
        })
      } else {
        router.push("/admin")
      }
    }
  }, [params.id, user, isLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isNew) {
        // Add new product
        // In a real app, this would call an API
        toast({
          title: "Product Added",
          description: "The product has been added successfully.",
        })
      } else {
        // Update existing product
        updateProduct(params.id as string, formData)
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
        })
      }
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the product.",
        variant: "destructive",
      })
    }
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
          <div className="container max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">{isNew ? "Add New Product" : "Edit Product"}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₱)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specialty">Specialty</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="tea">Tea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>

                {formData.image && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Product preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                  Cancel
                </Button>
                <Button type="submit">{isNew ? "Add Product" : "Save Changes"}</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

