import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Button from "@/components/ui/Button";
import FlipBookViewDialog from "./FlipBookViewDialog";
import { useTranslations } from "next-intl";

type SliderViewDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  attachments: string[];
};

const SliderViewDialog = ({ isOpen, onClose, attachments }: SliderViewDialogProps) => {

  const t = useTranslations();

  const [openPdf, setOpenPdf] = useState<{ open: boolean; url: string }>({ open: false, url: "" });

  const handleCloseOpenPdf = () => {
    setOpenPdf({ open: false, url: "" });
  }

  const handleOpenPdf = (url: string) => {
    setOpenPdf({ open: true, url });
  }

  const handleDownloadPdf = (url: string) => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${url}`, "_blank");
  }

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile(); // Initial check on component mount
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;
  return (
    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-[#00000040] p-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full  max-w-[600px] h-full 2xl:max-w-[690px] rounded-md sm:rounded-xl 2xl:rounded-[30px]">
          <div className="relative h-full p-3 bg-white border-2 border-[var(--light-gray-200)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-6">
            <Image
              src="/images/dialog_close.svg"
              alt="dialog-close"
              width={36}
              height={36}
              className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 absolute top-4 right-4 cursor-pointer z-10 2xl:top-[45px] 2xl:right-[45px]"
              onClick={onClose} // Close the dialog when the close button is clicked
            />
            <div className="h-full">
              <div className="h-5/6">
                <Swiper
                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  className="h-[92%]"
                >
                  {attachments.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="h-full rounded-md sm:rounded-xl 2xl:rounded-[30px] overflow-hidden">
                        {slide.endsWith(".pdf") ? (
                          <div className=" h-full flex items-center flex-row">
                            <Image
                              src={`/images/pdf-icon.svg`}
                              alt={`product-${index}`}
                              width={500}
                              height={400}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${slide}`}
                            alt={`product-${index}`}
                            width={600}
                            height={500}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {attachments[currentSlide].endsWith(".pdf") && (
                <>
                  {isMobile ? (
                    <div className="-my-2 flex flex-col items-center justify-center gap-5">
                      <span>{t("use_desktop")}</span>
                      <Button onClick={() => handleDownloadPdf(attachments[currentSlide])}>{t("download_pdf")}</Button>
                    </div>
                  ) : (
                    <>
                      <div className="my-2 flex items-center justify-center gap-5">
                        <Button onClick={() => handleOpenPdf(attachments[currentSlide])}>{t("view_photo_book")}</Button>
                        <Button onClick={() => handleDownloadPdf(attachments[currentSlide])}>{t("download_pdf")}</Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {openPdf.open && <FlipBookViewDialog pdf={openPdf.url} onClose={handleCloseOpenPdf} isOpen={openPdf.open} />}
    </div>
  );
};

export default SliderViewDialog;
