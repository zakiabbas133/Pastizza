import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { CartDrawer } from "./components/Cart/CartDrawer";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Overview } from "./pages/Overview/Overview";
import { Menu } from "./pages/Menu/Menu";
import { MenuItemDetail } from "./pages/Menu/MenuItemDetail";
import { Reviews } from "./pages/Reviews/Reviews";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { NotFound } from "./pages/NotFound/NotFound";
import WebsiteLoader from "./components/WebsiteLoader/WebsiteLoader";
import SocialFab from "./components/SocialMedia/SocialFab";
import DealDetails from "./pages/Deal/DealDetails";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <SocialFab />
        <WebsiteLoader />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuItemDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}
