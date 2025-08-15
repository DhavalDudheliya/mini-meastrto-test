import Head from "next/head";

// Types for SEO image formats
export type SeoImageFormat = {
  url: string;
  width: number;
  height: number;
};

// Types for the SEO image object
export type SeoImage = {
  formats?: {
    large?: SeoImageFormat;
    medium?: SeoImageFormat;
    small?: SeoImageFormat;
    thumbnail?: SeoImageFormat;
  };
  url?: string;
  width?: number;
  height?: number;
};

// Types for the SEO prop
export type SeoProps = {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    metaRobots?: string;
    structuredData?: string | null;
    metaViewport?: string;
    canonicalURL?: string;
    metaImage?: SeoImage;
    openGraph?: {
      ogTitle?: string;
      ogDescription?: string;
      ogUrl?: string;
      ogType?: string;
    };
  };
};

const Seo = ({ seo }: SeoProps) => {
  const image =
    seo?.metaImage?.formats?.large?.url || seo?.metaImage?.formats?.medium?.url || seo?.metaImage?.formats?.small?.url || seo?.metaImage?.url || "";

  // Open Graph values with fallback
  const ogTitle = seo?.openGraph?.ogTitle || seo?.metaTitle || "";
  const ogDescription = seo?.openGraph?.ogDescription || seo?.metaDescription || "";
  const ogUrl = seo?.openGraph?.ogUrl || seo?.canonicalURL || "";
  const ogType = seo?.openGraph?.ogType || "website";

  return (
    <Head>
      {seo?.metaTitle ? <title>{seo.metaTitle}</title> : null}
      {seo?.metaDescription ? <meta name="description" content={seo.metaDescription} /> : null}
      {seo?.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      {seo?.metaRobots ? <meta name="robots" content={seo.metaRobots} /> : null}
      {seo?.metaViewport ? <meta name="viewport" content={seo.metaViewport} /> : null}
      {seo?.canonicalURL ? <link rel="canonical" href={seo.canonicalURL} /> : null}
      {/* Open Graph tags */}
      {ogTitle ? <meta property="og:title" content={ogTitle} /> : null}
      {ogDescription ? <meta property="og:description" content={ogDescription} /> : null}
      {ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
      {ogType ? <meta property="og:type" content={ogType} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      {/* Twitter tags */}
      {ogTitle ? <meta name="twitter:title" content={ogTitle} /> : null}
      {ogDescription ? <meta name="twitter:description" content={ogDescription} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      {/* Structured Data */}
      {seo?.structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seo.structuredData }} /> : null}
    </Head>
  );
};

export default Seo;
