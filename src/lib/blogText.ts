// Brand-safe cleanup for blog text coming from the CMS. The imported posts carry
// two defects: em dashes (banned brand-wide) and a handful of doubled excerpts
// (the meta description stored twice). We clean these at render so every post is
// compliant without editing the CMS, and so a future paste can never put an em
// dash back on the live site. Em dash = U+2014 (also catches the horizontal-bar
// lookalikes U+2013 en dash used as a separator, and U+2015).

const DASH = /[ \t]*[\u2013\u2014\u2015][ \t]*/g; // en/em/bar dash + surrounding spaces/tabs (never newlines)

// Titles read best as "hook: payoff"; body prose reads best with a comma.
export const cleanTitle = (s: string | null | undefined): string =>
  (s || "")
    .replace(DASH, ": ")
    .replace(/ ,/g, ",")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

// Markdown body: normalize every author byline to Monday Morning (the imported
// posts credit several individuals via a "Written By [Name](/blog?author=id)"
// line), then swap the dash. Never touch newlines or double-spaces (markdown
// uses a trailing double-space as a hard line break).
export const cleanBody = (s: string | null | undefined): string =>
  (s || "")
    .replace(/\[[^\]]*\]\(\/blog\?author=[^)]*\)/g, "Monday Morning")
    .replace(/Written [Bb]y\s+(?:Chris Mefford|Zane Curtis|Guest User)\b/g, "Written by Monday Morning")
    .replace(/Written By Monday Morning/g, "Written by Monday Morning")
    .replace(DASH, ", ")
    .replace(/ ,/g, ",")
    .replace(/,[ \t]*,/g, ", ");

// Excerpt / meta description: strip any legacy import-link artifacts, collapse a
// doubled excerpt down to one copy, then swap dashes for commas.
export const cleanExcerpt = (raw: string | null | undefined): string => {
  if (!raw) return "";
  let s = raw
    .replace(/\[\d*\]\([^)]*\)/g, "")
    .replace(/\[\]\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const probe = s.slice(0, 50);
  const dup = probe.length >= 30 ? s.indexOf(probe, 40) : -1;
  if (dup > 40) s = s.slice(0, dup).replace(/[,;.\s]+$/, "") + ".";
  return s
    .replace(/\s*[\u2013\u2014\u2015]\s*/g, ", ")
    .replace(/ ,/g, ",")
    .replace(/,\s*,/g, ", ")
    .trim();
};
