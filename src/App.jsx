import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useRef } from "react";
import getData from "./getData";
import ReactPixel from "react-facebook-pixel";

function App() {
  const { facebookPixel } = getData;
  const pixelInitialized = useRef(false); // ✅ أفضل من let

  useEffect(() => {
    // ✅ Init Facebook Pixel once
    if (facebookPixel.id && !pixelInitialized.current) {
      ReactPixel.init(facebookPixel.id, {}, { debug: false });
      ReactPixel.pageView();
      pixelInitialized.current = true;
    }

    // ✅ لو تريد تفعيل TikTok Pixel أيضًا أخبرني أضيفه لك هنا
    // if (TiktokPixel?.id) {
    //   initTikTokPixel(TiktokPixel.id);
    // }

  }, []);

  return (
    <div dir="rtl">
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
