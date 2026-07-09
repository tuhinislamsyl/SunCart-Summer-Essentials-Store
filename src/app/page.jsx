import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sun, Umbrella } from 'lucide-react';
import productsData from '@/data/products.json';
import HeroAnimation from '@/components/animations/HeroAnimation';

export default function Home() {
  // Get 3 featured products
  const featuredProducts = productsData.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Get Ready for the <span className="text-orange-500">Perfect Summer</span>
            </h1>
            <p className="text-lg text-slate-600">
              Discover our curated collection of summer essentials. From premium suncare to trendy accessories, we have everything you need to soak up the sun safely.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-50 transform scale-110"></div>
              <div className="rounded-2xl shadow-xl relative z-10 overflow-hidden bg-white">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Essentials</h2>
              <p className="text-slate-500">Handpicked items for your next adventure.</p>
            </div>
            <Link href="/products" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 transition">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-slate-700">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-orange-500 font-bold tracking-wider uppercase mb-1">{product.brand}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                    <Link href={`/products/${product.id}`} className="px-4 py-2 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm font-medium transition">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="bg-sky-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Summer Care Tips</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">Stay safe and comfortable under the sun with these essential guidelines.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reapply Sunscreen</h3>
              <p className="text-slate-500 text-sm">Apply SPF 50+ every two hours, or immediately after swimming or excessive sweating.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Umbrella className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seek Shade</h3>
              <p className="text-slate-500 text-sm">Avoid direct sunlight during peak hours (10 AM to 4 PM) when UV rays are strongest.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stay Hydrated</h3>
              <p className="text-slate-500 text-sm">Drink plenty of water throughout the day to prevent dehydration and heat exhaustion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands Banner */}
      <section className="py-16 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by Top Brands</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
            {/* Simple text placeholders for brands */}
            <h4 className="text-2xl font-black font-serif">SunGuard</h4>
            <h4 className="text-2xl font-black italic">RayShade</h4>
            <h4 className="text-2xl font-black uppercase tracking-tighter">OceanVibe</h4>
            <h4 className="text-2xl font-bold tracking-widest">NATUREHEAL</h4>
            <h4 className="text-2xl font-black font-mono">HydroChill</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
