import { useEffect, useRef } from "react";

export default function useLicenseSeal() {
  const licenceRef = useRef(null);

  useEffect(() => {
    let interval;

    const loadSeal = async () => {
      try {
        // 🚫 Skip on localhost
        const isLocalhost =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        if (isLocalhost) {
          console.log("Skipping license seal on localhost");
          return;
        }
        
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const blockedCountries = ["US", "CA"];
        if (blockedCountries.includes(data.country_code)) return;

        const scriptSrc =
          "https://be1f5983-45cb-4d7c-a3be-5e7df4906e2b.snippet.anjcdn.org/anj-seal.js";

        // ✅ avoid duplicate script
        let script = document.querySelector(`script[src="${scriptSrc}"]`);

        if (!script) {
          script = document.createElement("script");
          script.src = scriptSrc;
          script.async = true;
          document.head.appendChild(script);
        }

        script.onload = initSeal;

        // if already loaded (important!)
        if (script.readyState === "complete") {
          initSeal();
        }

        function initSeal() {
          if (!licenceRef.current) return;

          // ✅ create element instead of innerHTML
          const sealDiv = document.createElement("div");
          sealDiv.id = "anj-be1f5983-45cb-4d7c-a3be-5e7df4906e2b";

          sealDiv.setAttribute(
            "data-anj-seal-id",
            "be1f5983-45cb-4d7c-a3be-5e7df4906e2b",
          );
          sealDiv.setAttribute("data-anj-image-size", "45");
          sealDiv.setAttribute("data-anj-image-type", "basic-small");

          licenceRef.current.innerHTML = "";
          licenceRef.current.appendChild(sealDiv);

          // ✅ wait for global safely
          interval = setInterval(() => {
            const instance = window.anj_be1f5983_45cb_4d7c_a3be_5e7df4906e2b;

            if (instance) {
              clearInterval(interval);
              try {
                instance.init();
              } catch (e) {
                console.error("Seal init error:", e);
              }
            }
          }, 200);
        }
      } catch (err) {
        console.error("License error:", err);
      }
    };

    loadSeal();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return licenceRef;
}
