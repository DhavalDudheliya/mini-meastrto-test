import React from "react";

const page = ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;

  return (
    <>
      {locale === "en" ? (
        <div className="container-full bg-[var(--light-gray)]">
          <div className="container mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">
              TERMS AND CONDITIONS FOR MINI MAESTRO
            </h1>
            <p className="mb-4">
              These terms and conditions apply to all purchases and use of
              services on Mini Maestro's website.
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. GENERAL</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                These terms apply between Mini Maestro and you as a user of the
                website or as a customer when you purchase our products or
                services.
              </li>
              <li>
                By using our website or purchasing our products, you accept
                these terms and confirm that you have read our privacy policy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              2. CONTRACT AND ORDER
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                A contract is formed between you and Mini Maestro when you place
                an order on our website and we confirm this via email.
              </li>
              <li>
                Mini Maestro reserves the right to cancel orders if
                inaccuracies, such as pricing errors, occur on the website.
              </li>
              <li>
                Digital content or services that have started after consent
                cannot be canceled once the delivery of the content has begun.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              3. PRICES AND PAYMENT
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                All prices on our website are stated in SEK, including VAT.
              </li>
              <li>
                Payment is made through the payment methods specified at
                checkout. In the event of non-payment, Mini Maestro has the
                right to cancel your order.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">4. DELIVERY</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Delivery times are specified on our website. Please note that
                delivery times may vary depending on the product and
                destination.
              </li>
              <li>Delivery costs are specified at the time of order.</li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              5. RIGHT OF WITHDRAWAL
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                You have the right to withdraw your purchase within 14 days from
                the date you receive the product, according to the Distance
                Contracts Act and agreements outside business premises.
              </li>
              <li>
                The right of withdrawal only applies to physical products and
                not to digital content or services that have started after
                consent, such as personalized photo books and personalized wall
                art.
              </li>
              <li>
                To exercise your right of withdrawal, please contact us at{" "}
                <a
                  href="mailto:info@mini-maestro.com"
                  className="text-blue-600 underline">
                  info@mini-maestro.com
                </a>
                .
              </li>
              <li>
                In the case of a withdrawn order, we will refund the full
                amount, excluding any shipping costs, once we have received the
                item and verified its condition.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">6. RETURNS</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                If you invoke the right of withdrawal, you must return the
                product in the same condition as you received it. You are
                responsible for return shipping.
              </li>
              <li>
                In the case of a complaint, we will cover the return shipping
                and rectify the error through repair, replacement, or refund.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              7. COMPLAINTS AND WARRANTY
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                We apply the Consumer Purchase Act for complaints. Contact us if
                you discover any defects in your item.
              </li>
              <li>
                The warranty period is specified in the product description if
                applicable. In the event of an approved complaint, we will cover
                return shipping.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">8. LIABILITY</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro is not liable for indirect damages or losses
                arising from the use of our products or services, except where
                legislation explicitly provides otherwise.
              </li>
              <li>
                We cannot guarantee that our website is free from technical
                errors, and we are not liable for damages caused by such issues
                unless they result from our negligence.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">9. PERSONAL DATA</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                When you shop on our website, we process your personal data in
                accordance with our privacy policy.
              </li>
              <li>
                You have the right to access, correct, or delete your personal
                data in accordance with the General Data Protection Regulation
                (GDPR).
              </li>
              <li>
                In the event of a data breach or other security violation
                affecting your personal data, we will notify you without undue
                delay.
              </li>
              <li>
                For more information on how we process your personal data,
                please see our privacy policy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">10. FORCE MAJEURE</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro is not liable for delays or failure to fulfill our
                obligations if this is due to events beyond our reasonable
                control, such as natural disasters, pandemics, or government
                actions.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              11. CHANGES TO TERMS
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro reserves the right to change these terms at any
                time. Changes take effect when they are published on our
                website.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              12. DISPUTES AND APPLICABLE LAW
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                In the event of any disputes, Swedish law applies, and we
                primarily refer to the National Board for Consumer Disputes
                (ARN).
              </li>
              <li>
                You also have the option to use the EU dispute resolution
                platform for cross-border disputes.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">13. COOKIES</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Cookies are used on Mini Maestro's website to improve user
                experience and analyze traffic. By using the website, you agree
                to our use of cookies in accordance with our cookie policy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              14. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                All intellectual property rights on our website, including
                design, text, and images, belong to Mini Maestro or our
                licensors.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              15. PRODUCT INFORMATION
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                We strive to provide the most accurate product information
                possible. If a product is out of stock, we reserve the right to
                cancel the order and refund the amount.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              16. CUSTOMER RESPONSIBILITY
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                You as a customer are responsible for having access to correct
                and up-to-date contact information and for reading these terms
                carefully before making a purchase.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              17. CONTACT INFORMATION
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                For questions or comments regarding these terms, please contact
                us at{" "}
                <a
                  href="mailto:info@mini-maestro.com"
                  className="text-blue-600 underline">
                  info@mini-maestro.com
                </a>
                .
              </li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="container-full bg-[var(--light-gray)]">
          <div className="container mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">
              ALLMÄNNA VILLKOR FÖR MINI MAESTRO
            </h1>
            <p className="mb-4">
              Dessa allmänna villkor gäller för alla köp och användning av
              tjänster på Mini Maestros webbplats.
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. ALLMÄNT</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Dessa villkor gäller mellan Mini Maestro och dig som användare
                av webbplatsen eller som kund när du köper våra produkter eller
                tjänster.
              </li>
              <li>
                Genom att använda vår webbplats eller köpa våra produkter
                accepterar du dessa villkor och bekräftar att du har tagit del
                av vår integritetspolicy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              2. AVTAL OCH BESTÄLLNING
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Ett avtal ingås mellan dig och Mini Maestro när du genomför en
                beställning på vår webbplats och vi bekräftar detta via e-post.
              </li>
              <li>
                Mini Maestro förbehåller sig rätten att annullera beställningar
                om felaktigheter, såsom prisfel, har uppstått på webbplatsen.
              </li>
              <li>
                Digitalt innehåll eller tjänster som har påbörjats efter
                samtycke kan inte ångras efter att leveransen av innehållet har
                startat.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              3. PRISER OCH BETALNING
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Samtliga priser på vår webbplats anges i SEK inklusive moms.
              </li>
              <li>
                Betalning sker genom de betalningsmetoder som anges vid kassan.
                Vid utebliven betalning har Mini Maestro rätt att annullera din
                beställning.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">4. LEVERANS</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Leveranstider anges på vår webbplats. Observera att
                leveranstider kan variera beroende på produkt och destination.
              </li>
              <li>
                Leveranskostnader specificeras i samband med beställningen.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">5. ÅNGERRÄTT</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Du har rätt att ångra ditt köp inom 14 dagar från det datum då
                du mottar produkten enligt lagen om distansavtal och avtal
                utanför affärslokaler.
              </li>
              <li>
                Ångerrätten gäller endast för fysiska produkter och inte
                digitalt innehåll eller tjänster som påbörjats efter samtycke
                som personlig fotobok och personlig tavla.
              </li>
              <li>
                För att utöva din ångerrätt, vänligen kontakta oss på{" "}
                <a
                  href="mailto:info@mini-maestro.com"
                  className="text-blue-600 underline">
                  info@mini-maestro.com
                </a>
                .
              </li>
              <li>
                Vid en ångrad beställning återbetalar vi hela beloppet,
                exklusive eventuella fraktkostnader, när vi mottagit varan och
                verifierat dess skick.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">6. RETURER</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Vid åberopande av ångerrätten ska du returnera produkten i samma
                skick som du mottagit den. Du står för returfrakten.
              </li>
              <li>
                Vid reklamation står vi för returfrakten och åtgärdar felet
                genom reparation, byte eller återbetalning.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              7. REKLAMATIONER OCH GARANTI
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Vi tillämpar konsumentköplagen vid reklamationer. Kontakta oss
                om du upptäcker fel i din vara.
              </li>
              <li>
                Garantitid specificeras vid produktbeskrivning om tillämpligt.
                Vid en godkänd reklamation står vi för returfrakten.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">8. ANSVAR</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro ansvarar inte för indirekta skador eller förluster
                som uppstår på grund av användning av våra produkter eller
                tjänster, förutom där lagstiftning uttryckligen föreskriver
                annat.
              </li>
              <li>
                Vi kan inte garantera att vår webbplats är fri från tekniska
                fel, och vi ansvarar inte för skador som orsakats av sådana
                problem om de inte beror på vårdslöshet från vår sida.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">9. PERSONUPPGIFTER</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                När du handlar på vår webbplats behandlar vi dina
                personuppgifter i enlighet med vår integritetspolicy.
              </li>
              <li>
                Du har rätt att få tillgång till, rätta eller radera dina
                personuppgifter enligt dataskyddsförordningen (GDPR).
              </li>
              <li>
                Vid dataintrång eller annan säkerhetsöverträdelse som påverkar
                dina personuppgifter, kommer vi att meddela dig utan onödigt
                dröjsmål.
              </li>
              <li>
                För mer information om hur vi behandlar dina personuppgifter, se
                vår integritetspolicy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">10. FORCE MAJEURE</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro ansvarar inte för förseningar eller bristande
                fullgörelse av våra förpliktelser om detta beror på händelser
                utanför vår rimliga kontroll, såsom naturkatastrofer, pandemier
                eller myndighetsåtgärder.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              11. ÄNDRINGAR AV VILLKOR
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Mini Maestro förbehåller sig rätten att när som helst ändra
                dessa villkor. Ändringar träder i kraft när de publiceras på vår
                webbplats.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              12. TVISTER OCH TILLÄMPLIG LAG
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Vid eventuella tvister tillämpar vi svensk lag, och vi hänvisar
                i första hand till Allmänna reklamationsnämnden (ARN).
              </li>
              <li>
                Du har också möjlighet att använda EU tvistlösningsplattform för
                gränsöverskridande tvister.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">13. COOKIES</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                På Mini Maestros webbplats används cookies för att förbättra
                användarupplevelsen och analysera trafiken. Genom att använda
                webbplatsen godkänner du vår användning av cookies i enlighet
                med vår cookiepolicy.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              14. IMMATERIELLA RÄTTIGHETER
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Alla immateriella rättigheter på vår webbplats, inklusive
                design, text och bilder, tillhör Mini Maestro eller våra
                licensgivare.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              15. PRODUKTINFORMATION
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Vi strävar efter att ge så korrekt produktinformation som
                möjligt. Om en produkt är slut i lager förbehåller vi oss rätten
                att annullera beställningen och återbetala beloppet.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">16. KUNDENS ANSVAR</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Du som kund ansvarar för att ha tillgång till korrekt och
                uppdaterad kontaktinformation och att läsa dessa villkor
                noggrant innan du genomför köp.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">
              17. KONTAKTINFORMATION
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                För frågor eller kommentarer kring dessa villkor, vänligen
                kontakta oss på{" "}
                <a
                  href="mailto:info@mini-maestro.com"
                  className="text-blue-600 underline">
                  info@mini-maestro.com
                </a>
                .
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
