import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection, FAQ_ITEMS } from "@/components/FAQSection";
import { InfoSection } from "@/components/InfoSection";
import { WordCounterApp } from "@/components/WordCounterApp";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const webApplicationLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description:
    "Free online word counter for words, characters, sentences, paragraphs, reading time, keyword density, and readability.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <section className="mb-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Free Word Counter Online
          </h1>
          <p className="mt-2 text-muted max-w-3xl">
            Count words, characters, sentences, paragraphs, reading time,
            keyword density, and readability instantly. Paste or type your text
            below and get real-time writing statistics directly in your
            browser.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
