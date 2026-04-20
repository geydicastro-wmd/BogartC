import { useMemo } from "react";
import { useContent } from "../context/content-context";
import {
  decodeText,
  filterBlocks,
  getBlocksFromTranslation,
  pickTranslation,
  renderHtml,
} from "../utils/content";

export default function useCmsPage(pageType) {
  const { getPage, isBootstrapping, bootstrapError, lang } = useContent();

  const page = getPage(pageType);
  const translation = useMemo(() => pickTranslation(page, lang), [lang, page]);
  const blocks = useMemo(
    () => getBlocksFromTranslation(translation),
    [translation],
  );

  return {
    page,
    translation,
    blocks,
    loading: isBootstrapping,
    error: bootstrapError,
    getBlocks: (type) => filterBlocks(blocks, type),
    getText: decodeText,
    renderHtml,
  };
}
