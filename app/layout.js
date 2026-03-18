export const metadata = {
  title: "Archbridge Advisory | Sell-Side M&A Advisory",
  description: "Sell-side M&A advisory for business owners, operators, and private equity sponsors. Investor- and operator-led. Senior-led from origination through close.",
  keywords: "sell-side advisory, M&A, mergers and acquisitions, investment banking, private equity, sell-side M&A",
  openGraph: {
    title: "Archbridge Advisory | Sell-Side M&A Advisory",
    description: "Investor- and operator-led sell-side M&A advisory. Senior-led from origination through close.",
    url: "https://archbridgeadvisory.com",
    siteName: "Archbridge Advisory",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Archbridge Advisory | Sell-Side M&A Advisory",
    description: "Investor- and operator-led sell-side M&A advisory.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
