import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection, FAQ_ITEMS } from "@/components/FAQSection";
import { InfoSection } from "@/components/InfoSection";
import { WordCounterApp } from "@/components/WordCounterApp";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

const FEATURE_LIST = [
  "Live word and character count",
  "Sentence and paragraph count",
  "Reading time and speaking time estimates",
  "Keyword density and n-gram analysis",
  "Flesch Reading Ease and Flesch-Kincaid Grade Level",
  "Gunning Fog, SMOG, Coleman-Liau, ARI readability",
  "Platform character-limit checks (X/Twitter, SMS, Instagram, LinkedIn, YouTube)",
  "Custom platform limits and writing-goal tracking",
  "Dark mode and auto-saved drafts",
  "100% private — runs in your browser, no signup",
];

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/apple-icon`,
    width: 180,
    height: 180,
  },
  sameAs: [],
};

const webApplicationLd = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${SITE_URL}/#webapp`,
  name: SITE_NAME,
  alternateName: "Online Word Counter",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Writing & Editing",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  description:
    "Free online word counter for words, characters, sentences, paragraphs, syllables, reading time, speaking time, keyword density, and readability scores including Flesch, Flesch-Kincaid, Gunning Fog, SMOG, Coleman-Liau, and Automated Readability Index.",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  featureList: FEATURE_LIST,
  softwareVersion: "1.0",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  permissions: "No special permissions required",
  screenshot: `${SITE_URL}/opengraph-image`,
  image: `${SITE_URL}/opengraph-image`,
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Word Counter",
      item: SITE_URL,
    },
  ],
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to count words and characters online",
  description:
    "Use the free online word counter to count words, characters, sentences, paragraphs, reading time, keyword density, and readability for any text — directly in your browser.",
  totalTime: "PT1M",
  inLanguage: "en-US",
  tool: [
    {
      "@type": "HowToTool",
      name: "Free Word Counter (web app)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the word counter",
      text: "Open the free word counter page in any modern web browser. No signup or download is required.",
      url: `${SITE_URL}/#tool`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Paste or type your text",
      text: "Paste your essay, blog post, tweet, caption, or any text into the editor at the top of the page.",
      url: `${SITE_URL}/#tool`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your live statistics",
      text: "Word count, character count, sentence count, paragraph count, reading time, and speaking time update in real time.",
      url: `${SITE_URL}/#features`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Check keyword density and readability",
      text: "Open the keyword-density and readability panels to see which words dominate your draft and how easy it is to read.",
      url: `${SITE_URL}/#readability`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Fit platform limits",
      text: "Use the platform-limits panel to confirm your text fits a tweet, SMS, Instagram caption, LinkedIn post, or YouTube description.",
      url: `${SITE_URL}/#platform-limits`,
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const graphLd = {
  "@context": "https://schema.org",
  "@graph": [
    websiteLd,
    organizationLd,
    webApplicationLd,
    breadcrumbLd,
    howToLd,
    faqLd,
  ],
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-8"
        itemScope
        itemType="https://schema.org/WebApplication"
      >
        <meta itemProp="name" content={SITE_NAME} />
        <meta itemProp="applicationCategory" content="UtilitiesApplication" />
        <meta itemProp="operatingSystem" content="Any" />

        <section
          id="tool"
          aria-labelledby="page-heading"
          className="mb-6 text-center sm:text-left"
        >
          <h1
            id="page-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Free Word Counter Online — Count Words, Characters &amp; Reading
            Time
          </h1>
          <p
            className="mt-2 text-muted max-w-3xl"
            itemProp="description"
          >
            Count words, characters, sentences, paragraphs, syllables, reading
            time, speaking time, keyword density, and readability instantly.
            Paste or type your text below to get real-time writing statistics
            directly in your browser. No signup. No upload. 100% free.
          </p>
        </section>

        <WordCounterApp />

        <div className="mt-10 space-y-6">
          <InfoSection />
          <FAQSection />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
      />
    </>
  );
}
