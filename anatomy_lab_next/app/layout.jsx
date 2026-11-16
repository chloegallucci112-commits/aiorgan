import "./globals.css";

export const metadata = {
  title: "Anatomy Lab | The Heart",
  description: "A hands-on anatomical museum with a context-aware AI tutor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
