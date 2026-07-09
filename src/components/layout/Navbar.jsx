'use client';
import Link from 'next/link';
import { ShoppingCart, User, Sun, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-500 hover:text-orange-600 transition">
          <Sun className="w-8 h-8" />
          SunCart
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-slate-600 hover:text-orange-500 font-medium transition">
            Shop
          </Link>
          {session ? (
            <>
              <Link href="/profile" className="text-slate-600 hover:text-orange-500 transition">
                <User className="w-6 h-6" />
              </Link>
              <button onClick={handleLogout} className="text-slate-600 hover:text-orange-500 transition">
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <Link href="/login" className="text-slate-600 hover:text-orange-500 font-medium transition">
              Login
            </Link>
          )}
          <Link href="/cart" className="text-slate-600 hover:text-orange-500 transition relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
