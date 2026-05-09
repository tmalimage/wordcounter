export function InfoSection() {
  return (
    <section
      aria-labelledby="info-heading"
      className="rounded-xl border border-border bg-card p-6 shadow-sm prose prose-sm dark:prose-invert max-w-none"
    >
      <h2
        id="info-heading"
        className="text-2xl font-bold mb-4 not-prose"
      >
        About this word counter
      </h2>

      <div className="space-y-5 text-sm leading-relaxed text-foreground">
        <div>
          <h3 className="font-semibold text-base mb-1">
            What does a word counter do?
          </h3>
          <p className="text-muted">
            This tool reads your text and reports useful writing statistics:
            words, characters, sentences, paragraphs, lines, and unique words.
            It also estimates how long readers will spend on the page and
            highlights your most-used keywords.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            How to use this word counter
          </h3>
          <p className="text-muted">
            Paste or type your draft into the editor at the top of the page.
            Statistics update automatically as you write. Use the platform
            limits panel to confirm your text fits a tweet, SMS, or LinkedIn
            post, and use the writing-goal panel to track progress toward an
            essay or article target.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Why word count matters
          </h3>
          <p className="text-muted">
            Most platforms enforce length rules. Search engines truncate meta
            descriptions, social networks cut off captions, professors expect
            essay lengths within a tight range, and SMS messages split when
            they exceed 160 characters. A reliable word counter prevents
            surprises before you publish or submit.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Word count vs. character count
          </h3>
          <p className="text-muted">
            Word count totals the words in a piece. Character count totals the
            individual characters, with or without spaces. Long-form writing
            like blog posts and essays tend to use word count, while social
            posts and SMS messages tend to use character count.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Reading time explained
          </h3>
          <p className="text-muted">
            Reading time estimates how long an average reader needs to finish
            your text. We divide the word count by your chosen reading speed —
            usually 200 to 300 words per minute for silent reading and 100 to
            160 words per minute for spoken delivery.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Keyword density explained
          </h3>
          <p className="text-muted">
            Keyword density is the share of your text taken up by a single word
            or phrase. SEO writers use it to confirm a page focuses on its
            target topic without over-stuffing. Toggle stop-word filtering to
            hide common words and surface the words that actually carry
            meaning.
          </p>
        </div>
      </div>
    </section>
  );
}
