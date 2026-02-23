import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "FN solution Consulting",
  description: "We Make Your Value Visible. 비즈니스 컨설팅 | 해외 진출 | 서비스 개발 | 리더십",
  keywords: ["FN solution", "컨설팅", "비즈니스 컨설팅", "해외 진출", "서비스 개발", "리더십", "기업 컨설팅"],
  authors: [{ name: "FN solution" }],
  creator: "FN solution",
  publisher: "FN solution Consulting, Inc.",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://fnsolution.co.kr",
    siteName: "FN solution Consulting",
    title: "FN solution - We Make Your Value Visible",
    description: "비즈니스 컨설팅 | 해외 진출 | 서비스 개발 | 리더십",
    images: [
      {
        url: "/logo-light.png",
        width: 1200,
        height: 630,
        alt: "FN solution Consulting",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "FN solution Consulting",
    description: "We Make Your Value Visible",
    images: ["/logo-light.png"],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
