import { useEffect } from "react";

export default function RegisterForm() {

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const initSignup = async () => {
      await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js");
      await loadScript("https://mpsnare.iesnare.com/snare.js");
      await loadScript("https://scripts.bookcdn.net/js/ext/jquery.numeric.js");
      await loadScript("https://scripts.bookcdn.net/js/enroll.js");

      const $ = window.$;

      if ($ && window.signupConfig) {
        window.signupConfig.affTracking = localStorage.getItem("agentTracking");
        $(".signup-container").bpsignup(window.signupConfig);
      }
    };

    initSignup();
  }, []);

  return (
  <div className="signup-container">
    Loading Signup Form...
  </div>

  );
}