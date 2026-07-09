'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const [name, setName] = useState(session?.user?.name || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (image && !isValidUrl(image)) {
      setError('Please enter a valid image URL');
      return;
    }

    setIsLoading(true);

    try {
      // Store updated profile in localStorage (mock)
      const profileData = {
        name,
        image: image || session?.user?.image || null,
      };
      localStorage.setItem('suncart_profile', JSON.stringify(profileData));

      // Update session
      await update({
        ...session?.user,
        name,
        image: image || session?.user?.image,
      });

      setSuccess('Profile updated successfully!');
      
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/profile" 
          className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Update Profile</h1>
            <p className="text-slate-500 mb-8">Edit your profile information below.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                />
              </div>

              {/* Image URL Field */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
                  Profile Picture URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/profile-picture.jpg"
                    className="w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Provide a direct link to your profile image (optional)</p>
              </div>

              {/* Image Preview */}
              {image && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-3">Preview</p>
                  <div className="flex justify-center">
                    <img 
                      src={image} 
                      alt="Profile preview"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                      }}
                      className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  {isLoading ? 'Updating...' : 'Update Information'}
                </button>
                <Link
                  href="/profile"
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium transition text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
