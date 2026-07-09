'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useCart } from '@/lib/CartContext';
import productsData from '@/data/products.json';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage({ params }) {
  // In Next.js 15, params is a Promise, we must unwrap it using `use` or await.
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = productsData.find(p => p.id === resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="text-orange-500 hover:text-orange-600 font-medium">
            &larr; Back to Products
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="bg-slate-50 p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-md rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-2">{product.name}</h1>
              <p className="text-lg text-slate-500 font-medium mb-4">By {product.brand}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-700">{product.rating}</span>
                </div>
                <span className="text-sm text-slate-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
              </div>

              <div className="text-4xl font-bold text-slate-900 mb-8">${product.price.toFixed(2)}</div>
              
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="flex items-center gap-6 mb-8 border-t border-b border-slate-100 py-6">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-slate-50 transition text-slate-600"
                  >-</button>
                  <span className="px-4 py-3 font-medium text-slate-900 w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 hover:bg-slate-50 transition text-slate-600"
                  >+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-grow flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-white transition ${
                    isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
