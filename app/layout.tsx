import { Footer, Navbar } from "@/components";
import "./globals.css";


import Login from "@/loginsignup/login";
import Signup from "@/loginsignup/signup";
export const metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar/>
        {children}
        <Footer/>
        <Login/>
        <Signup/>
      </body>
    </html>
  );
}
