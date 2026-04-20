import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "./common/loading";
import Breadcrumbs from "./common/Breadcrumbs";
import InternalHeader from "./InternalHeader";
import useTermsContent from "../content/hooks/useTermsContent";
import { decodeHtml } from "../content/utils/content";

export default function TermsDetailPage({
  type,
  fallbackTitle,
  logLabel: _logLabel,
  fixBareListItems = false,
}) {
  const { terms, translation, loading, error } = useTermsContent(type);

  const blocks = useMemo(() => {
    const description = translation?.description ?? terms?.description ?? [];
    return Array.isArray(description) ? description : [];
  }, [terms, translation]);

  const title = useMemo(() => {
    const h2Block = blocks.find((block) => block.type === "h2");
    const h1Block = blocks.find((block) => block.type === "h1");
    return decodeHtml(h2Block?.content || h1Block?.content || fallbackTitle);
  }, [blocks, fallbackTitle]);

  const htmlContent = useMemo(() => {
    const contentBlocks = blocks.filter(
      (block) => !["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.type),
    );

    let html =
      contentBlocks.map((block) => block.content || "").join("") ||
      (typeof translation?.description === "string"
        ? translation.description
        : typeof terms?.description === "string"
          ? terms.description
          : "");

    html = html.replace(/<br\s*\/?>/gi, "");

    if (fixBareListItems) {
      const hasLi = /<li>/i.test(html);
      const hasOlOrUl = /<(ol|ul)>/i.test(html);

      if (hasLi && !hasOlOrUl) {
        html = `<ol>${html}</ol>`;
      }
    }

    return html;
  }, [blocks, fixBareListItems, terms, translation]);

  if (loading) return <Loading />;
  if (error) return <div className="text-center py-5">Error: {error}</div>;
  if (!terms) return <div className="text-center py-5">No terms found</div>;

  return (
    <Container fluid className="p-0">
      <Helmet>
        <title>{translation?.title || terms.title || fallbackTitle}</title>
      </Helmet>

      <InternalHeader title={title} />

      <div className="container mt-5">
        <Breadcrumbs />
      </div>

      <Container className="p-0">
        <div
          className="p-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </Container>
    </Container>
  );
}
