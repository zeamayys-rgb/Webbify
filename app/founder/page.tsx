import type { Metadata } from 'next';
import FounderClient from './founder-client';

export const metadata: Metadata = {
  title: 'Founders — Webbify',
  description:
    'Meet the founders of Webbify — Abdan (Product, Strategy & Design) and Bedur (Development & Tech Operations).'
};

export default function Page() {
  return <FounderClient />;
}
