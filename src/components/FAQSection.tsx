export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is a word counter?",
    a: "A word counter is a writing tool that counts the number of words, characters, sentences, paragraphs, and other useful metrics in any text you provide. It helps writers, students, marketers, and social media users meet length requirements, hit word-count targets, and improve clarity.",
  },
  {
    q: "How does this word counter work?",
    a: "Paste or type your text into the editor and statistics update in real time. All processing happens directly in your browser using JavaScript — your text is never sent to a server, stored, logged, or shared.",
  },
  {
    q: "Is the word counter free?",
    a: "Yes. This word counter is 100% free, with no signup, no email required, no ads inside the editor, and no usage limits. You can count as much text as you want, as often as you want.",
  },
  {
    q: "Is my text uploaded to a server?",
    a: "No. This tool runs entirely in your browser. Your text never leaves your device, which makes it safe for sensitive drafts, confidential notes, contracts, academic essays, and unpublished work.",
  },
  {
    q: "Does the word counter work offline?",
    a: "Once the page has loaded, all counting and statistics work without an internet connection because every calculation happens locally in your browser.",
  },
  {
    q: "What is the difference between character count with spaces and without spaces?",
    a: "Character count with spaces includes every visible character plus spaces, tabs, and line breaks. Character count without spaces excludes whitespace and is often required for tweets, SMS messages, and meta descriptions.",
  },
  {
    q: "How is reading time calculated?",
    a: "Reading time is estimated by dividing the total word count by an average reading speed. The default is 200 words per minute for silent reading, which you can adjust between 150 and 300 wpm depending on the audience and content difficulty.",
  },
  {
    q: "How is speaking time calculated?",
    a: "Speaking time is estimated by dividing your word count by an average speaking pace, typically 100 to 160 words per minute. It is useful for preparing speeches, presentations, voiceovers, podcasts, and YouTube scripts.",
  },
  {
    q: "What is keyword density?",
    a: "Keyword density measures how often a word or phrase appears in a text relative to the total word count, expressed as a percentage. Writers and SEO professionals use it to confirm a piece focuses on its target topic without over-stuffing keywords.",
  },
  {
    q: "What is a good keyword density for SEO?",
    a: "There is no official rule, but most SEO writers aim for a primary keyword density of around 1% to 2% and avoid going above 3% to prevent keyword stuffing. Use density as a sanity check rather than a target — natural, useful writing always wins.",
  },
  {
    q: "What does the readability score mean?",
    a: "Readability scores estimate how easy a piece of text is to read. The Flesch Reading Ease score ranges from 0 (very difficult) to 100 (very easy). Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, and Automated Readability Index map readability to a US school grade.",
  },
  {
    q: "Which readability score should I use?",
    a: "For general web and marketing content, Flesch Reading Ease and Flesch-Kincaid Grade Level are the most common. Aim for a Reading Ease of 60 or higher, or a grade level of 8 or below, so a wide audience can read your content comfortably.",
  },
  {
    q: "Can I use this for essays, blogs, and social media posts?",
    a: "Yes. The platform-limit checker shows whether your text fits popular constraints like X/Twitter (280 characters), SMS (160 characters), Instagram captions, LinkedIn posts, and YouTube descriptions. You can also save custom limits for your own platforms.",
  },
  {
    q: "Does this word counter support languages other than English?",
    a: "Word, character, sentence, and paragraph counts work for any language that uses spaces and standard punctuation. Reading time and readability scores are calibrated for English; results in other languages should be treated as approximate.",
  },
  {
    q: "What is the minimum and maximum text length supported?",
    a: "There is no minimum. The maximum depends on your device's available memory — most modern browsers comfortably handle hundreds of thousands of words.",
  },
  {
    q: "Is this word counter suitable for students and academic writing?",
    a: "Yes. Students use it to hit essay word-count targets, check reading time for presentations, and track keyword usage for thesis chapters. Because nothing leaves your device, it is safe to use for unpublished academic work.",
  },
  {
    q: "Can I count characters for a tweet or X post?",
    a: "Yes. The platform-limit panel shows live progress against the 280-character limit for X / Twitter, plus other social platforms, and warns you before you exceed the limit.",
  },
  {
    q: "How do I count words in a Word document or PDF?",
    a: "Open the document, select the text you want to count, and paste it into the editor. The counter updates instantly. For PDFs, you may need to clean up extra line breaks after pasting.",
  },
  {
    q: "Does the word counter save my drafts?",
    a: "Yes. Your draft is saved automatically to your browser's local storage so you can return to it later. Clearing your browser data will remove the saved draft.",
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
