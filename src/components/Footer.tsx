import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. Counts run locally in your
          browser.
        </p>
        <p>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </p>
      </div>
    </footer>
  );
}
