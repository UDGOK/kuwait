import "./globals.css";
import { LanguageProvider } from "../components/i18n";

export const metadata = {
  title: "UDGOK — Kuwait Infrastructure Program",
  description:
    "UDGOK delivers the buildings, power, lighting, and mission-critical systems across Kuwait's flagship infrastructure program.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06070a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
