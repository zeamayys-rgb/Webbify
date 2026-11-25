'use client';

import type { Lang } from '../../_lib/i18n';

/**
 * No backend: the form composes a WhatsApp message, which is how most Indonesian
 * parents reach a school anyway. TODO: swap for an email/CMS endpoint if a client needs records.
 */
export function ContactForm({
  lang,
  number,
  topics,
  labels
}: {
  lang: Lang;
  number: string;
  topics: string[];
  labels: { name: string; topic: string; message: string; send: string };
}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text =
      lang === 'id'
        ? `Halo, saya ${f.get('name')}.\nKeperluan: ${f.get('topic')}\n\n${f.get('message')}`
        : `Hello, I'm ${f.get('name')}.\nTopic: ${f.get('topic')}\n\n${f.get('message')}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  return (
    <form className="sch-form" onSubmit={onSubmit}>
      <label>
        {labels.name}
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        {labels.topic}
        <select name="topic">
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        {labels.message}
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="sch-btn sch-btn-primary">
        {labels.send}
      </button>
    </form>
  );
}
