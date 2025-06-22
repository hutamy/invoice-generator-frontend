import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HomeHero from "../components/home/HomeHero";
import HomeFeatures from "../components/home/HomeFeatures";
import HomeInvoice from "../components/home/HomeInvoice";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="isolate">
        <HomeHero />
        <HomeFeatures />
        <HomeInvoice />
      </main>
      <Footer />
    </div>
  );
}
