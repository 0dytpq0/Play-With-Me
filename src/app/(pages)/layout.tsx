import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import '@/app/globals.css';
import { TanstackQueryProvider } from '@/shared/providers';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Play With Me',
  description: '발로란트 1:1 듀오 매칭 서비스',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TanstackQueryProvider>
            <main className='w-full min-h-dvh min-w-[1280px] max-w-[1920px]'>
              {children}
            </main>
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
