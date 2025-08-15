"use client"
import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const TimeLineSlider = ({
  attachments,
  openAttachments,
}: {
  attachments: string[];
  openAttachments: ({ attachments }: { attachments: string[] }) => void;
}) => {
  return (
    <div onClick={() => openAttachments({ attachments })}>
      <Swiper spaceBetween={10} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
        {attachments.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative pb-[112%] mb-[35px] rounded-md sm:rounded-xl 2xl:rounded-[15px] overflow-hidden">
              {slide.endsWith(".pdf") ? (
                <Image
                  src={`/images/pdf-icon.svg`}
                  alt={`product-${index}`}
                  width={600}
                  height={400}
                  className="w-full h-full absolute top-0 left-0 object-cover"
                />
              ) : (
                <>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${slide}`}
                    alt={`product-${index}`}
                    width={600}
                    height={400}
                    className="w-full h-full absolute top-0 left-0 object-cover"
                  />
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TimeLineSlider;
