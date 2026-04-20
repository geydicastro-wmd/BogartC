import { useEffect } from "react";

export default function AppLogin() {
useEffect(() => {
  const jquery = document.createElement("script");
  jquery.src = "https://code.jquery.com/jquery-3.6.0.min.js";

  const login = document.createElement("script");
  login.src =
    "//api.securecashiersystem.ag/js/Login.js?hid=9b5e446ed6f1e942c3154220fdd778c5";

  jquery.onload = () => {
    login.onload = () => {
      window.bpLogin.autoFocus = false;
      window.bpLogin.build();

       setTimeout(() => {
          const passwordInput = document.getElementById("bpLoginPassword");

          if (passwordInput) {
            const wrapper = passwordInput.parentElement;

            const eye = document.createElement("span");
            eye.innerHTML = "👁";
            eye.className = "password-eye";

            wrapper.style.position = "relative";
            wrapper.appendChild(eye);

            eye.onclick = () => {
              passwordInput.type =
                passwordInput.type === "password" ? "text" : "password";
            };
          }
        }, 500);
      };

    document.body.appendChild(login);
  };

  document.body.appendChild(jquery);
}, []);
  
  return (
    <>
    <div id="bp_login_div" className="mx-auto"></div>
    </>
  );
}