import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
// import 'leaflet/dist/leaflet.css';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Travour",
  description: "A Community Driven Travel Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
