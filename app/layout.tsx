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

export const metadata: Metadata = {
  title: 'Batoli Home Stay - Serene Mountain Retreat | Peaceful Accommodation',
  description: 'Experience tranquility at Batoli Home Stay, nestled in the mountains with breathtaking views. Book your perfect mountain getaway with modern amenities and authentic hospitality.',
  keywords: 'Batoli Home Stay, mountain retreat, peaceful accommodation, homestay, mountain views, nature getaway, serene stay',
  authors: [{ name: 'Batoli Home Stay' }],
  creator: 'Batoli Home Stay',
  publisher: 'Batoli Home Stay',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Batoli Home Stay - Serene Mountain Retreat',
    description: 'Experience tranquility at Batoli Home Stay, nestled in the mountains with breathtaking views.',
    siteName: 'Batoli Home Stay',
    images: [
      {
        url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
        width: 1200,
        height: 630,
        alt: 'Batoli Home Stay Mountain View',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batoli Home Stay - Serene Mountain Retreat',
    description: 'Experience tranquility at Batoli Home Stay, nestled in the mountains with breathtaking views.',
    images: ['https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'],
  },
  alternates: {
    canonical: 'https://batoli-homestay.com',
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
              "name": "Batoli Home Stay",
              "description": "Serene mountain retreat offering peaceful accommodation with breathtaking views",
              "url": "https://batoli-homestay.com",
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