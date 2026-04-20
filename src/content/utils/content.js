export const CMS_BRAND_ID = 3;
export const CMS_BRAND_NAME = "BogartCasino";

export function pickTranslatedItem(items = [], lang = "en") {
  return (
    items.find((item) =>
      item.translations?.some((translation) => translation.language === lang),
    ) ||
    items[0] ||
    null
  );
}

export function pickTranslation(item, lang = "en") {
  if (!item?.translations?.length) {
    return null;
  }

  return (
    item.translations.find((translation) => translation.language === lang) ||
    item.translations.find((translation) => translation.language === "en") ||
    item.translations[0] ||
    null
  );
}

export function getPageTypeKey(item) {
  return item?.page_type || item?.pageType || item?.type || null;
}

export function indexPagesByType(items = [], lang = "en") {
  const groupedItems = items.reduce((acc, item) => {
    const key = getPageTypeKey(item);

    if (!key) {
      return acc;
    }

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});

  return Object.entries(groupedItems).reduce((acc, [key, pageItems]) => {
    acc[key] = pickTranslatedItem(pageItems, lang);
    return acc;
  }, {});
}

export function getBlocksFromTranslation(translation) {
  return Array.isArray(translation?.content) ? translation.content : [];
}

export function filterBlocks(blocks = [], type) {
  return blocks.filter((block) => block.type === type);
}

export function decodeHtml(html) {
  if (!html || typeof document === "undefined") {
    return html || "";
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

export function decodeText(html) {
  if (!html || typeof document === "undefined") {
    return html || "";
  }

  const container = document.createElement("div");
  container.innerHTML = html;
  return container.textContent || container.innerText || "";
}

export function renderHtml(html) {
  return {
    __html: decodeHtml(html || ""),
  };
}
