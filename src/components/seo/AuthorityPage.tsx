import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export interface AuthoritySection {
  /** H2 heading */
  heading: string;
  /** Optional anchor id */
  id?: string;
  /** Body content (paragraphs, lists, tables, etc.) */
  body: ReactNode;
}

export interface AuthorityFAQ {
  question: string;
  answer: string;
}

export interface AuthorityRelatedLink {
  label: string;
  href: string;
  description?: string;
}

export interface AuthorityPageProps {
  // SEO
  title: string;
  description: string;
  path: string;
  ogImage: string;
  // Hero
  eyebrow?: string;
  h1: string;
  subhead: string;
  /** TL;DR shown in first 80 words for AEO */
  tldr: string;
  heroImage?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  // Body
  sections: AuthoritySection[];
  // FAQ + linking
  faqs: AuthorityFAQ[];
  relatedLinks?: AuthorityRelatedLink[];
  breadcrumbs?: { name: string; url: string }[];
  /** Optional extra schema (e.g., ItemList) */
  extraSchema?: object | object[];
}

/**
 * Long-form SEO authority page template.
 * Use for pillar/cluster hubs and 1500+ word supporting articles.
 * Provides: hero, TL;DR, semantic H2 sections, FAQ accordion + schema,
 * breadcrumb schema, related-links footer.
 */
const AuthorityPage = ({
  title,
  description,
  path,
  ogImage,
  eyebrow,
  h1,
  subhead,
  tldr,
  heroImage,
  ctaPrimary,
  ctaSecondary,
  sections,
  faqs,
  relatedLinks = [],
  breadcrumbs,
  extraSchema,
}: AuthorityPageProps) => {
  const faqSchema = faqs.length ? generateFAQSchema(faqs) : null;
  const breadcrumbSchema = breadcrumbs?.length
    ? generateBreadcrumbSchema(breadcrumbs)
    : null;

  const schemas: object[] = [];
  if (faqSchema) schemas.push(faqSchema);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  if (extraSchema) {
    if (Array.isArray(extraSchema)) schemas.push(...extraSchema);
    else schemas.push(extraSchema);
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={title}
        description={description}
        path={path}
        image={ogImage}
        type="article"
        schema={schemas}
      />
      <Header forceSolid />
      <main>
        {/* Hero */}
        <section className="relative bg-forest text-cream pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          {heroImage && (
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
          )}
          {/* Top scrim so the cream header nav stays legible over the hero */}
          <div
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-deep via-forest-deep/80 to-transparent pointer-events-none z-[1]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto px-4 lg:px-8 max-w-4xl">
            {eyebrow && (
              <p className="font-sans uppercase tracking-[0.2em] text-xs text-gold-warm mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              {h1}
            </h1>
            <p className="font-sans text-lg md:text-xl text-cream/85 max-w-3xl mb-8">
              {subhead}
            </p>
            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-wrap gap-3">
                {ctaPrimary && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-gold-warm text-forest hover:bg-gold-warm/90"
                  >
                    <Link to={ctaPrimary.href}>{ctaPrimary.label}</Link>
                  </Button>
                )}
                {ctaSecondary && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-forest"
                  >
                    <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* TL;DR (AEO answer block) */}
        <section className="bg-cream py-10 border-b border-forest/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="border-l-4 border-gold-warm pl-5">
              <p className="font-sans uppercase tracking-[0.2em] text-xs text-forest/60 mb-2">
                The short version
              </p>
              <p className="font-sans text-base md:text-lg text-forest leading-relaxed">
                {tldr}
              </p>
            </div>
          </div>
        </section>

        {/* Body sections */}
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="prose prose-lg max-w-none font-sans text-forest [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:text-forest [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-forest [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:mb-2 [&_a]:text-forest-deep [&_a]:underline [&_a:hover]:text-gold-warm [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:bg-forest [&_th]:text-cream [&_th]:p-3 [&_th]:text-left [&_td]:p-3 [&_td]:border [&_td]:border-forest/20 [&_strong]:font-semibold">
              {sections.map((s, i) => (
                <section key={i} id={s.id}>
                  <h2>{s.heading}</h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </article>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="bg-cream py-16 md:py-20 border-t border-forest/10">
            <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="font-serif text-left text-lg text-forest">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-forest/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Related */}
        {relatedLinks.length > 0 && (
          <section className="bg-background py-16 border-t border-forest/10">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Keep reading
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block p-6 border-2 border-forest/15 hover:border-forest hover:bg-forest hover:text-cream transition-colors group"
                  >
                    <h3 className="font-serif text-xl mb-2 group-hover:text-cream">
                      {link.label}
                    </h3>
                    {link.description && (
                      <p className="font-sans text-sm text-forest/70 group-hover:text-cream/85">
                        {link.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-forest text-cream py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Try before you buy
            </h2>
            <p className="font-sans text-cream/85 mb-8 max-w-xl mx-auto">
              Two San Diego tasting rooms. 500+ non-alcoholic drinks on the
              shelf. Sample anything before you commit, or shop the full
              catalog online.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gold-warm text-forest hover:bg-gold-warm/90"
              >
                <Link to="/shop">Shop online</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream/40 text-cream hover:bg-cream/10"
              >
                <Link to="/locations">Visit a tasting room</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorityPage;
