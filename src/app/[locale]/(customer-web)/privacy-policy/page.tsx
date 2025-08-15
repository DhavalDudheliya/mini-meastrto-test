import React from "react";

const page = ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;
  return (
    <>
      {locale === "en" ? (
        <div className="container-full bg-[var(--light-gray)]">
          <div className="container mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">
              PRIVACY POLICY FOR MINI MAESTRO
            </h1>

            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Your privacy is important to us at Mini Maestro. This privacy
              policy explains how we collect, use, and protect your personal
              data when you visit our website or make a purchase.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              2. What data we collect
            </h2>
            <p className="mb-4">
              We collect the following types of personal data:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Contact information:</strong> such as name, email
                address, phone number, and postal address.
              </li>
              <li>
                <strong>Purchase information:</strong> details about your
                purchases, payment information, and delivery details.
              </li>
              <li>
                <strong>Technical information:</strong> IP address, browser
                type, and device used when visiting our website.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              3. How we use your data
            </h2>
            <p className="mb-4">We use your personal data to:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Process and deliver your orders.</li>
              <li>
                Communicate with you about your order or any customer service
                issues.
              </li>
              <li>Send marketing messages (if you have consented to this).</li>
              <li>Analyze the use of our website to improve our service.</li>
              <li>
                Fulfill legal requirements, such as accounting and tax
                regulations.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              4. Legal basis for processing
            </h2>
            <p className="mb-4">
              We process your personal data based on the following legal
              grounds:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Contract:</strong> To fulfill our obligations under the
                contract if you make a purchase.
              </li>
              <li>
                <strong>Consent:</strong> To send marketing messages if you have
                consented to this.
              </li>
              <li>
                <strong>Legal obligations:</strong> To comply with accounting
                and tax regulations.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">5. Data retention</h2>
            <p className="mb-4">
              We retain your personal data as long as necessary to fulfill the
              purposes for which it was collected, or to comply with legal
              requirements (e.g., accounting rules requiring retention for up to
              7 years).
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Your rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Request access to your personal data.</li>
              <li>Correct inaccurate data.</li>
              <li>Delete your data (under certain conditions).</li>
              <li>Restrict or object to the processing of your data.</li>
              <li>Withdraw your consent to marketing at any time.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">7. Data sharing</h2>
            <p className="mb-4">
              We do not share your personal data with third parties, except when
              necessary to deliver our services (e.g., to delivery companies) or
              to comply with legislation. If we use third-party providers, such
              as for analytics tools, we ensure they meet GDPR requirements.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              8. Cookies and tracking
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to track your use of our
              website and improve the user experience. For more information, see
              our cookie policy.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              9. Changes to the privacy policy
            </h2>
            <p className="mb-4">
              We may update this privacy policy to reflect changes in how we
              process your personal data or due to changes in the law. We will
              notify you of significant changes via email or on our website.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Contact us</h2>
            <p className="mb-4">
              If you have questions or wish to exercise your rights under this
              policy, please contact us at{" "}
              <a
                href="mailto:info@mini-maestro.com"
                className="text-blue-600 underline">
                info@mini-maestro.com
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="container-full bg-[var(--light-gray)]">
          <div className="container mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">
              INTEGRITETSPOLICY FÖR MINI MAESTRO
            </h1>

            <h2 className="text-2xl font-semibold mb-4">1. Introduktion</h2>
            <p className="mb-4">
              Din integritet är viktig för oss på Mini Maestro. Denna
              integritetspolicy förklarar hur vi samlar in, använder och skyddar
              dina personuppgifter när du besöker vår webbplats eller gör ett
              köp.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              2. Vilka uppgifter vi samlar in
            </h2>
            <p className="mb-4">
              Vi samlar in följande typer av personuppgifter:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Kontaktinformation:</strong> såsom namn, e-postadress,
                telefonnummer och postadress.
              </li>
              <li>
                <strong>Köpinformation:</strong> uppgifter om dina köp,
                betalningsinformation och leveransdetaljer.
              </li>
              <li>
                <strong>Teknisk information:</strong> IP-adress, webbläsartyp
                och enhet som används vid besök på vår webbplats.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              3. Hur vi använder dina uppgifter
            </h2>
            <p className="mb-4">Vi använder dina personuppgifter för att:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Bearbeta och leverera dina beställningar.</li>
              <li>
                Kommunicera med dig om din beställning eller eventuella
                kundtjänstärenden.
              </li>
              <li>
                Skicka marknadsföringsmeddelanden (om du har samtyckt till
                detta).
              </li>
              <li>
                Analysera användningen av vår webbplats för att förbättra vår
                tjänst.
              </li>
              <li>
                Uppfylla rättsliga krav, som bokförings- och skatteregler.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              4. Rättslig grund för behandling
            </h2>
            <p className="mb-4">
              Vi behandlar dina personuppgifter baserat på följande rättsliga
              grunder:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Avtal:</strong> För att fullfölja våra förpliktelser
                enligt avtalet om du gör ett köp.
              </li>
              <li>
                <strong>Samtycke:</strong> För att skicka
                marknadsföringsmeddelanden om du har samtyckt till detta.
              </li>
              <li>
                <strong>Rättsliga skyldigheter:</strong> För att uppfylla
                bokförings- och skatteregler.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              5. Lagring av uppgifter
            </h2>
            <p className="mb-4">
              Vi lagrar dina personuppgifter så länge som det är nödvändigt för
              att uppfylla de ändamål för vilka de samlades in, eller för att
              följa lagkrav (t.ex. bokföringsregler som kräver lagring i upp
              till 7 år).
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Dina rättigheter</h2>
            <p className="mb-4">Du har rätt att:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Begära tillgång till dina personuppgifter.</li>
              <li>Rätta felaktiga uppgifter.</li>
              <li>Radera dina uppgifter (under vissa förutsättningar).</li>
              <li>Begränsa eller invända mot behandling av dina uppgifter.</li>
              <li>
                Återkalla ditt samtycke till marknadsföring när som helst.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              7. Delning av uppgifter
            </h2>
            <p className="mb-4">
              Vi delar inte dina personuppgifter med tredje part, förutom när
              det krävs för att leverera våra tjänster (t.ex. till
              leveransföretag) eller för att följa lagstiftning. Om vi använder
              tredjepartsleverantörer, till exempel för analysverktyg,
              säkerställer vi att de uppfyller kraven enligt GDPR.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              8. Cookies och spårning
            </h2>
            <p className="mb-4">
              Vi använder cookies och liknande teknologier för att spåra din
              användning av vår webbplats och förbättra användarupplevelsen. För
              mer information, se vår cookiepolicy.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              9. Ändringar i integritetspolicyn
            </h2>
            <p className="mb-4">
              Vi kan komma att uppdatera denna integritetspolicy för att
              återspegla förändringar i hur vi behandlar dina personuppgifter
              eller på grund av ändringar i lagen. Vi meddelar dig om väsentliga
              ändringar via e-post eller på vår webbplats.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Kontakta oss</h2>
            <p className="mb-4">
              Om du har frågor eller önskar utöva dina rättigheter enligt denna
              policy, vänligen kontakta oss på{" "}
              <a
                href="mailto:info@mini-maestro.com"
                className="text-blue-600 underline">
                info@mini-maestro.com
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
