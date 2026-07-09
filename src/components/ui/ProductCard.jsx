import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-slate-700">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-orange-500 font-bold tracking-wider uppercase mb-1">{product.brand}</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <Link href={`/products/${product.id}`} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
