import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
