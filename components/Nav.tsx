const navLinks = ["About us", "Services", "Use Cases", "Pricing", "Blog"];

function LogoMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 1.5L14.7 9.3L22.5 12L14.7 14.7L12 22.5L9.3 14.7L1.5 12L9.3 9.3L12 1.5Z"
        fill="#191A23"
      />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="w-full">
      <div className="mx-auto h-20 w-full max-w-[1240px] px-5 md:px-[100px]">
        <nav className="flex h-full items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark />
            <span
              style={{
                color: "#191A23",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Positivus
            </span>
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    color: "#191A23",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="hidden md:inline-flex"
            style={{
              background: "transparent",
              color: "#191A23",
              border: "1px solid #191A23",
              borderRadius: "100px",
              padding: "20px 35px",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Request a quote
          </button>
        </nav>
      </div>
    </header>
  );
}