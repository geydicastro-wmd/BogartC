import { useEffect, useMemo } from "react";
import { useContent } from "../context/content-context";
import { pickTranslation } from "../utils/content";

export default function useTermsContent(type) {
  const { lang, ensureTermsLoaded, getTermsState } = useContent();
  const { item, loading, error } = getTermsState(type);

  useEffect(() => {
    ensureTermsLoaded(type);
  }, [ensureTermsLoaded, type]);

  const translation = useMemo(() => pickTranslation(item, lang), [item, lang]);

  return {
    terms: item,
    translation,
    loading,
    error,
  };
}
