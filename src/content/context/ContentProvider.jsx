import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import { useLanguage } from "./language-context";
import { ContentContext } from "./content-context";
import {
  CMS_BRAND_ID,
  CMS_BRAND_NAME,
  indexPagesByType,
  pickTranslatedItem,
  pickTranslation,
} from "../utils/content";

const PAGE_REQUESTS = [
  {
    pageType: "Header",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "Footer",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "home",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "AboutUs",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "Cashier",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "ContactUs",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "LiveCasino",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "Lottery",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "Register",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "Login",
    params: { brand_id: CMS_BRAND_ID },
  },
  {
    pageType: "GeneralRules",
    params: { brand: CMS_BRAND_NAME },
  },
];

function createTermsKey(lang, type) {
  return `${lang}:${type}`;
}

export default function ContentProvider({ children }) {
  const { lang } = useLanguage();
  const [pages, setPages] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [gameOfWeek, setGameOfWeek] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [bootstrapError, setBootstrapError] = useState(null);
  const [termsEntries, setTermsEntries] = useState({});
  const [termsLoading, setTermsLoading] = useState({});
  const [termsErrors, setTermsErrors] = useState({});

  useEffect(() => {
    let ignore = false;

    async function bootstrapContent() {
      setIsBootstrapping(true);
      setBootstrapError(null);

      const [pageResults, slidersResult, promotionsResult, gameResult] =
        await Promise.all([
          Promise.allSettled(
            PAGE_REQUESTS.map(async ({ pageType, params }) => {
              const res = await api.get("/content-page/admin", {
                params: {
                  ...params,
                  page_type: pageType,
                  language: lang,
                },
              });

              const selectedPage = pickTranslatedItem(res.data?.items || [], lang);

              return selectedPage
                ? {
                    ...selectedPage,
                    page_type: selectedPage.page_type || pageType,
                  }
                : null;
            }),
          ),
          api
            .get("/sliders", {
              params: {
                brand: CMS_BRAND_NAME,
                language: lang,
                order_by: "position",
              },
            })
            .then((res) => ({
              ok: true,
              data: res.data?.items || [],
            }))
            .catch((error) => ({
              ok: false,
              error,
            })),
          api
            .get("/promotion", {
              params: {
                brand: CMS_BRAND_NAME,
                language: lang,
              },
            })
            .then((res) => ({
              ok: true,
              data: Array.isArray(res.data) ? res.data : [],
            }))
            .catch((error) => ({
              ok: false,
              error,
            })),
          api
            .get("/game-of-the-week/", {
              params: {
                brand: CMS_BRAND_NAME,
                language: lang,
              },
            })
            .then((res) => ({
              ok: true,
              data: res.data?.items || [],
            }))
            .catch((error) => ({
              ok: false,
              error,
            })),
        ]);

      if (ignore) {
        return;
      }

      const loadedPages = pageResults
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => result.value);

      const pageErrors = pageResults
        .filter((result) => result.status === "rejected")
        .map((result) => result.reason?.response?.data?.message || result.reason?.message);

      setPages(loadedPages);
      setSliders(slidersResult.ok ? slidersResult.data : []);
      setPromotions(promotionsResult.ok ? promotionsResult.data : []);

      const selectedGame = gameResult.ok
        ? pickTranslatedItem(gameResult.data, lang)
        : null;

      setGameOfWeek(
        selectedGame?.is_enabled && selectedGame?.is_active ? selectedGame : null,
      );

      const bootstrapErrors = [
        ...pageErrors,
        slidersResult.ok
          ? null
          : slidersResult.error?.response?.data?.message ||
            slidersResult.error?.message,
        promotionsResult.ok
          ? null
          : promotionsResult.error?.response?.data?.message ||
            promotionsResult.error?.message,
        gameResult.ok
          ? null
          : gameResult.error?.response?.data?.message || gameResult.error?.message,
      ].filter(Boolean);

      if (!loadedPages.length && bootstrapErrors.length) {
        setBootstrapError(bootstrapErrors[0]);
      } else {
        setBootstrapError(null);
      }

      setIsBootstrapping(false);
    }

    bootstrapContent();

    return () => {
      ignore = true;
    };
  }, [lang]);

  const pagesByType = useMemo(() => indexPagesByType(pages, lang), [lang, pages]);

  const getPage = useCallback(
    (pageType) => pagesByType[pageType] || null,
    [pagesByType],
  );

  const getPageTranslation = useCallback(
    (pageType, targetLang = lang) => pickTranslation(getPage(pageType), targetLang),
    [getPage, lang],
  );

  const getPromotionBySlug = useCallback(
    (slug) => promotions.find((promotion) => promotion.slug === slug) || null,
    [promotions],
  );

  const getTermsEntry = useCallback(
    (type) => {
      const key = createTermsKey(lang, type);
      return termsEntries[key] || null;
    },
    [lang, termsEntries],
  );

  const ensureTermsLoaded = useCallback(
    async (type) => {
      const key = createTermsKey(lang, type);

      if (termsEntries[key] || termsLoading[key]) {
        return termsEntries[key] || null;
      }

      setTermsLoading((current) => ({
        ...current,
        [key]: true,
      }));
      setTermsErrors((current) => ({
        ...current,
        [key]: null,
      }));

      try {
        const res = await api.get("/terms-conditions/", {
          params: {
            brand: CMS_BRAND_NAME,
            type,
            language: lang,
          },
        });

        const item = pickTranslatedItem(res.data?.items || [], lang);

        setTermsEntries((current) => ({
          ...current,
          [key]: item,
        }));

        return item;
      } catch (error) {
        const message =
          error.response?.data?.message || "Error loading terms content";

        setTermsErrors((current) => ({
          ...current,
          [key]: message,
        }));

        return null;
      } finally {
        setTermsLoading((current) => ({
          ...current,
          [key]: false,
        }));
      }
    },
    [lang, termsEntries, termsLoading],
  );

  const getTermsState = useCallback(
    (type) => {
      const key = createTermsKey(lang, type);

      return {
        item: termsEntries[key] || null,
        loading: Boolean(termsLoading[key]),
        error: termsErrors[key] || null,
      };
    },
    [lang, termsEntries, termsErrors, termsLoading],
  );

  const value = useMemo(
    () => ({
      lang,
      pages,
      pagesByType,
      sliders,
      promotions,
      gameOfWeek,
      isBootstrapping,
      bootstrapError,
      getPage,
      getPageTranslation,
      getPromotionBySlug,
      getTermsEntry,
      getTermsState,
      ensureTermsLoaded,
    }),
    [
      bootstrapError,
      ensureTermsLoaded,
      gameOfWeek,
      getPage,
      getPageTranslation,
      getPromotionBySlug,
      getTermsEntry,
      getTermsState,
      isBootstrapping,
      lang,
      pages,
      pagesByType,
      promotions,
      sliders,
    ],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
