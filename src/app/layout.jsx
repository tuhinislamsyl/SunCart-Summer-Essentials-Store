import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/CartContext";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description: "Your one-stop shop for summer care, accessories, and beach gear.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
