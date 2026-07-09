'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Mock Checkout Successful! Your summer essentials are on their way.");
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-xl">
        <div className="w-24 h-24 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added any summer essentials yet.</p>
        <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition inline-flex items-center gap-2">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    <p className="text-slate-500 text-sm">{item.brand}</p>
                    <div className="text-orange-500 font-bold mt-2">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                      >-</button>
                      <span className="px-3 py-1 font-medium text-slate-900 w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              {!isCheckingOut && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
