import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Testimonial {
  name: string;
  text: string;
  image: string;
  alt: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Josefin Svensson",
    text: "The Photo book turned out amazing! My daughter's drawings look so professional and the quality is outstanding.",
    image: "/images/josefin.jpg",
    alt: "Josefin Svensson",
  },
  {
    name: "Calle B",
    text: "Perfect gift for grandparents! They absolutely loved the canvas print of their grandson’s artwork.",
    image: "/images/calle.jpg",
    alt: "Calle B",
  },
  {
    name: "Evelina L.",
    text: "Fast delivery and excellent customer service. The whole process was so easy and fun.",
    image: "/images/evelina.jpg",
    alt: "Evelina L.",
  },
];

const HappyFamilies = () => {
  const t = useTranslations();

  return (
    <section className="bg-[#5AD6FC1A] rounded-3xl p-6 md:p-10 mx-4 my-8 shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl md:text-6xl font-bold">{t("happy_families")}</h2>
        <p className="mt-2 text-lg">{t("what_parents_are_saying_about_mini_maestro")}</p>
      </div>

      {/* Continuous Scrolling Testimonials */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee space-x-6">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
            <div key={idx} className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[500px] bg-white rounded-2xl shadow-md p-6 flex-shrink-0 m-4">
              {/* Avatar & Name */}
              <div className="flex items-center mb-4">
                <Image src={testimonial.image} alt={testimonial.alt} width={40} height={40} className="rounded-full mr-3 object-cover h-10 w-10" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <div className="flex text-yellow-500 text-sm">{"★★★★★"}</div>
                </div>
              </div>
              {/* Text */}
              <p className="text-gray-700 leading-relaxed">“{testimonial.text}”</p>
            </div>
          ))}
        </div>
        {/* Overlay Effects */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-8 md:w-16 bg-gradient-to-r from-[#eefbfc] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 md:w-16 bg-gradient-to-l from-[#eefbfc] to-transparent" />
      </div>
    </section>
  );
};

export default HappyFamilies;
