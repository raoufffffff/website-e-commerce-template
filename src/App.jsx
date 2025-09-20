import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import getData from "./getData";
import ReactPixel from "react-facebook-pixel";
import { initTikTokPixel } from "./utility/tiktokPixel";

let pixelInitialized = false;

function App() {
  const { TiktokPixel, facebookPixel } = getData;

  useEffect(() => {
    // Init TikTok Pixel if available
    if (TiktokPixel?.id) {
      initTikTokPixel(TiktokPixel.id);
    }

    // Init Facebook Pixel once
    if (facebookPixel.id && !pixelInitialized) {
      ReactPixel.init(facebookPixel.id, {}, { debug: false });
      ReactPixel.pageView(); // Track initial page view
      pixelInitialized = true;
    }
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
