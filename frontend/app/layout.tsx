import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "श्री राधाकृष्ण प्रेम मंदिर संस्थान | Shri Radhakrishna Prem Mandir Sansthan",
  description:
    "नामपूर, ता. शिंदखेडा, जि. धुळे येथे स्थापित श्री राधाकृष्ण प्रेम मंदिर संस्थान — भक्ती, सेवा आणि समर्पणाचे पवित्र स्थान. Shri Radhakrishna Prem Mandir Sansthan, Nampoor, Dist. Dhule, Maharashtra.",
  keywords: [
    "Radhakrishna Mandir",
    "Nampoor temple",
    "Dhule temple",
    "श्री राधाकृष्ण",
    "Shri Radhakrishna Prem Mandir",
    "Gaushala",
    "Hindu temple Maharashtra",
  ],
  openGraph: {
    title: "श्री राधाकृष्ण प्रेम मंदिर संस्थान",
    description: "भक्ती, सेवा आणि समर्पणाचे पवित्र स्थान — नामपूर, धुळे, महाराष्ट्र",
    images: ["/images/Iogo.JPG.jpeg"],
    locale: "mr_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Noto+Serif+Devanagari:wght@500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
