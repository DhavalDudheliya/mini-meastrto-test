"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

type FaqItem = {
  question: string;
  answer: string | string[];
};

const faqs: { [key: string]: FaqItem[] } = {
  sv: [
    {
      question: "Vad kostar det att beställa hem en Mini Maestro box och vad inkluderas?",
      answer:
        "När du väljer att beställa din produkt, en fotobok eller en tavla inkluderas det en box som ni lägger ner era teckningar eller konstverk som skickas till oss. Vill ni ha tillbaka teckningarna skickar vi givetvis tillbaka dem.",
    },
    {
      question: "Kan vi fota och skicka teckningarna digitalt istället för att skicka via post?",
      answer: "Ja, men vi kan inte garantera att det blir samma slutresultat.",
    },
    {
      question: "Vad inkluderas i priset när man beställer hem Mini Maestro boxen?",
      answer:
        "I priset ingår det att ni skickar in era teckningar till oss, vi fotar med professionell utrustning och börjar skapa er personliga fotobok eller tavla. Ni godkänner sedan utkastet och vi skickar produkten hem till er tillsammans med teckningarna om ni vill ha tillbaka dem.",
    },
    {
      question: "Hur ser processen ut?",
      answer: [
        "**Beställ en fotobok eller en personlig tavla.**",
        "**Vi skickar en box** där du lägger ditt barns teckningar och skickar in till oss.",
        "**När vi har mottagit din Mini Maestro box**, sätter vi igång med det vi älskar! Vi fotograferar och redigerar varje teckning med studiobelysning och toppmodern utrustning för att fånga teckningen/konstverket på bästa sätt.",
        "**Vi skickar ett digitalt utkast** av din konstbok eller tavla för att du ska kunna granska och redigera vid behov. När du ger oss tummen upp, skickar vi ditt konstverk/teckning till tryck!",
        "**Vi skickar ditt personliga minne till dig.**",
      ],
    },
    {
      question: "Vilka betalningsalternativ har ni?",
      answer: "Vi erbjuder direktbetalning och banköverföring.",
    },
    {
      question: "Hur lång tid tar hela processen från beställning till mottagen produkt?",
      answer:
        "Från att vi har mottagit dina teckningar tar det ca 2-4 dagar att fota och redigera teckningarna. Sedan är det en produktionstid på 5-7 dagar och sedan leveranstid 3-4 dagar. Sammanlagt 10-15 dagar.",
    },
    {
      question: "Vilka storlekar finns på böckerna?",
      answer: "Vi erbjuder en storlek på 21 x 21 cm med hårt bokomslag.",
    },
    {
      question: "Vilka storlekar finns på tavlorna?",
      answer: "Vi erbjuder två olika storlekar, 20 x 20 och 30 x 40.",
    },
    {
      question: "Är fotoboken hård eller mjuk?",
      answer: "Den personliga fotoboken är i hårt bokomslag.",
    },
    {
      question: "Medföljer en ram till tavlan?",
      answer: "Nej, detta kan du lägga till vid din beställning. Du kan välja mellan svart eller vit ram.",
    },
    {
      question: "Vad händer om jag skickar in teckningar/konstverk och ångrar mig?",
      answer: "Om ni lagt en beställning och skickat in teckningarna till oss kommer vi att debitera er för fraktkostnaden fram och tillbaka.",
    },
    {
      question: "Vad händer om jag fått hem boken/tavlan och ångrar mig?",
      answer:
        "Har ni godkänt produkten och fått den hemskickad så finns det ingen ångerrätt. Är ni däremot missnöjda med slutresultatet av någon anledning, vänligen kontakta oss.",
    },
    {
      question: "Kan man beställa flera exemplar än ett?",
      answer: "Ja, du kan beställa hur många exemplar du vill.",
    },
    {
      question: "Mitt barns teckningar har vit bakgrund, kan vi lägga till färg?",
      answer: "Ja, vi kan lägga till en färgad bakgrund om ni önskar detta.",
    },
    {
      question: "Vilken typ av teckningar kan skickas in?",
      answer:
        "Vi kan använda alla typer av teckningar, målningar eller konstverk som ditt barn har skapat. Om du är osäker på om ditt barns konstverk passar, tveka inte att kontakta oss!",
    },
    {
      question: "Hur spårar jag min beställning?",
      answer:
        "När vi har mottagit dina teckningar och påbörjat processen får du uppdateringar via e-post. Du kommer även att få ett spårningsnummer när din produkt skickas.",
    },
    {
      question: "Vilka material används för tavlorna?",
      answer: "Vi använder högkvalitativa material för att säkerställa att dina tavlor håller länge och ser professionella ut.",
    },
    {
      question: "Kan jag lägga till en personlig hälsning eller text i fotoboken eller på tavlan?",
      answer:
        "Ja, du kan lägga till en personlig text, citat eller datum för att göra ditt minne ännu mer unikt. Skriv på baksidan av dina teckningar vad du önskar för text. Du kommer även få möjlighet att lägga till detta när du granskar ditt digitala utkast innan produktion.",
    },
    {
      question: "Vad händer om jag vill göra ändringar i boken/tavlan efter att jag har godkänt utkastet?",
      answer:
        "När du har godkänt det digitala utkastet och produkten har gått till tryck kan vi tyvärr inte göra några ytterligare ändringar. Om du märker ett fel innan du godkänner utkastet, korrigerar du detta på 'mina sidor'.",
    },
    {
      question: "Kan jag använda mina barns konstverk i andra format, till exempel kalendrar eller vykort?",
      answer:
        "För närvarande erbjuder vi fotoböcker och tavlor, men om du är intresserad av andra format, som kalendrar eller vykort, hör av dig så kan vi diskutera en specialbeställning!",
    },
    {
      question: "Kan jag skicka in konstverk från flera barn?",
      answer:
        "Ja, du kan absolut skicka in teckningar från flera barn. Ange gärna vid beställningen om du vill att konstverken ska organiseras separat eller tillsammans i boken eller på tavlan.",
    },
    {
      question: "Hur förbereder jag teckningarna för att skickas till er?",
      answer:
        "Vi rekommenderar att du inte rullar eller viker teckningarna, utan istället placerar dem plant i den box vi skickar. Följ instruktionerna som medföljer för bästa resultat.",
    },
    {
      question: "Kan jag använda teckningar som är äldre och har bleknat?",
      answer: "Ja, vi kan arbeta med äldre teckningar och försöka återställa deras färger och utseende digitalt så gott det går.",
    },
    {
      question: "Finns det något extra skydd för teckningarna under frakten tillbaka?",
      answer:
        "Om du väljer att få teckningarna tillbaka kommer vi att packa dem noggrant och skicka dem på ett säkert sätt för att minimera risken för skador.",
    },
    {
      question: "Finns det några begränsningar för antalet teckningar jag kan skicka in?",
      answer:
        "Vi har ingen övre gräns för antalet teckningar du kan skicka in, men om du vill inkludera väldigt många teckningar i din fotobok kan vi behöva diskutera en speciallösning för att se till att allt får plats.",
    },
    {
      question: "Hur långt i förväg bör jag beställa om jag vill ha produkten som en present?",
      answer:
        "Vi rekommenderar att du gör din beställning minst tre veckor i förväg om du planerar att ge produkten som en present, för att säkerställa att du får den i tid.",
    },
    {
      question: "Kan jag göra en beställning som företag eller förskola?",
      answer:
        "Absolut! Vi tar emot större beställningar från företag, förskolor eller skolor. Kontakta oss för mer information och specialerbjudanden.",
    },
  ],
  en: [
    {
      question: "What does it cost to order a Mini Maestro box home and what is included?",
      answer:
        "When you choose to order your product, a photo book or a painting, a box is included where you place your drawings or artworks that are sent to us. If you want the drawings back, we will of course return them.",
    },
    {
      question: "Can we photograph and send the drawings digitally instead of sending by post?",
      answer: "Yes, but we cannot guarantee that the final result will be the same.",
    },
    {
      question: "What is included in the price when ordering the Mini Maestro box?",
      answer:
        "The price includes you sending your drawings to us, we photograph with professional equipment and start creating your personal photo book or painting. You then approve the draft, and we send the product home to you along with the drawings if you want them back.",
    },
    {
      question: "What does the process look like?",
      answer: [
        "**Order a photo book or a personal painting.**",
        "**We send a box** where you place your child's drawings and send to us.",
        "**When we have received your Mini Maestro box**, we start doing what we love! We photograph and edit each drawing with studio lighting and state-of-the-art equipment to capture the drawing/artwork in the best way.",
        "**We send a digital draft** of your art book or painting for you to review and edit if necessary. When you give us the thumbs up, we send your artwork/drawing to print!",
        "**We send your personal memory to you.**",
      ],
    },
    {
      question: "What payment options do you offer?",
      answer: "We offer direct payment and bank transfer.",
    },
    {
      question: "How long does the entire process take from order to received product?",
      answer:
        "From when we have received your drawings, it takes about 2-4 days to photograph and edit the drawings. Then there is a production time of 5-7 days and then delivery time 3-4 days. A total of 10-15 days.",
    },
    {
      question: "What sizes are available for the books?",
      answer: "We offer a size of 21 x 21 cm with a hard book cover.",
    },
    {
      question: "What sizes are available for the paintings?",
      answer: "We offer two different sizes, 20 x 20 and 30 x 40.",
    },
    {
      question: "Is the photo book hard or soft cover?",
      answer: "The personal photo book has a hard book cover.",
    },
    {
      question: "Does a frame come with the painting?",
      answer: "No, you can add this when you order. You can choose between a black or white frame.",
    },
    {
      question: "What happens if I send in drawings/artworks and change my mind?",
      answer: "If you have placed an order and sent in the drawings to us, we will charge you for the shipping cost back and forth.",
    },
    {
      question: "What happens if I receive the book/painting and change my mind?",
      answer:
        "If you have approved the product and received it, there is no right of withdrawal. However, if you are dissatisfied with the end result for any reason, please contact us.",
    },
    {
      question: "Can I order more than one copy?",
      answer: "Yes, you can order as many copies as you like.",
    },
    {
      question: "My child's drawings have a white background, can we add color?",
      answer: "Yes, we can add a colored background if you wish.",
    },
    {
      question: "What type of drawings can be sent in?",
      answer:
        "We can use all types of drawings, paintings, or artworks that your child has created. If you're unsure whether your child's artwork fits, don't hesitate to contact us!",
    },
    {
      question: "How do I track my order?",
      answer:
        "When we have received your drawings and started the process, you will receive updates via email. You will also receive a tracking number when your product is shipped.",
    },
    {
      question: "What materials are used for the paintings?",
      answer: "We use high-quality materials to ensure that your paintings last a long time and look professional.",
    },
    {
      question: "Can I add a personal greeting or text in the photo book or on the painting?",
      answer:
        "Yes, you can add a personal text, quote, or date to make your memory even more unique. Write on the back of your drawings what text you wish. You will also have the opportunity to add this when you review your digital draft before production.",
    },
    {
      question: "What happens if I want to make changes to the book/painting after I have approved the draft?",
      answer:
        "Once you have approved the digital draft and the product has gone to print, we unfortunately cannot make any further changes. If you notice an error before you approve the draft, you can correct this on 'my pages'.",
    },
    {
      question: "Can I use my children's artwork in other formats, such as calendars or postcards?",
      answer:
        "Currently, we offer photo books and paintings, but if you are interested in other formats, such as calendars or postcards, contact us and we can discuss a special order!",
    },
    {
      question: "Can I send in artworks from multiple children?",
      answer:
        "Yes, you can absolutely send in drawings from multiple children. Please indicate when ordering if you want the artworks to be organized separately or together in the book or on the painting.",
    },
    {
      question: "How do I prepare the drawings to be sent to you?",
      answer:
        "We recommend that you do not roll or fold the drawings, but instead place them flat in the box we send. Follow the included instructions for the best result.",
    },
    {
      question: "Can I use drawings that are older and have faded?",
      answer: "Yes, we can work with older drawings and try to restore their colors and appearance digitally as best as possible.",
    },
    {
      question: "Is there any extra protection for the drawings during the return shipment?",
      answer: "If you choose to get the drawings back, we will pack them carefully and send them in a safe way to minimize the risk of damage.",
    },
    {
      question: "Are there any limitations on the number of drawings I can send in?",
      answer:
        "We have no upper limit for the number of drawings you can send in, but if you want to include a very large number of drawings in your photo book, we may need to discuss a special solution to ensure everything fits.",
    },
    {
      question: "How far in advance should I order if I want the product as a gift?",
      answer:
        "We recommend that you place your order at least three weeks in advance if you plan to give the product as a gift, to ensure that you receive it in time.",
    },
    {
      question: "Can I place an order as a company or preschool?",
      answer: "Absolutely! We accept larger orders from companies, preschools, or schools. Contact us for more information and special offers.",
    },
  ],
};

const Faq = () => {
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const t = useTranslations();

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

  return (
    <div className="p-4 index-section">
      <div className="container">
        <div className="flex flex-col gap-[30px] md:gap-[50px] lg:gap-[60px]">
          <div className="flex justify-center w-full">
            <div className="relative flex flex-col items-center">
              <h2>{t("faq")}</h2>
              <Image
                src="/images/heading_pink_sm.png"
                width={300}
                height={50}
                alt="Decorative underline"
                className="bottom-[-10px] max-w-[400px] absolute w-[150%] left-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 2xl:gap-6">
            {faqs[locale].map((faq, index) => (
              <div
                key={index}
                className="px-3 py-4 lg:px-5 lg:py-4 xl:px-6 xl:py-[30px] rounded-[16px] lg:rounded-[20px] bg-[var(--mid-gray)] cursor-pointer transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex flex-col">
                  <div className="flex gap-[10px] justify-between items-center">
                    <h6>{faq.question}</h6>
                    <Image
                      src={activeIndex === index ? "/images/faq_minus.svg" : "/images/faq_plus.svg"}
                      alt={activeIndex === index ? "Collapse" : "Expand"}
                      className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div
                    className={`transition-max-height duration-300 ease-in-out overflow-hidden  ${
                      activeIndex === index ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    {faq.answer instanceof Array ? (
                      <ol className="list-decimal list-inside pl-4 mt-2 space-y-2 text-[14px] md:text-[16px] lg:text-[18px]">
                        {faq.answer.map((ans, index) => {
                          return <li key={index}>{parseAndRenderText(ans)}</li>;
                        })}
                      </ol>
                    ) : (
                      <p className="whitespace-pre-wrap mt-2 text-[14px] md:text-[16px] lg:text-[18px]">{faq.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};