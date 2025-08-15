import React from "react";

const page = ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {locale === "en" ? (
            <>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Return Policy for Mini Maestro</h1>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Return Policy</h2>
                <p className="text-gray-700 mb-6">
                  At Mini Maestro, we want you to feel confident and satisfied with your purchase. Here you’ll find information about your right to
                  cancel, how to make a return, and what applies to complaints.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Right to Cancel</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>
                    You have the right to cancel your purchase within 14 days from the date you receive the product, in accordance with the Consumer
                    Contracts Regulations.
                  </li>
                  <li>
                    The right to cancel applies only to physical products and not to personalized photo books, prints, or other services initiated
                    with your consent.
                  </li>
                  <li>To exercise your right to cancel, contact us via email at info@mini-maestro.com.</li>
                  <li>
                    If you cancel your order, we will refund the full amount, excluding any shipping costs, once we receive and verify the condition
                    of the item.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Returns</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>
                    When exercising your right to cancel, the product must be returned in the same condition as you received it. You, as the customer,
                    are responsible for the return shipping costs.
                  </li>
                  <li>
                    In the case of an approved complaint, we will cover the return shipping costs and address the issue through repair, replacement,
                    or refund.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Complaints and Warranty</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>
                    We follow consumer protection laws regarding complaints. If you discover a defect in your product, please contact us as soon as
                    possible.
                  </li>
                  <li>
                    The warranty period is specified in the respective product description, if applicable. In the case of an approved complaint, we
                    will cover the return shipping costs.
                  </li>
                </ul>
              </section>
              <p className="text-gray-700">
                For questions or assistance with your return or complaint, do not hesitate to contact us at{" "}
                <a href="mailto:info@mini-maestro.com" className="text-blue-500 underline">
                  info@mini-maestro.com
                </a>
                . We are here to help!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Returpolicy för Mini Maestro</h1>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Returpolicy</h2>
                <p className="text-gray-700 mb-6">
                  Vi på Mini Maestro vill att du ska känna dig trygg och nöjd med ditt köp. Här hittar du information om din ångerrätt, hur du gör en
                  retur, samt vad som gäller vid reklamationer.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Ångerrätt</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>
                    Du har rätt att ångra ditt köp inom 14 dagar från det datum då du mottagit produkten, i enlighet med lagen om distansavtal och
                    avtal utanför affärslokaler.
                  </li>
                  <li>
                    Ångerrätten gäller endast för fysiska produkter och inte för personliga fotoböcker, tavlor eller andra tjänster som påbörjats
                    efter ditt samtycke.
                  </li>
                  <li>För att utöva din ångerrätt, kontakta oss via e-post på info@mini-maestro.com.</li>
                  <li>
                    Vid en ångrad beställning återbetalar vi hela beloppet, exklusive eventuella fraktkostnader, när vi mottagit varan och verifierat
                    dess skick.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Returer</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>
                    Vid åberopande av ångerrätten ska produkten returneras i samma skick som du mottagit den. Du som kund står för returfrakten.
                  </li>
                  <li>Vid en godkänd reklamation står vi för returfrakten och åtgärdar felet genom reparation, byte eller återbetalning.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Reklamationer och garanti</h2>
                <ul className="list-decimal list-inside text-gray-700 mb-6">
                  <li>Vi följer konsumentköplagen vid reklamationer. Om du upptäcker ett fel i din vara, kontakta oss så snart som möjligt.</li>
                  <li>Garantitiden anges vid respektive produktbeskrivning, om tillämpligt. Vid en godkänd reklamation står vi för returfrakten.</li>
                </ul>
              </section>
              <p className="text-gray-700">
                För frågor eller hjälp med din retur eller reklamation, tveka inte att höra av dig till oss på{" "}
                <a href="mailto:info@mini-maestro.com" className="text-blue-500 underline">
                  info@mini-maestro.com
                </a>
                . Vi finns här för att hjälpa dig!
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
