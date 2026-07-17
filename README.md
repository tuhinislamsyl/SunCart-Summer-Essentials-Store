# SunCart – Summer Essentials Store

A modern, responsive single-page eCommerce application built for your summer needs.

## Key Features
- **Responsive Design**: Mobile-first architecture using Tailwind CSS, providing a seamless experience across all devices.
- **Dynamic Catalog**: Client-side search and category filtering for summer essentials.
- **Authentication Flow**: Google OAuth integration with NextAuth.js, route protection for sensitive pages, and redirect handling.
- **Shopping Cart**: Add items, adjust quantities, and proceed through a mock checkout process.
- **Modern Tech Stack**: Built on Next.js 15 (App Router) using React 19.

## Technologies Used
- Next.js (App Router)
- React
- NextAuth.js (Authentication)
- Tailwind CSS v4
- Lucide React (Icons)
- Mock JSON Data

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Setup

### Google OAuth Configuration

1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google+ API:**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Configure the OAuth consent screen if prompted
   - Set Application type to "Web application"
   - Add authorized redirect URIs:
     - For local development: `http://localhost:3000/api/auth/callback/google`
     - For Vercel deployment: `https://yourdomain.vercel.app/api/auth/callback/google`

4. **Get Client ID and Secret:**
   - Copy the Client ID and Client Secret from the credentials page
   - Add them to your `.env.local` file

5. **Generate NEXTAUTH_SECRET:**
   - Run `openssl rand -base64 32` in your terminal
   - Add the output to your `.env.local` file

## Project Structure
- `src/app`: Next.js App Router pages (Home, Products, Login, Cart, etc.)
- `src/components`: Reusable UI components and layout wrappers.
- `src/data`: Static mock API data (`products.json`).
- `src/components/auth`: Route protection components.
- `src/lib/auth.js`: NextAuth.js configuration.

## Deployment Notes

### Vercel Deployment

1. **Connect your repository:**
   - Import your project on Vercel
   - Connect your GitHub repository

2. **Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Add the following environment variables:
     ```
     NEXTAUTH_SECRET=your-nextauth-secret-here
     NEXTAUTH_URL=https://yourdomain.vercel.app
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```

3. **Update Google OAuth Redirect URI:**
   - Add your Vercel domain to the authorized redirect URIs in Google Cloud Console:
     `https://yourdomain.vercel.app/api/auth/callback/google`

4. **Deploy:**
   - Vercel will automatically build and deploy your app
   - NextAuth.js works seamlessly with Vercel's serverless functions

### Testing Authentication

- **Local Development:** Use `http://localhost:3000` as NEXTAUTH_URL
- **Production:** Use your actual domain as NEXTAUTH_URL
- **Protected Routes:** Try accessing `/profile` without logging in - you should be redirected to login
- **Redirect After Login:** After logging in, you should return to the originally requested page

## Author
Built for the Ph-web-development-course.That's it.
