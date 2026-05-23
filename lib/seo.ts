export const siteConfig = {
  name: "Niranjan Chaudhari",
  title: "Niranjan Chaudhari | Software Engineer",
  description:
    "Niranjan Chaudhari helps founders turn product ideas into scalable, production-ready systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iniranjan.com",
  ogImage: "/assets/portrait-image.jpg",
  creator: "Niranjan Chaudhari",
  email: "iniranjanchaudhari@gmail.com",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
