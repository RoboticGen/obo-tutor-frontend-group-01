import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import GlobalContextProvider from "@/context/GlobalContextProvider";
import Login from "@/components/Login";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Obotutor",
  description: "LLM model",
};

export default function RootLayout({ children }) {
  const session = true;
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GlobalContextProvider>
          <div className="scroll-m-0">{children}</div>
          <Toaster />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
