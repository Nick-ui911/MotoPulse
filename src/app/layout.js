import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReduxProvider from "./components/ReduxProvider";
import StayLoginInReload from "./components/StayLoginInReload";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-orbitron",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});


export const metadata = {
  title: "Moto Pulse | Track & Manage Your Bike Services Easily",
  description:
    "Moto Pulse helps you track bike services, set maintenance reminders, and explore the latest motorcycle news and reviews — all in one place.",
  keywords:
    "bike service tracking, motorcycle maintenance, moto pulse, bike reminders, service history, bike reviews",
  authors: [{ name: "Moto Pulse Team" }],
  openGraph: {
    title: "Moto Pulse | Smart Bike Service Tracker",
    description:
      "Track your motorcycle services, schedule reminders, and explore the latest motorbike updates with Moto Pulse.",
    url: "https://moto-pulse.vercel.app", // ✅ your actual deployed URL
    siteName: "Moto Pulse",
    images: [
      {
        url: "https://moto-pulse.vercel.app/moto-pulse%20image.png", // ✅ image hosted on your site
        width: 1200,
        height: 630,
        alt: "Moto Pulse - Bike Service Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moto Pulse | Bike Service & Maintenance Tracker",
    description:
      "Stay on top of your bike’s maintenance and get service reminders with Moto Pulse.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${poppins.variable} antialiased`}>
        <ReduxProvider>
          <StayLoginInReload/>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
