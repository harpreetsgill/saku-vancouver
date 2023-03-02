import Header from "../components/UI/Header";
import Container from "../components/Layout/Container";
import Footer from "../components/UI/Footer";

import { Inter } from "@next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const footerData = pageProps.misc.filter(
    (item) => item.type !== "Hero Text" && item.type !== "Franchisee Card"
  );
  const instagramData = pageProps.misc.filter(
    (item) => item.type === "Instagram Account"
  );

  return (
    <div className={inter.className}>
      <Container>
        <Header data={instagramData} />
        <Component {...pageProps} />
        <Footer data={footerData} />
      </Container>
    </div>
  );
}
