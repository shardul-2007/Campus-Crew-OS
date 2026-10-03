import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shardul Parihar — Software Engineer',
  description:
    'Software engineering student from Pune, India. Building full-stack products with React, Next.js, AI APIs, and open-source contributions.',
  authors: [{ name: 'Shardul Parihar' }],
  openGraph: {
    title: 'Shardul Parihar — Software Engineer',
    description:
      'Software engineering student building full-stack products, AI integrations, and open-source contributions from Pune, India.',
    url: 'https://shardul-2007.github.io/my-portfolio/',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script: White & Black only */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
