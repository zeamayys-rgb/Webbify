import type { Metadata } from 'next';
import { Poppins, Open_Sans, Montserrat } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '600', '700', '800'], subsets: ['latin'], variable: '--font-poppins' });
const openSans = Open_Sans({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-open-sans' });
const montserrat = Montserrat({ weight: '400', style: 'italic', subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Webbify — We Build Your Website First. You Pay When You Love It.',
  description:
    'Webbify — AI-powered web agency. We build your website first, you pay when you love it. Fast, custom websites accelerated by AI, perfected by professionals.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64"><polygon points="2,2 58,2 30,60" fill="%238CE7E5"/><polygon points="42,2 98,2 70,60" fill="%23F2D8A5" opacity="0.92"/><polygon points="40,2 60,2 50,23" fill="%235863E7"/></svg>'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
