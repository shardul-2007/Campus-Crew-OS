import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'Shardul Parihar — Software Engineer',
  description: 'Software engineering student focused on full-stack development, web technologies, AI, cybersecurity and innovative digital products.',
  authors: [{ name: 'Shardul Parihar' }],
  openGraph: {
    title: 'Shardul Parihar — Software Engineer',
    description: 'Software engineering student building full-stack products, AI integrations, and open-source contributions from Pune, India.',
    url: 'https://shardul-2007.github.io/my-portfolio/',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash: set theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sp-theme')||'obsidian';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
