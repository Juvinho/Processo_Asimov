import type { ReactNode } from "react";

type TitlePart = {
  text: string;
  highlight?: boolean;
};

type ServiceCard = {
  id: number;
  background: "#F3F3F3" | "#B9FF66" | "#191A23";
  textColor: "#191A23" | "#FFFFFF";
  titleParts: TitlePart[];
};

const services: ServiceCard[] = [
  {
    id: 1,
    background: "#F3F3F3",
    textColor: "#191A23",
    titleParts: [
      { text: "Search engine", highlight: true },
      { text: "optimization", highlight: true },
    ],
  },
  {
    id: 2,
    background: "#B9FF66",
    textColor: "#191A23",
    titleParts: [{ text: "Pay-per-click advertising" }],
  },
  {
    id: 3,
    background: "#191A23",
    textColor: "#FFFFFF",
    titleParts: [
      { text: "Social Media", highlight: true },
      { text: "Marketing", highlight: true },
    ],
  },
  {
    id: 4,
    background: "#F3F3F3",
    textColor: "#191A23",
    titleParts: [
      { text: "Email", highlight: true },
      { text: "Marketing", highlight: true },
    ],
  },
  {
    id: 5,
    background: "#B9FF66",
    textColor: "#191A23",
    titleParts: [{ text: "Content Creation" }],
  },
  {
    id: 6,
    background: "#191A23",
    textColor: "#FFFFFF",
    titleParts: [
      { text: "Analytics and", highlight: true },
      { text: "Tracking", highlight: true },
    ],
  },
];

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        backgroundColor: "#B9FF66",
        borderRadius: "7px",
        padding: "2px 8px",
        color: "#191A23",
      }}
    >
      {children}
    </span>
  );
}

function LearnMore({ darkCard }: { darkCard: boolean }) {
  const circleBg = darkCard ? "#FFFFFF" : "#191A23";
  const arrowColor = darkCard ? "#191A23" : "#FFFFFF";
  const textColor = darkCard ? "#FFFFFF" : "#191A23";

  return (
    <div className="flex items-center gap-4">
      <span
        style={{
          width: "41px",
          height: "41px",
          borderRadius: "999px",
          background: circleBg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 14L14 4M7 4H14V11"
            stroke={arrowColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        style={{
          color: textColor,
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        Learn more
      </span>
    </div>
  );
}

function CardTitle({ parts, textColor }: { parts: TitlePart[]; textColor: string }) {
  return (
    <h3
      style={{
        fontSize: "28px",
        fontWeight: 500,
        color: textColor,
        lineHeight: 1.25,
      }}
      className="max-w-[260px]"
    >
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className="mb-1 block w-fit">
          {part.highlight ? <Highlight>{part.text}</Highlight> : part.text}
        </span>
      ))}
    </h3>
  );
}

export default function Services() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[100px]">
        <div className="mb-12 flex flex-col items-start gap-6 md:mb-20 md:flex-row md:items-center md:gap-10">
          <h2
            style={{
              color: "#191A23",
              fontWeight: 500,
              lineHeight: 1,
            }}
            className="text-[28px] md:text-[40px]"
          >
            <Highlight>Services</Highlight>
          </h2>

          <p
            style={{
              color: "#191A23",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: "580px",
            }}
          >
            At our digital marketing agency, we offer a range of services to help
            businesses grow and succeed online. These services include:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {services.map((service) => {
            const darkCard = service.background === "#191A23";

            return (
              <article
                key={service.id}
                style={{
                  background: service.background,
                  border: "1px solid #191A23",
                  borderRadius: "45px",
                  boxShadow: "0px 5px 0px 0px #191A23",
                  padding: "50px",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="h-auto md:h-[310px]"
              >
                <CardTitle parts={service.titleParts} textColor={service.textColor} />

                <div
                  style={{
                    position: "absolute",
                    left: "50px",
                    right: "50px",
                    bottom: "105px",
                    height: "1px",
                    background: darkCard
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(25, 26, 35, 0.2)",
                  }}
                />

                <div className="relative z-10 mt-24 md:mt-[112px]">
                  <LearnMore darkCard={darkCard} />
                </div>

                <img
                  src={`/logos/ilustracao_caixa_${service.id}.png`}
                  alt=""
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    right: "30px",
                    objectFit: "contain",
                  }}
                  className="h-[130px] w-[160px] md:h-[170px] md:w-[210px]"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}