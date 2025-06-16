import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Correct Next.js 14+ viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Batoli Soul Stay - Serene Mountain Retreat | Peaceful Accommodation',
  description: 'Experience tranquility at Batoli Soul Stay, nestled in the mountains with breathtaking views. Book your perfect mountain getaway with modern amenities and authentic hospitality.',
  keywords: 'Batoli Soul Stay, mountain retreat, peaceful accommodation, Soulstay, mountain views, nature getaway, serene stay',
  authors: [{ name: 'Batoli Soul Stay' }],
  creator: 'Batoli Soul Stay',
  publisher: 'Batoli Soul Stay',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Batoli Soul Stay - Serene Mountain Retreat',
    description: 'Experience tranquility at Batoli Soul Stay, nestled in the mountains with breathtaking views.',
    siteName: 'Batoli Soul Stay',
    images: [
      {
        url: '/hero1.jpg',
        width: 1200,
        height: 630,
        alt: 'Batoli Soul Stay Mountain View',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batoli Soul Stay - Serene Mountain Retreat',
    description: 'Experience tranquility at Batoli Soul Stay, nestled in the mountains with breathtaking views.',
    images: ['/hero1.jpg'],
  },
  alternates: {
    canonical: 'https://batolisoulstay.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#87CEEB" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Batoli Soul Stay",
              "description": "Serene mountain retreat offering peaceful accommodation with breathtaking views",
              "url": "https://batoli-Soulstay.com",
              "telephone": "+1-234-567-8900",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Mountain View Road",
                "addressLocality": "Batoli",
                "addressRegion": "Mountain Region",
                "addressCountry": "Country"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "0.0000",
                "longitude": "0.0000"
              },
              "priceRange": "$$",
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Mountain Views"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free WiFi"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Garden"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}