const caseTexts = [
  "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
  "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
  "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
];

function Highlight({ text }: { text: string }) {
  return (
    <span
      style={{
        backgroundColor: "#B9FF66",
        borderRadius: "7px",
        padding: "2px 8px",
      }}
    >
      {text}
    </span>
  );
}

function LearnMoreLink() {
  return (
    <a
      href="#"
      style={{
        color: "#B9FF66",
        fontSize: "18px",
        fontWeight: 500,
        marginTop: "20px",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      Learn more
      <span
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "999px",
          border: "1px solid #B9FF66",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 11L11 3M5 3H11V9"
            stroke="#B9FF66"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export default function CaseStudies() {
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
            className="flex items-center gap-2 text-[28px] md:text-[40px]"
          >
            <Highlight text="Case" /> <Highlight text="Studies" />
          </h2>

          <p
            style={{
              color: "#191A23",
              fontSize: "18px",
              lineHeight: 1.5,
              maxWidth: "580px",
            }}
          >
            Explore Real-Life Examples of Our Proven Digital Marketing Success
            through Our Case Studies
          </p>
        </div>

        <div
          style={{
            background: "#191A23",
            borderRadius: "45px",
          }}
          className="p-8 md:px-[60px] md:py-[70px]"
        >
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_1px_1fr_1px_1fr]">
            {caseTexts.map((text, index) => (
              <div key={`case-item-${index}`} className="contents">
                <article className="py-8 md:px-16 md:py-0">
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontSize: "18px",
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {text}
                  </p>

                  <LearnMoreLink />
                </article>

                {index < caseTexts.length - 1 ? (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      alignSelf: "stretch",
                    }}
                    className="h-px w-full md:h-auto md:w-px"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}