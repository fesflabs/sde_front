export function FooterVisual() {
  return (
    <div className="absolute bottom-0 left-0 w-full leading-[0]">
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        /* h-60: Define uma altura maior para mobile (ajuste o valor conforme desejar).
           md:h-auto: Mantém a proporção original em telas maiores.
        */
        className="h-40 w-full md:h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#97D3B9" />
            <stop offset="100%" stopColor="#8A91BF" />
          </linearGradient>
        </defs>
        <path
          fillOpacity="0.5"
          fill="url(#footer-gradient)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <path
          fillOpacity="0.7"
          fill="url(#footer-gradient)"
          d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
