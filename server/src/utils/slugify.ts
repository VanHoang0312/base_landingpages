import slugifyLib from "slugify";

export function createSlug(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}

export function createUniqueSlug(text: string, suffix?: string | number): string {
  const base = createSlug(text);
  return suffix ? `${base}-${suffix}` : base;
}
