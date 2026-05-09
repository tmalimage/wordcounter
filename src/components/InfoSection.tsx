export function InfoSection() {
  return (
    <section
      id="about"
      aria-labelledby="info-heading"
      className="rounded-xl border border-border bg-card p-6 shadow-sm prose prose-sm dark:prose-invert max-w-none"
    >
      <h2
        id="info-heading"
        className="text-2xl font-bold mb-4 not-prose"
      >
        The free online word counter for writers, students &amp; SEOs
      </h2>

      <div className="space-y-5 text-sm leading-relaxed text-foreground">
        <div>
          <p className="text-muted">
            Free Word Counter is a fast, private, browser-based writing tool
            that gives you instant statistics on any text — words, characters
            (with and without spaces), sentences, paragraphs, syllables, lines,
            unique words, reading time, speaking time, keyword density, and
            multiple readability scores. Nothing is uploaded, nothing is
            stored on a server, and there is no signup. Just paste, type, and
            count.
          </p>
        </div>

        <div id="features">
          <h3 className="font-semibold text-base mb-1">
            Everything this word counter measures
          </h3>
          <ul className="text-muted list-disc pl-5 space-y-1">
            <li>Word count, character count (with and without spaces), sentence count, paragraph count</li>
            <li>Line count, syllable count, unique-word count, average word length, average sentence length</li>
            <li>Estimated reading time at 150–300 words per minute</li>
            <li>Estimated speaking time at 100–160 words per minute</li>
            <li>Keyword density and n-gram (1, 2, 3-word phrase) frequency</li>
            <li>Readability scores: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Automated Readability Index, Coleman-Liau</li>
            <li>Platform character-limit checks: X / Twitter, SMS, Instagram, LinkedIn, YouTube, meta descriptions, and custom limits</li>
            <li>Writing-goal progress tracking with a configurable target</li>
          </ul>
        </div>

        <div id="how-to-use">
          <h3 className="font-semibold text-base mb-1">
            How to use the word counter
          </h3>
          <ol className="text-muted list-decimal pl-5 space-y-1">
            <li>Paste or type your draft into the editor at the top of the page.</li>
            <li>Watch every statistic update in real time as you write.</li>
            <li>Adjust reading and speaking words-per-minute to match your audience.</li>
            <li>Open the keyword-density panel to see which terms dominate your draft.</li>
            <li>Open the platform-limits panel to confirm your text fits a tweet, SMS, caption, or post.</li>
            <li>Set a writing goal to track progress toward an essay or article target.</li>
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Why word count matters
          </h3>
          <p className="text-muted">
            Most platforms enforce length rules. Search engines truncate meta
            descriptions around 155–160 characters, social networks cut off
            captions, professors expect essay lengths within a tight range,
            and SMS messages split when they exceed 160 characters. A reliable
            word counter prevents surprises before you publish or submit.
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
            posts, push notifications, and SMS messages tend to use character
            count.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1" id="reading-time">
            Reading time explained
          </h3>
          <p className="text-muted">
            Reading time estimates how long an average reader needs to finish
            your text. We divide the word count by your chosen reading speed —
            usually 200 to 300 words per minute for silent reading and 100 to
            160 words per minute for spoken delivery. Choose the slower end of
            the range for technical or academic content and the faster end for
            casual blog posts.
          </p>
        </div>

        <div id="keyword-density">
          <h3 className="font-semibold text-base mb-1">
            Keyword density &amp; SEO
          </h3>
          <p className="text-muted">
            Keyword density is the share of your text taken up by a single
            word or phrase. SEO writers use it to confirm a page focuses on
            its target topic without over-stuffing. Toggle stop-word filtering
            to hide common words and surface the words that actually carry
            meaning. Most SEO professionals aim for a primary keyword density
            of roughly 1% to 2% and avoid going above 3%.
          </p>
        </div>

        <div id="readability">
          <h3 className="font-semibold text-base mb-1">
            Readability scores explained
          </h3>
          <p className="text-muted">
            Readability formulas estimate how difficult a piece of text is to
            read. <strong>Flesch Reading Ease</strong> ranges from 0 (very
            hard) to 100 (very easy); aim for 60 or higher for general web
            content. <strong>Flesch-Kincaid Grade Level</strong>,{" "}
            <strong>Gunning Fog</strong>, <strong>SMOG</strong>,{" "}
            <strong>Coleman-Liau</strong>, and the{" "}
            <strong>Automated Readability Index</strong> all map your text to
            a US school grade. For mass-market writing, target grade 8 or
            below.
          </p>
        </div>

        <div id="platform-limits">
          <h3 className="font-semibold text-base mb-1">
            Platform character limits at a glance
          </h3>
          <ul className="text-muted list-disc pl-5 space-y-1">
            <li>X / Twitter post: 280 characters</li>
            <li>SMS message: 160 characters per segment</li>
            <li>Instagram caption: 2,200 characters</li>
            <li>LinkedIn post: 3,000 characters</li>
            <li>YouTube title: 100 characters</li>
            <li>YouTube description: 5,000 characters</li>
            <li>Meta description (search snippet): ~155–160 characters</li>
            <li>Title tag: ~50–60 characters</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Who uses this word counter
          </h3>
          <ul className="text-muted list-disc pl-5 space-y-1">
            <li><strong>Students &amp; academics</strong> hitting essay, dissertation, and abstract word-count targets.</li>
            <li><strong>Bloggers &amp; content writers</strong> aiming for SEO-friendly article lengths.</li>
            <li><strong>SEO specialists</strong> checking keyword density and readability before publishing.</li>
            <li><strong>Copywriters &amp; marketers</strong> tightening headlines, ads, and meta descriptions.</li>
            <li><strong>Social media managers</strong> fitting captions to platform limits.</li>
            <li><strong>Speechwriters, podcasters &amp; YouTubers</strong> estimating spoken delivery time.</li>
            <li><strong>Translators &amp; editors</strong> tracking word counts for invoicing.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">
            Privacy &amp; security
          </h3>
          <p className="text-muted">
            Your text stays on your device. Every count, density check, and
            readability score is computed in your browser using JavaScript.
            We do not transmit your draft to any server, we do not store it
            in a database, and we do not share it with third parties. Drafts
            are kept in your browser&apos;s local storage so you can come back
            to them — clear your site data to remove them.
          </p>
        </div>
      </div>
    </section>
  );
}
