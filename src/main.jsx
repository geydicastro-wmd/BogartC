import { StrictMode, lazy, Suspense } from "react";
import { registerSW } from "virtual:pwa-register";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Loading from "./components/common/loading.jsx";
import "./scss/index.scss";
import App from "./App.jsx";
import LanguageProvider from "./content/context/LanguageProvider.jsx";
import ContentProvider from "./content/context/ContentProvider.jsx";

const Home = lazy(() => import("./pages/home.jsx"));
const Casino = lazy(() => import("./pages/Casino/casino.jsx"));
const LiveCasino = lazy(() => import("./pages/livecasino.jsx"));
const Lottery = lazy(() => import("./pages/Lottery.jsx"));
const Promotions = lazy(() => import("./pages/Promos/promotions.jsx"));
const PromoDetail = lazy(() => import("./pages/Promos/PromoDetail.jsx"));

const About = lazy(() => import("./pages/about.jsx"));
const Cashier = lazy(() => import("./pages/cashier.jsx"));
const Contact = lazy(() => import("./pages/contact.jsx"));

const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

const Rules = lazy(() => import("./pages/Terms/Rules.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/Terms/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(
  () => import("./pages/Terms/TermsAndConditions.jsx"),
);
const ResponsableGaming = lazy(
  () => import("./pages/Terms/ResponsableGaming.jsx"),
);
const KYCPolicy = lazy(() => import("./pages/Terms/KYCPolicy.jsx"));
const AMLPolicy = lazy(() => import("./pages/Terms/AMLPolicy.jsx"));
const CollusionFraudCriminalActivity = lazy(
  () => import("./pages/Terms/CollusionFraudCriminalActivity.jsx"),
);
const BonusesAndPromotions = lazy(
  () => import("./pages/Terms/BonusesAndPromotions.jsx"),
);
const DepositRules = lazy(() => import("./pages/Terms/DepositRules.jsx"));
const WithdrawalRules = lazy(() => import("./pages/Terms/WithdrawalRules.jsx"));
const LotteryRules = lazy(() => import("./pages/Terms/LotteryRules.jsx"));

registerSW({
  onOfflineReady() {
    console.log("App lista para funcionar offline");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <ContentProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cashier" element={<Cashier />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/lottery" element={<Lottery />} />
                  <Route path="/casino" element={<Casino />} />
                  <Route path="/live-casino" element={<LiveCasino />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/promotions" element={<Promotions />} />
                  <Route path="/promotions/:slug" element={<PromoDetail />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/rules/privacy" element={<PrivacyPolicy />} />
                  <Route
                    path="/rules/terms-and-conditions"
                    element={<TermsAndConditions />}
                  />
                  <Route
                    path="/rules/responsible-gaming"
                    element={<ResponsableGaming />}
                  />
                  <Route path="/rules/kyc" element={<KYCPolicy />} />
                  <Route path="/rules/aml-policy" element={<AMLPolicy />} />
                  <Route
                    path="/rules/anti-fraud"
                    element={<CollusionFraudCriminalActivity />}
                  />
                  <Route
                    path="/rules/bonuses"
                    element={<BonusesAndPromotions />}
                  />
                  <Route path="/rules/deposit" element={<DepositRules />} />
                  <Route
                    path="/rules/withdrawal"
                    element={<WithdrawalRules />}
                  />
                  <Route
                    path="/rules/lottery-rules"
                    element={<LotteryRules />}
                  />
                </Route>
              </Routes>
            </Suspense>
          </ContentProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
