import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useRef } from "react";
import getData from "./getData"; // هذا object وليس function
import ReactPixel from "react-facebook-pixel";

function App() {
  const { facebookPixel, store_name, logo, language } = getData; // ← كما هي لأن getData ليست function

  const pixelInitialized = useRef(false);

  useEffect(() => {
    // تغيير عنوان المتجر
    window.document.title = store_name;

    // تغيير الأيقونة Favicon
    const changeFavicon = (url) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = url;
    };

    // إذا في logo → نضعه كأيقونة
    if (logo) {
      changeFavicon(logo);
    }

    // تفعيل Facebook Pixel مرة واحدة
    if (facebookPixel?.id && !pixelInitialized.current) {
      ReactPixel.init(facebookPixel.id, {}, { debug: false });
      ReactPixel.pageView();
      pixelInitialized.current = true;
    }
  }, []);

  return (
    <div dir={language == "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
