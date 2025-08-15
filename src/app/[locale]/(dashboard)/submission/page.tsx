"use client";

import React, { useEffect } from "react";
import TimeLineSlider from "../../../../components/Dashboard/Admin/SubmissionDialog/TimeLineSlider";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetSubmissionQuery } from "@/lib/features/submission/submission.api";
import moment from "moment";
import Button from "@/components/ui/Button";
import SubmissionDialog from "@/components/Dashboard/Admin/SubmissionDialog/SubmissionDialog";
import SliderViewDialog from "@/components/Dashboard/Dialog/SliderViewDialog";
import { useTranslations } from "next-intl";
import { useConfirmPrintingMutation } from "@/lib/features/printing/printing.api";
import { CircleCheck } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

const Page = () => {
  const t = useTranslations();

  const router = useRouter();

  const searchParams = useSearchParams();

  const order_id = searchParams.get("order_id");

  const product_id = searchParams.get("product_id");

  const [isReply, setIsReply] = React.useState<boolean>(false);

  const [openAttachments, setOpenAttachments] = React.useState<{ isOpen: boolean; attachments: string[] }>({ isOpen: false, attachments: [] });

  const { role } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!order_id || !product_id) {
      router.push("/dashboard");
    }
  }, [order_id, product_id, router]);

  const { isSuccess, data, isError, refetch } = useGetSubmissionQuery(
    { order_id: order_id || "", product_id: product_id || "" },
    { skip: !order_id || !product_id, refetchOnFocus: false, pollingInterval: 10000, skipPollingIfUnfocused: true }
  );

  const handleCloseReply = () => {
    setIsReply(false);
    refetch();
  };

  const handleOpenAttachments = ({ attachments }: { attachments: string[] }) => {
    setOpenAttachments({ isOpen: true, attachments: attachments });
  };

  const handleCloseAttachments = () => {
    setOpenAttachments({ isOpen: false, attachments: [] });
  };

  const [confirmPrintReq, confirmPrintRes] = useConfirmPrintingMutation();

  const handlePrint = ({
    attachment,
    order_id,
    product_id,
    submission_id,
  }: {
    attachment: string;
    order_id: string;
    product_id: string;
    submission_id: string;
  }) => {
    confirmPrintReq({
      attachment: attachment,
      order_id: order_id,
      product_id: product_id,
      submission_id: submission_id,
    });
  };

  useEffect(() => {
    if (!confirmPrintRes.isLoading && confirmPrintRes.isSuccess && confirmPrintRes.data.status === 1) {
      toast.success("Marked as final");
      refetch();
    }

    if (!confirmPrintRes.isLoading && confirmPrintRes.isError && confirmPrintRes.data?.status === 0) {
      toast.error("Failed to send for printing");
    }
  }, [confirmPrintRes]);

  return (
    <>
      <div className="h-full overflow-hidden">
        <div className="h-full overflow-hidden p-2 lg:p-5 xl:p-6 2xl:p-7 rounded-[10px] border-2 border-[--light-gray-200] border-dashed">
          <div className="w-full h-[calc(100%_-42px)] overflow-hidden overflow-y-auto pr-1">
            {isSuccess && data && data.data.submission.length > 0 ? (
              <>
                {data.data.submission.map((submission, submissionIndex) => (
                  <>
                    <div className="w-[calc(100%_-_26px)] md:w-full flex items-stretch">
                      <div className="flex flex-col items-center">
                        <div className="w-[15px] h-[15px] md:w-[26px] md:h-[26px] bg-[var(--pink-300)] flex justify-center items-center rounded-full">
                          <div className="w-[7px] h-[7px] md:w-[14px] md:h-[14px] bg-[var(--pink-100)] rounded-full"></div>
                        </div>
                        <div className="relative w-[2px] bg-black h-[calc(100%_-_26px)]"></div>
                      </div>
                      <div className="w-full">
                        <div className="flex flex-wrap w-full pb-[30px]">
                          <div className="w-full md:w-[250px]">
                            <div className="w-full pr-0 pl-2 md:pr-5 flex flex-col gap-1">
                              <p className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                                {t("date")}: {moment(submission.createdAt).format("DD MMM YYYY")}
                              </p>
                              {submission.file_key.length > 0 && (
                                <>
                                  <TimeLineSlider openAttachments={handleOpenAttachments} attachments={submission.file_key} />
                                  {!data.data.printing && role === "admin" && (
                                    <Button
                                      isLoading={confirmPrintRes.isLoading}
                                      onClick={() =>
                                        handlePrint({
                                          attachment: submission.file_key[0],
                                          order_id: submission.order_id,
                                          product_id: submission.product_id,
                                          submission_id: submission._id,
                                        })
                                      }
                                    >
                                      {t("mark_as_final")}
                                    </Button>
                                  )}

                                  {submission.is_finalized && (
                                    <Button className="bg-green-100 text-lg rounded-lg font-bold">{t("finalized_print")}</Button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="w-full md:w-[calc(100%_-_250px)]">
                            <div className="w-full h-full pb-3">
                              <div className="flex h-full flex-col p-2 lg:p-5 rounded-lg lg:rounded-xl border-2 border-[var(--gray)]">
                                <h4 className="text-[var(--dark-gray)]">{submission.from_admin ? "admin" : ""}</h4>
                                <p className="whitespace-pre-wrap text-[14px] lg:text-[16px] xl:text-[18px]">{submission.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {data.data.printing ? (
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-1 font-bold text-[var(--pink-500)]">
                        <CircleCheck />
                        {t("completed")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setIsReply(true)} className="flex cursor-pointer items-center gap-1 font-bold text-[var(--pink-500)]">
                        <Image alt="reply-icon" src="/images/reply_icon.svg" width={27} height={27} />
                        {t("add_reply")}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Button onClick={() => setIsReply(true)}>{t("submit_design")}</Button>
            )}
          </div>
        </div>
      </div>

      {/* Submission Dialog */}
      {isReply && <SubmissionDialog order_id={order_id || ""} product_id={product_id || ""} isOpen={isReply} onClose={handleCloseReply} />}

      {/* slider view Dialog */}
      {openAttachments && (
        <SliderViewDialog attachments={openAttachments.attachments} isOpen={openAttachments.isOpen} onClose={handleCloseAttachments} />
      )}
    </>
  );
};

export default Page;
