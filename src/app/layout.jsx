// app/layout.jsx
import "./globals.css";;
import { Poppins, Montserrat, Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Trivenika",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
