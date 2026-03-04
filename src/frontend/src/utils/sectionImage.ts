export function getSectionImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("announcement"))
    return "/assets/generated/section-announcement.dim_800x500.jpg";
  if (n.includes("newsletter"))
    return "/assets/generated/section-newsletter.dim_800x500.jpg";
  if (n.includes("social proof") || n.includes("counter"))
    return "/assets/generated/section-stats.dim_800x500.jpg";
  if (n.includes("feature"))
    return "/assets/generated/section-features.dim_800x500.jpg";
  if (n.includes("simple image") || n.includes("image banner"))
    return "/assets/generated/section-hero.dim_800x500.jpg";
  if (n.includes("hero"))
    return "/assets/generated/section-hero.dim_800x500.jpg";
  if (n.includes("product"))
    return "/assets/generated/section-product.dim_800x500.jpg";
  if (n.includes("testimonial"))
    return "/assets/generated/section-testimonials.dim_800x500.jpg";
  if (n.includes("brand") || n.includes("story"))
    return "/assets/generated/section-brand.dim_800x500.jpg";
  if (n.includes("collection") || n.includes("grid"))
    return "/assets/generated/section-collection.dim_800x500.jpg";
  return "/assets/generated/section-hero.dim_800x500.jpg";
}
