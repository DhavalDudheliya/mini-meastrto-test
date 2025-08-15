"use client";
import Button from "@/components/ui/Button";
import { useCreateSubmissionMutation } from "@/lib/features/submission/submission.api";
import { useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";

type SubmissionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  order_id: string;
  product_id: string;
};

const SendPrintDialog = ({ isOpen, onClose, order_id, product_id }: SubmissionDialogProps) => {
  const t = useTranslations();

  const [dragging, setDragging] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<{ src: string; type: string; file: File }[]>([]);

  const [message, setMessage] = useState<string>("");

  const [submissionReq, submissionRes] = useCreateSubmissionMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { role } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (submissionRes.isSuccess) {
      toast.success("Submission added successfully");
      onClose();
      setIsSubmitting(false);
    }
  }, [submissionRes]);

  if (!isOpen) return null; // Return null if dialog is not open

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);

    files.forEach((file) => {
      setUploadedImages((prev) => {
        return [...prev, { src: URL.createObjectURL(file), type: file.type.startsWith("image/") ? "image" : "pdf", file }];
      });
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    files.forEach((file) => {
      setUploadedImages((prev) => {
        return [...prev, { src: URL.createObjectURL(file), type: file.type.startsWith("image/") ? "image" : "pdf", file }];
      });
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    submissionReq({ order_id: order_id, product_id: product_id, message, attachments: uploadedImages.map((image) => image.file) });
  };

  return (
    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-[#00000040] p-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-3 w-full max-w-[600px] h-auto 2xl:max-w-[690px] bg-[var(--mid-gray)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-[30px]">
          <div className="relative h-full p-3 bg-white border-2 border-[var(--light-gray-200)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-[30px]">
            <Image
              src="/images/dialog_close.svg"
              alt="dialog-close"
              width={36}
              height={36}
              className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 absolute top-4 right-4 cursor-pointer"
              onClick={onClose} // Close the dialog when the close button is clicked
            />
            <div className="flex h-full flex-col gap-4 lg:gap-5 xl:gap-[30px] justify-between">
              <div className="flex flex-col gap-4 2xl:gap-[24px]">
                <h4 className="text-[var(--pink-500)]">{role === "admin" ? t("add_submission") : t("reply_to_submission")}</h4>
                <div className="flex flex-col gap-2 xl:gap-4">
                  {role === "admin" && (
                    <div>
                      <div>
                        <div className="flex flex-col gap-1 cursor-pointer">
                          <label htmlFor="file-upload" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] cursor-pointer">
                            {t("upload_submission")}
                          </label>
                          <div
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`cursor-pointer relative rounded-[16px] md:rounded-[20px] lg:rounded-[30px] border-2 border-[var(--gray)] ${
                              dragging ? "border-dashed border-[var(--pink-500)]" : ""
                            }`}
                          >
                            <input
                              multiple
                              type="file"
                              id="file-upload"
                              name="file-upload"
                              required
                              onChange={handleFileChange}
                              className="cursor-pointer absolute opacity-0 w-full h-full top-0 left-0 rounded-[16px] md:rounded-[20px] lg:rounded-[30px]"
                            />
                            <div className="flex p-4 2xl:py-[30px] w-full justify-center items-center">
                              <Image
                                src="/images/upload.svg"
                                width={70}
                                height={70}
                                alt="upload-icon"
                                className="cursor-pointer w-[50px] h-[50px] 2xl:h[70px] 2xl:w-[70px]"
                              />
                              <div className="cursor-pointer flex flex-col text-center items-center text-[13px] 2xl:text-[18px]">
                                <p>{t("drag_and_drop_your_files_here")}</p>
                                <p>{t("or")}</p>
                                <p>{t("browse_files")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
                              {t("uploaded_files")}
                            </label>
                            <div className="w-full overflow-hidden border-2 border-[var(--gray)] p-[10px] rounded-[10px]">
                              <div className="w-full overflow-hidden overflow-x-auto">
                                <div className="w-full flex flex-nowrap gap-2 pb-[6px]">
                                  {uploadedImages.map((src, index) => (
                                    <div key={index} className="relative flex-shrink-0 rounded-[4px] overflow-hidden w-[75px] h-[75px]">
                                      <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-white rounded-full p-1">
                                        <Image src="/images/close_icon_img.svg" alt="icon-remove" width={15} height={15} />
                                      </button>
                                      {src.type === "pdf" ? (
                                        <Image
                                          src={"/images/pdf-icon.svg"}
                                          alt={`uploaded-image-${index}`}
                                          width={75}
                                          height={75}
                                          className="object-cover"
                                        />
                                      ) : (
                                        <Image src={src.src} alt={`uploaded-image-${index}`} width={75} height={75} className="object-cover" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="message" className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
                        {t("message")}
                      </label>
                      <textarea onChange={(e) => setMessage(e.target.value)} id="message" className="h-[135px] resize-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button isLoading={isSubmitting} onClick={handleSubmit}>
                  {t("submit")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPrintDialog;
