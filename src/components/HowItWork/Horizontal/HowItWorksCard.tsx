import Image from "next/image";
import React from "react";

interface HowItWorksCardProps {
  img: string;
  title: string;
  description: string;
  step: number;
  alt: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ img, title, description, step, alt }) => {
  return (
    <li
      className="flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-6 lg:p-8 flex-1 m-3 max-w-sm relative hover:scale-105 transition-all duration-300"
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] relative mb-5">
        <Image src={img} alt={alt} fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 33vw" itemProp="image" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3" itemProp="name">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-[16px]" itemProp="text">
        {description}
      </p>

      {/* Step Number */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF77C3] text-black font-bold text-lg absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {step}
      </div>
    </li>
  );
};

export default HowItWorksCard;
