import React from "react";
import WebShopHero from "../../../../components/Webshop/WebShopHero/WebShopHero";
import WebShopProducts from "../../../../components/Webshop/WebShopProducts/WebShopProducts";
import CustomVideoPlayer from '../../../../components/Webshop/WebShopVideo/WebShopVideo';
import WebShopImg from '../../../../components/Webshop/WebShopImg/WebShopImg';

const page = async({ params }: { params: any }) => {
  return (
    <>
      <WebShopHero />
      <WebShopProducts />
      <CustomVideoPlayer />
      <WebShopImg locale={params.locale} />
    </>
  );
};

export default page;
