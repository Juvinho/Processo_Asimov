import type { CSSProperties } from "react";

const primaryButtonStyle: CSSProperties = {
  background: "#191A23",
  color: "#FFFFFF",
  borderRadius: "100px",
  padding: "20px 35px",
  fontSize: "20px",
  fontWeight: 500,
  border: "1px solid #191A23",
  boxShadow: "0px 5px 0px 0px #191A23",
  lineHeight: 1,
};

export default function CTABanner() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[100px]">
        <div
          style={{
            background: "#F3F3F3",
            borderRadius: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
          className="flex-col p-8 md:flex-row md:p-[60px]"
        >
          <div style={{ maxWidth: "500px" }}>
            <h3
              style={{
                color: "#191A23",
                fontSize: "30px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Let&apos;s make things happen
            </h3>

            <p
              style={{
                color: "#191A23",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: 1.5,
                marginTop: "26px",
              }}
            >
              Contact us today to learn more about how our digital marketing
              services can help your business grow and succeed online.
            </p>

            <button type="button" style={{ ...primaryButtonStyle, marginTop: "26px" }}>
              Get your free proposal
            </button>
          </div>

          <img
            src="/things-happen.png"
            alt="Decorative illustration"
            style={{ width: "350px", height: "auto" }}
            className="hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}