import MainProduct from "@/components/MainProduct/MainProduct";
import React from "react";

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { headers: { "x-language": params.locale } }).then((res) => res.json());

  let slugs: string[] = [];

  posts.data.map((post: { slug: { [key: string]: string } }) => {
    slugs = [...slugs, post.slug[params.locale]];
  });

  return slugs.map((slug) => {
    return { "product-slug": slug };
  });
}

export async function generateMetadata({ params }: { params: { "product-slug": string; locale: string } }) {
  const productSlug = params["product-slug"];

  // Fetch product details using the slug
  let product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/?slug=${productSlug}`, {
    headers: {
      "x-language": params.locale,
    },
  }).then((res) => res.json());

  product = product.data[0];

  return {
    title: `${product.meta_title[params.locale]} | Mini Maestro`,
    description: `${product.meta_description[params.locale]} | Mini Maestro` || "Discover amazing products at Mini Maestro!",
    openGraph: {
      title: `${product.meta_title[params.locale]} | Mini Maestro`,
      description: `${product.meta_description[params.locale]} | Mini Maestro` || "Discover amazing products at Mini Maestro!",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${product.main_image}`, // Replace with a default image if not provided
          width: 1200,
          height: 630,
          alt: `${product.meta_title[params.locale]} | Mini Maestro`,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/product/${productSlug}`,
      type: "website",
    },
  };
}

const page = async ({ params }: { params: { "product-slug": string } }) => {
  const productSlug = params["product-slug"];

  return <MainProduct slug={productSlug} />;
};

export default page;
