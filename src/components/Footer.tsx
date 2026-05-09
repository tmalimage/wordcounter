import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t border-border mt-12"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm text-muted">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          <div>
            <h2 className="font-semibold text-foreground mb-2">Tool</h2>
            <ul className="space-y-1">
              <li><a href="#tool" className="hover:text-foreground">Word counter</a></li>
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#how-to-use" className="hover:text-foreground">How to use</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-2">Analysis</h2>
            <ul className="space-y-1">
              <li><a href="#readability" className="hover:text-foreground">Readability scores</a></li>
              <li><a href="#keyword-density" className="hover:text-foreground">Keyword density</a></li>
              <li><a href="#reading-time" className="hover:text-foreground">Reading time</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-2">Limits</h2>
            <ul className="space-y-1">
              <li><a href="#platform-limits" className="hover:text-foreground">Platform limits</a></li>
              <li><a href="#platform-limits" className="hover:text-foreground">Twitter / X 280</a></li>
              <li><a href="#platform-limits" className="hover:text-foreground">SMS 160</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-2">Help</h2>
            <ul className="space-y-1">
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#about" className="hover:text-foreground">About</a></li>
            </ul>
          </div>
        </nav>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border pt-4">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Counts run locally in your
            browser — your text never leaves your device.
          </p>
          <p>Free · No signup · No upload</p>
        </div>
      </div>
    </footer>
  );
}
