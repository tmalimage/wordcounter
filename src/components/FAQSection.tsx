export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is a word counter?",
    a: "A word counter is a writing tool that counts the number of words, characters, sentences, paragraphs, and other useful metrics in any text you provide. It helps writers, students, marketers, and social media users meet length requirements and improve clarity.",
  },
  {
    q: "How does this word counter work?",
    a: "Paste or type your text into the editor and statistics update in real time. All processing happens directly in your browser using JavaScript — your text is never sent to a server.",
  },
  {
    q: "Is my text uploaded to a server?",
    a: "No. This tool runs entirely in your browser. Your text never leaves your device, which makes it safe for sensitive drafts, confidential notes, or unpublished work.",
  },
  {
    q: "What is the difference between character count with spaces and without spaces?",
    a: "Character count with spaces includes every visible character plus spaces, tabs, and line breaks. Character count without spaces excludes whitespace and is often required for tweets, SMS messages, and meta descriptions.",
  },
  {
    q: "How is reading time calculated?",
    a: "Reading time is estimated by dividing the total word count by an average reading speed. The default is 200 words per minute for silent reading, which you can adjust between 150 and 300 wpm.",
  },
  {
    q: "What is keyword density?",
    a: "Keyword density measures how often a word or phrase appears in a text relative to the total word count, expressed as a percentage. Writers and SEO professionals use it to confirm a piece focuses on its target topic without over-stuffing keywords.",
  },
  {
    q: "Can I use this for essays, blogs, and social media posts?",
    a: "Yes. The platform-limit checker shows whether your text fits popular constraints like X/Twitter (280 characters), SMS (160 characters), Instagram captions, LinkedIn posts, and YouTube descriptions. You can also save custom limits for your own platforms.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 id="faq-heading" className="text-2xl font-bold mb-4">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-border p-3 open:bg-accent/30"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
              <span>{item.q}</span>
              <span
                aria-hidden
                className="ml-2 text-muted transition group-open:rotate-180"
              >
                ⌄
              </span>
            </summary>
            <p className="mt-2 text-sm text-muted leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
