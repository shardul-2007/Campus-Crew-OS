import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'Shardul Parihar — Software Engineer',
  description: 'Software engineering student focused on full-stack development, AI, cybersecurity and innovative digital products. Builder of CivicOS and SHARDUL.OS.',
  keywords: ['Shardul Parihar', 'Software Engineer', 'Full Stack', 'AI', 'React', 'Next.js', 'CivicOS'],
  authors: [{ name: 'Shardul Parihar' }],
  creator: 'Shardul Parihar',
  openGraph: {
    title: 'Shardul Parihar — Software Engineer',
    description: 'Building digital systems that matter.',
    url: 'https://shardul-2007.github.io/my-portfolio/',
    siteName: 'Shardul Parihar',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'obsidian':'pearl';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Shardul Parihar',
              url: 'https://shardul-2007.github.io/my-portfolio/',
              sameAs: ['https://github.com/shardul-2007','https://www.linkedin.com/in/shardul-parihar-/'],
              jobTitle: 'Software Engineer',
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
