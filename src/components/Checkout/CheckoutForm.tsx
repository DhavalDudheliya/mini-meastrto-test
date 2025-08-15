import React from "react";

const CheckoutForm = () => {

  return (
    <div>
      <form>
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-[40px]">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            <h5 className="text-[var(--pink-500)]">Contact</h5>
            <div className="flex w-full gap-2 flex-wrap sm:flex-nowrap lg:gap-5">
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="first-name"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  First Name
                </label>
                <input type="text" id="first-name" name="first-name" required />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="last-name"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Last Name
                </label>
                <input type="text" id="last-name" name="last-name" required />
              </div>
            </div>
            <div className="flex w-full gap-2 flex-wrap sm:flex-nowrap lg:gap-5">
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Email
                </label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="contact-number"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="contact-number"
                  name="contact-number"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            <h5 className="text-[var(--pink-500)]">Address</h5>
            <div className="flex w-full gap-2 flex-wrap sm:flex-nowrap lg:gap-5">
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="country"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Country
                </label>
                <input type="text" id="country" name="country" autoComplete="country" required />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label
                  htmlFor="contact-number"
                  className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="contact-number"
                  name="contact-number"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address"
                className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
                Address
              </label>
              <input id="address" autoComplete="street-address" />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address"
                className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
                Billing Address
              </label>
              <input id="address" autoComplete="street-address" />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                <div className="flex flex-col gap-1">
                    <h5 className="text-[var(--pink-500)]">Payment</h5>
                    <p className="text-[14px] lg:text-[16px]">All transactions are secure and encrypted.</p>
                </div>
                <input type="text" placeholder="Debit Card"  className="w-full" />
                <input type="text" placeholder="Credit Card" className="w-full"  />
            </div>
          </div>
          <div className="w-full">
            <p className="btn-pill pink">Pay Now</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
