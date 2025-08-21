"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQCategory = {
  title: {
    en: string;
    sv: string;
  };
  bgColor: string;
  items: {
    en: FAQItem[];
    sv: FAQItem[];
  };
};

const parseAndRenderText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g); // Split text by `**`
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong className="text-black font-extrabold shadow-sm" key={index}>
        {part.slice(2, -2)}
      </strong> // Remove `**` and wrap in <strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

type Locale = "en" | "sv";

const FAQPage = ({ params }: { params: { locale: Locale } }) => {
  const locale: Locale = params.locale;

  // State
  const [openCategory, setOpenCategory] = useState<number[]>([]);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only rendering (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
    // Open all categories by default AFTER mount
    setOpenCategory(faqData.map((_, idx) => idx));
  }, []);

  if (!mounted) {
    // --- Skeleton while hydrating ---
    return (
      <main className="max-w-5xl mx-auto px-4 py-10 mt-[60px] md:mt-[80px] animate-pulse">
        <h1 className="text-3xl font-bold text-center mb-8">FAQ</h1>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl p-4 mb-4 shadow bg-gray-200 h-[120px]" />
        ))}
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 mt-[60px] md:mt-[80px]">
      <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold text-center mb-8">FAQ</h1>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.flatMap((cat) =>
              cat.items[locale].map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: typeof q.answer === "string" ? q.answer : (q.answer as any)?.props?.children || "",
                },
              }))
            ),
          }),
        }}
      />

      {faqData.map((cat, catIndex) => (
        <div
          key={cat.title[locale]}
          className={`rounded-xl p-4 mb-4 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 ${cat.bgColor} border border-neutral-200`}
        >
          {/* Category Accordion */}
          <div
            className="flex justify-between items-center"
            onClick={() => {
              setOpenCategory((prev) => (prev.includes(catIndex) ? prev.filter((idx) => idx !== catIndex) : [...prev, catIndex]));
            }}
          >
            <h2 className="font-bold lg:text-[32px] md:text-[28px] text-[24px]">{cat.title[locale]}</h2>
            <Image
              src={openCategory.includes(catIndex) ? "/images/faq_minus.svg" : "/images/faq_plus.svg"}
              alt={openCategory.includes(catIndex) ? "Collapse" : "Expand"}
              className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]"
              width={50}
              height={50}
            />
          </div>

          {/* Questions */}
          {openCategory.includes(catIndex) && (
            <div className="mt-3 space-y-2">
              {cat.items[locale].map((faq, index) => (
                <div
                  key={index}
                  className="px-3 py-4 lg:px-5 lg:py-4 xl:px-6 xl:py-[16px] rounded-[16px] lg:rounded-[20px] bg-white hover:bg-[var(--light-gray)] cursor-pointer transition-all duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.25)] border border-neutral-200"
                  onClick={() => setOpenQuestion(openQuestion === faq.question ? null : faq.question)}
                >
                  <div className="flex flex-col">
                    <div className="flex gap-[10px] justify-between items-center">
                      <h6 className="font-bold lg:text-lg md:text-[16px] text-[14px]">{faq.question}</h6>
                      <Image
                        src={openQuestion === faq.question ? "/images/faq_minus.svg" : "/images/faq_plus.svg"}
                        alt={openQuestion === faq.question ? "Collapse" : "Expand"}
                        className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                        openQuestion === faq.question ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <p className="whitespace-pre-wrap mt-2 text-[12px] md:text-[14px] lg:text-[16px]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default FAQPage;

const faqData: FAQCategory[] = [
  {
    title: {
      en: "General questions",
      sv: "Generella frågor",
    },
    bgColor: "bg-[#FFFDF4]",
    items: {
      en: [
        {
          question: "How does it work? ",
          answer: (
            <p>
              When you order a photo book or wall art, we’ll send you a beautiful collection box. Simply place your child’s drawings or artworks
              inside and send the box back to us. We’ll carefully digitize and design your product. If you'd like the originals returned, just let us
              know, we’re happy to send them back.
            </p>
          ),
        },
        {
          question: "What does the process look like?",
          answer: (
            <ul className="list-decimal list-outside pl-6">
              <li>Place your order – Choose a photo book or wall art.</li>
              <li>Receive your box – We send you a beautifully designed Mini Maestro box.</li>
              <li>Send us the artwork – Place your child’s drawings in the box and return it to us using the prepaid shipping label.</li>
              <li>
                We get to work! – We professionally photograph and edit each artwork using studio lighting and high-end equipment to ensure every
                detail is captured.
              </li>
              <li>
                You review a digital draft – We send you a preview of your photo book or wall art to review. You can suggest changes before we go to
                print.
              </li>
              <li>Final delivery – Once approved, we print and deliver your personalized memory to your door.</li>
            </ul>
          ),
        },
        {
          question: "How long does the entire process take from order to delivery?",
          answer: (
            <div>
              <p>Once we receive your drawings, the process typically takes:</p>
              <ul className="list-disc list-outside pl-6">
                <li>2–4 days for photographing and editing</li>
                <li>5–7 days for production (printing your photo book or wall art)</li>
                <li>3–4 days for delivery</li>
              </ul>
              <br />
              <p>In total, you can expect to receive your finished product within 10–15 days after we’ve received your artwork.</p>
              <br />
              <p>We’ll keep you updated along the way, and you’ll also get to review a digital draft before we print.</p>
            </div>
          ),
        },
        {
          question: "Can I send in artworks from multiple children?",
          answer: (
            <div>
              <p>Yes, absolutely! You’re welcome to send in drawings from multiple children.</p>
              <br />
              <p>
                Just let us know at checkout or when sending your box if you’d like the artworks to be organized separately by child or combined into
                one book or painting. We’ll tailor the layout to match your preference and make sure each child’s creativity shines through.
              </p>
            </div>
          ),
        },
        {
          question: "Can I order more than one copy?",
          answer: (
            <p>
              Absolutely! You can order as many copies of your photo book or wall art as you like,perfect for gifting to grandparents or saving an
              extra copy for yourself. Just let us know how many you need when placing your order.
            </p>
          ),
        },
        {
          question: "What is included in the price when ordering a photo book or a wall art?",
          answer: (
            <div>
              <p>Your purchase includes everything needed to create your personalized product:</p>
              <ul className="list-none list-outside pl-2">
                <li>– A beautifully designed Mini Maestro collection box sent to your home</li>
                <li>– Prepaid return shipping of your child’s artwork</li>
                <li>– Professional digitization and editing of each drawing</li>
                <li>– The design and production of your custom photo book or wall art</li>
                <li>– Optional return of the original drawings (upon request)</li>
              </ul>
              <br />
              <p>No hidden fees, just a simple, creative and joyful experience from start to finish.</p>
            </div>
          ),
        },
        {
          question: "How far in advance should I order if I want the product as a gift?",
          answer: (
            <div>
              <p>We recommend placing your order at least 3 weeks in advance to ensure your gift arrives on time.</p>
              <br />
              <p>
                This gives us enough time for photographing, editing, production, and delivery, plus time for you to review and approve the digital
                draft.
              </p>
              <br />
              <p>If you’re on a tighter deadline, feel free to contact us — we’ll do our best to make it work!</p>
            </div>
          ),
        },
        {
          question: "Can I place an order as a company or preschool?",
          answer: (
            <div>
              <p>
                Yes, absolutely! We love working with preschools, schools, and companies that want to turn children’s artwork into something truly
                memorable.
              </p>
              <br />
              <p>
                If you’re placing a larger order or have specific needs, just reach out to us, we’re happy to tailor a solution for you, including
                volume pricing and custom layouts.
              </p>
            </div>
          ),
        },
        {
          question: "What payment options do you offer?",
          answer: (
            <div>
              <p>
                We currently offer secure payment by credit/debit card and direct bank transfer. All transactions are processed safely and encrypted
                for your protection.
              </p>
              <br />
              <p>If you prefer another method, feel free to contact us, we’re happy to help!</p>
            </div>
          ),
        },
      ],
      sv: [
        {
          question: "Hur fungerar det?",
          answer: (
            <p>
              När du beställer en fotobok eller väggkonst skickar vi en vacker samlingsbox till dig. Lägg ditt barns teckningar eller konstverk i
              boxen och skicka tillbaka den till oss. Vi digitaliserar och designar din produkt noggrant. Om du vill ha originalen tillbaka, meddela
              oss så ordnar vi det gärna.
            </p>
          ),
        },
        {
          question: "Hur ser processen ut?",
          answer: (
            <ul className="list-decimal list-outside pl-6">
              <li>Lägg din beställning – Välj fotobok eller väggkonst.</li>
              <li>Ta emot din box – Vi skickar en vackert designad Mini Maestro-box till dig.</li>
              <li>Skicka in konstverken – Lägg ditt barns teckningar i boxen och returnera den till oss med den förbetalda fraktsedeln.</li>
              <li>
                Vi sätter igång! – Vi fotograferar och redigerar varje konstverk professionellt med studiobelysning och högkvalitativ utrustning för
                att fånga varje detalj.
              </li>
              <li>
                Du granskar ett digitalt utkast – Vi skickar en förhandsvisning av din fotobok eller väggkonst för granskning. Du kan föreslå
                ändringar innan vi går till tryck.
              </li>
              <li>Slutleverans – När du har godkänt trycker och levererar vi din personliga minnesprodukt hem till dig.</li>
            </ul>
          ),
        },
        {
          question: "Hur lång tid tar hela processen från beställning till leverans?",
          answer: (
            <div>
              <p>När vi har fått dina teckningar tar processen vanligtvis:</p>
              <ul className="list-disc list-outside pl-6 ">
                <li>2–4 dagar för fotografering och redigering</li>
                <li>5–7 dagar för produktion (tryckning av din fotobok eller väggkonst)</li>
                <li>3–4 dagar för leverans</li>
              </ul>
              <br />
              <p>Totalt kan du räkna med att få din färdiga produkt inom 10–15 dagar efter att vi mottagit ditt konstverk.</p>
              <br />
              <p>Vi håller dig uppdaterad under hela processen och du får även granska ett digitalt utkast innan vi trycker.</p>
            </div>
          ),
        },
        {
          question: "Kan jag skicka in konstverk från flera barn?",
          answer: (
            <div>
              <p>Ja, absolut! Du är välkommen att skicka in teckningar från flera barn.</p>
              <br />
              <p>
                Meddela oss vid utcheckning eller när du skickar din box om du vill att konstverken ska organiseras separat per barn eller kombineras
                i en bok eller tavla. Vi anpassar layouten efter dina önskemål och ser till att varje barns kreativitet får lysa.
              </p>
            </div>
          ),
        },
        {
          question: "Kan jag beställa fler än ett exemplar?",
          answer: (
            <p>
              Absolut! Du kan beställa så många exemplar av din fotobok eller väggkonst du vill – perfekt som gåva till mor- och farföräldrar eller
              för att spara ett extra exemplar själv. Ange bara hur många du vill ha vid beställning.
            </p>
          ),
        },
        {
          question: "Vad ingår i priset när jag beställer en fotobok eller väggkonst?",
          answer: (
            <div>
              <p>Din beställning inkluderar allt som behövs för att skapa din personliga produkt:</p>
              <ul className="list-none list-outside pl-2">
                <li>– En vackert designad Mini Maestro-samlingsbox skickad hem till dig</li>
                <li>– Förbetald returfrakt av ditt barns konstverk</li>
                <li>– Professionell digitalisering och redigering av varje teckning</li>
                <li>– Design och produktion av din personliga fotobok eller väggkonst</li>
                <li>– Valfri retur av originalteckningarna (på begäran)</li>
              </ul>
              <br />
              <p>Inga dolda avgifter, bara en enkel, kreativ och glädjefylld upplevelse från början till slut.</p>
            </div>
          ),
        },
        {
          question: "Hur långt i förväg bör jag beställa om jag vill ge produkten som present?",
          answer: (
            <div>
              <p>Vi rekommenderar att du lägger din beställning minst 3 veckor i förväg för att vara säker på att din present hinner fram.</p>
              <br />
              <p>
                Det ger oss tillräckligt med tid för fotografering, redigering, produktion och leverans, samt tid för dig att granska och godkänna det
                digitala utkastet.
              </p>
              <br />
              <p>Om du har en snävare tidsram, kontakta oss gärna – vi gör vårt bästa för att hjälpa dig!</p>
            </div>
          ),
        },
        {
          question: "Kan jag beställa som företag eller förskola?",
          answer: (
            <div>
              <p>Ja, absolut! Vi älskar att samarbeta med förskolor, skolor och företag som vill göra något minnesvärt av barns konstverk.</p>
              <br />
              <p>
                Om du gör en större beställning eller har särskilda önskemål, kontakta oss gärna – vi skräddarsyr en lösning för dig, inklusive
                mängdrabatt och specialanpassade layouter.
              </p>
            </div>
          ),
        },
        {
          question: "Vilka betalningsalternativ erbjuder ni?",
          answer: (
            <div>
              <p>
                Vi erbjuder för närvarande säker betalning med kredit-/betalkort och direkt banköverföring. Alla transaktioner behandlas säkert och
                krypteras för din trygghet.
              </p>
              <br />
              <p>Om du föredrar ett annat betalningssätt, kontakta oss gärna – vi hjälper dig!</p>
            </div>
          ),
        },
      ],
    },
  },
  {
    title: {
      en: "Customizing Your Product",
      sv: "Personalisering av din produkt",
    },
    bgColor: "bg-[#EFFBFF]",
    items: {
      en: [
        {
          question: "What sizes are available for the books?",
          answer: (
            <p>
              Our photo books are available in a 21 x 21 cm square format with a premium hardcover finish. The compact size is perfect for showcasing
              your child’s artwork in a stylish and durable way.
            </p>
          ),
        },
        {
          question: "What sizes are available for the wall art?",
          answer: (
            <div>
              <p>We currently offer two size options:</p>
              <ul className="list-none list-outside pl-2">
                <li>– 20 x 20 cm – a perfect square format</li>
                <li>– 30 x 40 cm – a classic portrait layout</li>
              </ul>
              <br />
              <p>Both formats are designed to beautifully highlight your child’s artwork and fit standard frames.</p>
            </div>
          ),
        },
        {
          question: "My child's drawings have a white background — can we add color?",
          answer: (
            <p>
              Yes, absolutely! If you prefer a colored background behind the drawings, just let us know. We can add soft pastel tones, bold colors, or
              something that complements your child's artwork. You’ll get to preview and approve the design before we print.
            </p>
          ),
        },
        {
          question: "What type of drawings can be sent in?",
          answer: (
            <div>
              <p>
                We accept all kinds of creations,from pencil sketches and watercolor paintings to finger-painting and mixed media. As long as it’s
                made by your child and fits in the box, we’ll turn it into something beautiful.
              </p>
              <br />
              <p>If you're unsure about a specific piece, just send us a photo — we’re happy to help!</p>
            </div>
          ),
        },
        {
          question: "Does a frame come with the wall art?",
          answer: (
            <p>
              No, the frame is not included by default,but you can easily add one when placing your order. We offer high-quality frames in black or
              white, designed to perfectly match your custom artwork.
            </p>
          ),
        },
        {
          question: "Can I add a personal greeting or text in the photo book or on the painting?",
          answer: (
            <div>
              <p>Yes! You can add a personal message, quote, name or date to make your product even more meaningful.</p>
              <br />
              <p>
                If you’d like to include text, simply write it on the back of the drawings or let us know in a note when sending in your Mini Maestro
                box. You’ll also have the chance to review and adjust the text during the digital proofing stage before we go to print.
              </p>
            </div>
          ),
        },
      ],
      sv: [
        {
          question: "Vilka storlekar finns för böckerna?",
          answer: (
            <p>
              Våra fotoböcker finns i kvadratiskt format 21 x 21 cm med exklusivt hårdpärmsomslag. Den kompakta storleken är perfekt för att visa upp
              ditt barns konst på ett stilfullt och hållbart sätt.
            </p>
          ),
        },
        {
          question: "Vilka storlekar finns för väggkonsten?",
          answer: (
            <div>
              <p>Vi erbjuder för närvarande två storleksalternativ:</p>
              <ul className="list-none list-outside pl-2">
                <li>– 20 x 20 cm – ett perfekt kvadratiskt format</li>
                <li>– 30 x 40 cm – ett klassiskt porträttformat</li>
              </ul>
              <br />
              <p>Båda formaten är designade för att lyfta fram ditt barns konst och passar i standardramar.</p>
            </div>
          ),
        },
        {
          question: "Mitt barns teckningar har vit bakgrund – kan vi lägga till färg?",
          answer: (
            <p>
              Ja, absolut! Om du vill ha en färgad bakgrund bakom teckningarna, meddela oss bara. Vi kan lägga till mjuka pastelltoner, starka färger
              eller något som passar ditt barns konst. Du får förhandsgranska och godkänna designen innan vi trycker.
            </p>
          ),
        },
        {
          question: "Vilken typ av teckningar kan skickas in?",
          answer: (
            <div>
              <p>
                Vi tar emot alla typer av skapelser, från blyertsteckningar och akvareller till fingerfärg och blandteknik. Så länge det är gjort av
                ditt barn och får plats i boxen, gör vi något vackert av det.
              </p>
              <br />
              <p>Om du är osäker på ett specifikt verk, skicka gärna en bild – vi hjälper dig!</p>
            </div>
          ),
        },
        {
          question: "Ingår ram till väggkonsten?",
          answer: (
            <p>
              Nej, ram ingår inte som standard, men du kan enkelt lägga till en vid beställning. Vi erbjuder högkvalitativa ramar i svart eller vitt
              som passar perfekt till din personliga konst.
            </p>
          ),
        },
        {
          question: "Kan jag lägga till en personlig hälsning eller text i fotoboken eller på tavlan?",
          answer: (
            <div>
              <p>Ja! Du kan lägga till ett personligt meddelande, citat, namn eller datum för att göra din produkt ännu mer betydelsefull.</p>
              <br />
              <p>
                Om du vill inkludera text, skriv den på baksidan av teckningarna eller meddela oss i en lapp när du skickar din Mini Maestro-box. Du
                får även möjlighet att granska och justera texten under den digitala korrekturen innan vi trycker.
              </p>
            </div>
          ),
        },
      ],
    },
  },
  {
    title: {
      en: "Shipping & Returns",
      sv: "Leverans & Returer",
    },
    bgColor: "bg-[#FFFDF4]",
    items: {
      en: [
        {
          question: "What happens if I want to make changes to the book or painting after I have approved the draft?",
          answer: (
            <div>
              <p>
                Once you’ve approved the digital draft, we send your product into production — so unfortunately, no changes can be made after that
                point.
              </p>
              <br />
              <p>
                That’s why we always recommend reviewing the draft carefully before giving your final approval. But if you notice something right
                away, get in touch as soon as possible — if production hasn’t started yet, we’ll do our best to help.
              </p>
            </div>
          ),
        },
        {
          question: "What happens if I send in drawings and then change my mind?",
          answer: (
            <div>
              <p>If you change your mind after sending in your drawings, no problem, we understand that things happen!</p>
              <br />
              <p>
                However, since we’ve already covered shipping and handling, we kindly ask you to cover the return shipping cost if you’d like your
                originals sent back without completing the order.
              </p>
              <br />
              <p>If we’ve already started photographing or editing, a partial fee may apply depending on how far we’ve come in the process.</p>
              <br />
              <p>Just reach out and we’ll find a solution that feels fair to both sides.</p>
            </div>
          ),
        },
        {
          question: " Is there any extra protection for the drawings during the return shipment?",
          answer: (
            <div>
              <p>
                Yes,if you choose to have the original drawings returned, we carefully repack them using protective materials to ensure they’re safely
                delivered back to you.
              </p>
              <br />
              <p>
                We do everything we can to minimize the risk of damage during transit, and always treat your child’s artwork with the greatest care.
              </p>
            </div>
          ),
        },
        {
          question: "What happens if I receive the book or painting and change my mind?",
          answer: (
            <div>
              <p>
                Since each product is custom-made and approved by you before printing, there is no right of withdrawal once the final item has been
                delivered.
              </p>
              <br />
              <p>
                However, your satisfaction is incredibly important to us. If you're unhappy with the result for any reason, please contact us, we’ll
                do our best to find a solution that makes you feel good about your Mini Maestro memory.
              </p>
            </div>
          ),
        },
        {
          question: "Do you ship internationally?",
          answer: (
            <div>
              <p>
                Yes! We ship to all countries within Europe. Shipping costs and delivery times may vary depending on your location, but we’ll always
                make sure your child’s artwork arrives safely and on time.
              </p>
            </div>
          ),
        },
      ],
      sv: [
        {
          question: "Vad händer om jag vill göra ändringar i boken eller tavlan efter att jag har godkänt utkastet?",
          answer: (
            <div>
              <p>När du har godkänt det digitala utkastet skickar vi din produkt till produktion – så tyvärr kan inga ändringar göras efter det.</p>
              <br />
              <p>
                Därför rekommenderar vi alltid att du granskar utkastet noggrant innan du ger ditt slutgiltiga godkännande. Men om du upptäcker något
                direkt, kontakta oss så snart som möjligt – om produktionen inte har startat än gör vi vårt bästa för att hjälpa dig.
              </p>
            </div>
          ),
        },
        {
          question: "Vad händer om jag skickar in teckningar och sedan ångrar mig?",
          answer: (
            <div>
              <p>Om du ångrar dig efter att ha skickat in dina teckningar är det inga problem, vi förstår att saker kan ändras!</p>
              <br />
              <p>
                Eftersom vi redan har stått för frakt och hantering ber vi dig vänligen att stå för returfrakten om du vill ha originalen tillbaka
                utan att slutföra beställningen.
              </p>
              <br />
              <p>Om vi redan har börjat fotografera eller redigera kan en delavgift tillkomma beroende på hur långt vi har kommit i processen.</p>
              <br />
              <p>Kontakta oss så hittar vi en lösning som känns rättvis för båda parter.</p>
            </div>
          ),
        },
        {
          question: "Finns det extra skydd för teckningarna vid returfrakten?",
          answer: (
            <div>
              <p>
                Ja, om du väljer att få originalteckningarna tillbaka packar vi dem noggrant med skyddande material för att de ska komma säkert hem
                till dig.
              </p>
              <br />
              <p>
                Vi gör allt vi kan för att minimera risken för skador under transporten och behandlar alltid ditt barns konstverk med största omsorg.
              </p>
            </div>
          ),
        },
        {
          question: "Vad händer om jag får boken eller tavlan och ångrar mig?",
          answer: (
            <div>
              <p>
                Eftersom varje produkt är specialgjord och godkänd av dig innan tryck finns ingen ångerrätt när den slutliga produkten har levererats.
              </p>
              <br />
              <p>
                Din nöjdhet är dock väldigt viktig för oss. Om du är missnöjd med resultatet av någon anledning, kontakta oss så gör vi vårt bästa för
                att hitta en lösning som känns bra för dig och ditt Mini Maestro-minne.
              </p>
            </div>
          ),
        },
        {
          question: "Skickar ni internationellt?",
          answer: (
            <div>
              <p>
                Ja! Vi skickar till alla länder inom Europa. Fraktkostnader och leveranstider kan variera beroende på din plats, men vi ser alltid
                till att ditt barns konstverk kommer fram säkert och i tid.
              </p>
            </div>
          ),
        },
      ],
    },
  },
];
