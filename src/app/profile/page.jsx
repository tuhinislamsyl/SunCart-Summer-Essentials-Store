'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { User, Mail, Package, Settings, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();

  // Extract first and last name from full name
  const fullName = session?.user?.name || 'User';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const email = session?.user?.email || '';

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
              <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {session?.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{session?.user?.name || 'User'}</h2>
              <p className="text-slate-500 text-sm mb-6">{session?.user?.email}</p>
              
              <Link 
                href="/profile/edit"
                className="w-full py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition text-sm font-medium inline-block"
              >
                Edit Profile
              </Link>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 mt-6">
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-xl font-medium transition">
                    <User className="w-5 h-5" /> Account Details
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
                    <Package className="w-5 h-5" /> Order History
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
                    <Settings className="w-5 h-5" /> Preferences
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition mt-4"
                  >
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Account Information</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none" 
                      readOnly 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      value={email} 
                      className="w-full pl-10 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-slate-500" 
                      disabled 
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Email address cannot be changed.</p>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
