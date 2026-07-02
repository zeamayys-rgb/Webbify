import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Webbify — We Build Your Website First. You Pay When You Love It.',
  description:
    'Webbify — AI-powered web agency. We build your website first, you pay when you love it. Fast, custom websites accelerated by AI, perfected by professionals.'
};

export default function Page() {
  return <HomeClient />;
}
