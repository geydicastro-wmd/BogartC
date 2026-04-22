import { useMemo } from "react";
import { useContent } from "../context/content-context";
import {
  decodeText,
  filterBlocks,
  getBlocksFromHtml,
  getBlocksFromTranslation,
  pickTranslation,
} from "../utils/content";

export function useCmsGameOfWeek() {
  const { gameOfWeek, isBootstrapping, bootstrapError, lang } = useContent();

  const item = gameOfWeek;

  const translation = useMemo(
    () => pickTranslation(item, lang),
    [item, lang]
  );

  const blocks = useMemo(
    () => {
      const translatedBlocks = getBlocksFromTranslation(translation);

      if (translatedBlocks.length) {
        return translatedBlocks;
      }

      return getBlocksFromHtml(item?.content);
    },
    [item?.content, translation]
  );

  const getText = decodeText;

  return {
    item,
    translation,
    blocks,
    loading: isBootstrapping,
    error: bootstrapError,
    getBlocks: (type) => filterBlocks(blocks, type),
    getText,
  };
}

export default useCmsGameOfWeek;
