import type { Metadata } from 'next';
import InsightsClient from './insights-client';
import { COLLECTIONS, TOPICS, type Collection, type Topic } from './content';

export const metadata: Metadata = {
  title: 'Insights — Webbify',
  description:
    'Webbify Insights — personal learning notes on product design, research, and building calm, useful software. Written by Abdan.'
};

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ topic?: string; collection?: string; tag?: string }>;
}) {
  const { topic, collection, tag } = await searchParams;
  return (
    <InsightsClient
      topic={topic && topic in TOPICS ? (topic as Topic) : null}
      collection={collection && collection in COLLECTIONS ? (collection as Collection) : null}
      tag={tag ?? null}
    />
  );
}
