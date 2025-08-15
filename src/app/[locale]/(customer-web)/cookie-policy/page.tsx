import React from "react";

const page = ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;

  return (
    <>
      {locale === "en" ? (
        <div className="container-full bg-[var(--light-gray)]">
          <div className="container mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">
              COOKIE POLICY FOR MINI MAESTRO
            </h1>

            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Mini Maestro uses cookies and similar technologies to enhance user
              experience, analyze website traffic, and customize content
              according to users' preferences. This cookie policy explains what
              types of cookies we use, what they do, and how you can manage your
              cookie settings.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              2. What are cookies?
            </h2>
            <p className="mb-4">
              Cookies are small text files stored on your device (computer,
              tablet, mobile) when you visit a website. They are often used to
              help the website function efficiently and to provide a better user
              experience by remembering your preferences.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              3. What types of cookies do we use?
            </h2>
            <p className="mb-4">
              Mini Maestro uses the following types of cookies:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Necessary cookies:</strong> These cookies are essential
                for the website to function properly and cannot be turned off in
                our systems. They are usually set in response to actions you
                have taken, such as setting privacy preferences or logging in.
              </li>
              <li>
                <strong>Performance cookies:</strong> These cookies collect
                information about how visitors use the website, such as which
                pages are most popular. This data is used to optimize the
                functionality of the website.
              </li>
              <li>
                <strong>Functional cookies:</strong> These cookies allow the
                website to offer enhanced functionality and personal settings,
                such as remembering language preferences.
              </li>
              <li>
                <strong>Marketing cookies:</strong> These cookies are used to
                deliver ads that are relevant to you and to measure the
                effectiveness of our marketing. They may also be used to build a
                profile of your interests.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              4. How we use cookies
            </h2>
            <p className="mb-4">We use cookies to:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Ensure that the website functions as expected.</li>
              <li>Remember your settings and login information.</li>
              <li>
                Understand how you use the website so we can improve the
                experience.
              </li>
              <li>Display relevant ads and measure ad effectiveness.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              5. Third-party cookies
            </h2>
            <p className="mb-4">
              We use third-party cookies from trusted partners, such as Google
              Analytics and Facebook Pixel, to collect information about your
              interaction with our website. These cookies are used for analysis
              and marketing. Our third-party partners may combine this
              information with other information they have collected from other
              websites. Read more about these third-party providers' cookie
              policies on their websites.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              6. How to manage cookies
            </h2>
            <p className="mb-4">
              You can change your cookie settings at any time by going to your
              browser settings and blocking or deleting cookies. Please note
              that some parts of the website may not function correctly if you
              block certain types of cookies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              7. Updates to the cookie policy
            </h2>
            <p className="mb-4">
              We may update this cookie policy to reflect any changes in how we
              use cookies or legal requirements. Any changes take effect when
              they are published on our website.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Contact us</h2>
            <p className="mb-4">
              If you have any questions about our cookie policy, please contact
              us at{" "}
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
              COOKIEPOLICY FÖR MINI MAESTRO
            </h1>

            <h2 className="text-2xl font-semibold mb-4">1. Introduktion</h2>
            <p className="mb-4">
              Mini Maestro använder cookies och liknande teknologier för att
              förbättra användarupplevelsen, analysera webbplatsens trafik och
              anpassa innehållet efter användarnas preferenser. Denna
              cookiepolicy förklarar vilka typer av cookies vi använder, vad de
              gör och hur du kan hantera dina cookieinställningar.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Vad är cookies?</h2>
            <p className="mb-4">
              Cookies är små textfiler som lagras på din enhet (dator,
              surfplatta, mobil) när du besöker en webbplats. De används ofta
              för att webbplatsen ska fungera effektivt och för att ge en bättre
              användarupplevelse genom att komma ihåg dina preferenser.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              3. Vilka typer av cookies använder vi?
            </h2>
            <p className="mb-4">
              Mini Maestro använder följande typer av cookies:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Nödvändiga cookies:</strong> Dessa cookies är nödvändiga
                för att webbplatsen ska fungera korrekt och kan inte stängas av
                i våra system. De sätts vanligtvis som svar på åtgärder du
                gjort, som att ställa in sekretessinställningar eller logga in.
              </li>
              <li>
                <strong>Prestandacookies:</strong> Dessa cookies samlar in
                information om hur besökare använder webbplatsen, till exempel
                vilka sidor som är mest populära. Dessa data används för att
                optimera webbplatsens funktionalitet.
              </li>
              <li>
                <strong>Funktionella cookies:</strong> Dessa cookies gör det
                möjligt för webbplatsen att erbjuda förbättrad funktionalitet
                och personliga inställningar, som att komma ihåg
                språkpreferenser.
              </li>
              <li>
                <strong>Marknadsföringscookies:</strong> Dessa cookies används
                för att leverera annonser som är relevanta för dig och för att
                mäta effektiviteten av vår marknadsföring. De kan också användas
                för att bygga upp en profil över dina intressen.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              4. Hur vi använder cookies
            </h2>
            <p className="mb-4">Vi använder cookies för att:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Säkerställa att webbplatsen fungerar som förväntat.</li>
              <li>Komma ihåg dina inställningar och inloggningsinformation.</li>
              <li>
                Förstå hur du använder webbplatsen så att vi kan förbättra
                upplevelsen.
              </li>
              <li>Visa relevanta annonser och mäta annonsers effektivitet.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">
              5. Tredjepartscookies
            </h2>
            <p className="mb-4">
              Vi använder tredjepartscookies från betrodda partners, såsom
              Google Analytics och Facebook-pixel, för att samla in information
              om din interaktion med vår webbplats. Dessa cookies används för
              analys och marknadsföring. Våra tredjepartspartners kan kombinera
              denna information med annan information som de har samlat in från
              andra webbplatser. Läs mer om dessa tredjepartsleverantörers
              cookiepolicyer på deras webbplatser.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              6. Hur du hanterar cookies
            </h2>
            <p className="mb-4">
              Du kan när som helst ändra dina cookieinställningar genom att gå
              till webbläsarens inställningar och blockera eller ta bort
              cookies. Observera att vissa delar av webbplatsen kanske inte
              fungerar korrekt om du blockerar vissa typer av cookies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              7. Uppdateringar av cookiepolicyn
            </h2>
            <p className="mb-4">
              Vi kan komma att uppdatera denna cookiepolicy för att återspegla
              eventuella ändringar i hur vi använder cookies eller av rättsliga
              krav. Eventuella ändringar träder i kraft när de publiceras på vår
              webbplats.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Kontakta oss</h2>
            <p className="mb-4">
              Om du har några frågor om vår cookiepolicy, vänligen kontakta oss
              på{" "}
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
