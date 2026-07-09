import Link from 'next/link';
import { Sun } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-500 mb-4">
            <Sun className="w-6 h-6" />
            SunCart
          </Link>
          <p className="text-sm">Your one-stop shop for summer care, accessories, and beach gear. Embrace the sun safely.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=Skincare" className="hover:text-orange-400 transition">Skincare</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-orange-400 transition">Accessories</Link></li>
            <li><Link href="/products?category=Apparel" className="hover:text-orange-400 transition">Apparel</Link></li>
            <li><Link href="/products" className="hover:text-orange-400 transition">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-orange-400 transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-orange-400 transition">FAQs</Link></li>
            <li><Link href="/shipping" className="hover:text-orange-400 transition">Shipping & Returns</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe for summer tips and exclusive offers.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="px-3 py-2 bg-slate-800 text-white rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SunCart. All rights reserved.</p>
      </div>
    </footer>
  );
}
