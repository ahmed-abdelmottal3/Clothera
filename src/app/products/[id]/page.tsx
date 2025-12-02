'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ShoppingCart, 
  ChevronRight,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params?.id) {
          const response = await getProductById(params.id as string);
          setProduct(response.data); 
          if (response.data.imageCover) {
            setSelectedImage(response.data.imageCover);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Product not found</h1>
        <Link href="/products">
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const discountPercentage = product.priceAfterDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-primary font-medium truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left Column: Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface shadow-sm group">
              <Image
                src={selectedImage || product.imageCover}
                alt={product.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-[#FF3333] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  -{discountPercentage}%
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => setSelectedImage(product.imageCover)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === product.imageCover ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'
                }`}
              >
                <Image
                  src={product.imageCover}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </button>
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="space-y-4">
              {product.brand && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary uppercase tracking-wider">
                  {product.brand.name}
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratingsAverage)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary font-medium">
                  {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  ${product.priceAfterDiscount || product.price}
                </span>
                {product.priceAfterDiscount && (
                  <span className="text-xl text-text-secondary line-through decoration-2">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Description Preview */}
            <p className="text-text-secondary leading-relaxed text-lg">
              {product.description.length > 150 
                ? `${product.description.substring(0, 150)}...` 
                : product.description}
            </p>

            {/* Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-border rounded-full bg-surface shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-text-secondary">
                  {product.quantity > 0 ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1 h-14 text-lg rounded-full shadow-xl shadow-secondary/20 hover:shadow-secondary/30 transition-all hover:-translate-y-1"
                  variant="secondary"
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <button className="h-14 w-14 flex items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="h-14 w-14 flex items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 shadow-sm">
                <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary">Free Delivery</p>
                  <p className="text-xs text-text-secondary">Orders over $200</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 shadow-sm">
                <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary">Easy Returns</p>
                  <p className="text-xs text-text-secondary">30 days policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20 lg:mt-32">
          <div className="flex items-center justify-center gap-8 border-b border-border mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-lg font-bold transition-all relative ${
                activeTab === 'description'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              Product Details
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-lg font-bold transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              Rating & Reviews
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
              )}
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'description' ? (
              <div className="prose prose-lg max-w-none text-text-secondary">
                <p>{product.description}</p>
                {/* Add more detailed description content here if available */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-surface p-6 rounded-2xl border border-border">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Material & Care</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>100% Cotton</li>
                      <li>Machine wash cold</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low</li>
                    </ul>
                  </div>
                  <div className="bg-surface p-6 rounded-2xl border border-border">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Specifications</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Regular fit</li>
                      <li>Crew neck</li>
                      <li>Short sleeves</li>
                      <li>Solid pattern</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-surface p-8 rounded-2xl border border-border shadow-sm">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-black text-text-primary mb-2">
                      {product.ratingsAverage}
                      <span className="text-2xl text-text-secondary font-medium">/5</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(product.ratingsAverage)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary">Based on {product.ratingsQuantity} reviews</p>
                  </div>
                  <Button variant="outline" className="rounded-full px-8">
                    Write a Review
                  </Button>
                </div>
                
                {/* Placeholder for reviews list */}
                <div className="text-center py-12 text-text-secondary">
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
