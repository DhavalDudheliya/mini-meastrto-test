import React, { useCallback, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import { pdfjs } from "react-pdf";
import Loader from "@/components/ui/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type FlipBookViewDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  pdf: string;
};

// const FlipBookData = [
//   { img: "/images/product_1.png" },
//   { img: "/images/product_2.png" },
//   { img: "/images/product_3.png" },
//   { img: "/images/product_4.png" },
// ];

const Page = React.forwardRef<HTMLDivElement, { src: string }>(({ src }, ref) => {
  return (
    <div className="page" ref={ref} style={{ width: "550px", height: "733px" }}>
      <div className="page-content" style={{ width: "100%", height: "100%" }}>
        <Image
          src={src}
          alt="flipbook-page"
          layout="fill"
          objectFit="cover" // Ensures the image covers the container
        />
      </div>
    </div>
  );
});

Page.displayName = "Page"; // Add displayName for debugging

const FlipBookViewDialog = ({ isOpen, onClose, pdf }: FlipBookViewDialogProps) => {
  const [pdfImages, setPdfImages] = React.useState<string[]>([]);

  const [convertingPdf, setConvertingPdf] = React.useState(true);

  const processAttachments = useCallback(async () => {
    try {
      const pdfDocument = await pdfjs.getDocument(`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${pdf}`).promise;

      // Create an array of promises to process all pages concurrently
      const renderPromises = Array.from({ length: pdfDocument.numPages }, async (_, index) => {
        const pageNumber = index + 1;
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });

        // Create a new canvas for each page
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;

        // Set canvas dimensions based on page viewport
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        // Render the page on the canvas
        await page.render(renderContext).promise;

        // Convert the canvas to a data URL (image) and return it
        const dataUrl = canvas.toDataURL("image/png");

        canvas.remove(); // Clean up the canvas element

        return dataUrl;
      });

      // Wait for all pages to be rendered and images created
      const renderedImages = await Promise.all(renderPromises);
      setPdfImages(renderedImages); // Update state with all images at once
      setConvertingPdf(false);
    } catch (error) {
      console.error("Error processing PDF attachments:", error);
      setConvertingPdf(false);
    }
  }, [pdf]);

  useEffect(() => {
    processAttachments();
  }, [processAttachments]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-[#00000040] p-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full max-w-[900px] h-auto  rounded-md sm:rounded-xl 2xl:rounded-[30px]">
          <div className="relative h-full p-3 bg-white border-2 border-[var(--light-gray-200)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-6">
            <Image
              src="/images/dialog_close.svg"
              alt="dialog-close"
              width={36}
              height={36}
              className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 absolute top-4 right-4 cursor-pointer z-10 2xl:top-[45px] 2xl:right-[45px]"
              onClick={onClose}
            />
            {convertingPdf ? (
               <div className="flex items-center justify-center h-[733px] w-full">
              <Loader width="50" />
              </div>
            ) : (
              <div className="flex shadow-xl justify-center items-center mt-4">
                <HTMLFlipBook
                  width={550}
                  height={733}
                  size="stretch"
                  minWidth={290}
                  maxWidth={1000}
                  minHeight={400}
                  maxHeight={1533}
                  maxShadowOpacity={1}
                  showCover={true}
                  mobileScrollSupport={true}
                  className=""
                  style={{}}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={1000}
                  usePortrait={false}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={false}
                  useMouseEvents={true}
                  swipeDistance={0}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  <Page src="/images/front.svg" />

                  {pdfImages.map((page, index) => (
                    <Page key={index + 1} src={page} />
                  ))}

                  <Page src="/images/back.svg" />
                </HTMLFlipBook>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBookViewDialog;
