"use client"

interface BrandLogo {
  name: string
  logo: React.ReactNode
}

const LogoSvg = ({ children }: { children: React.ReactNode }) => children

const brands: BrandLogo[] = [
  {
    name: "DENKO",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="8" y="28" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#005BAC">DENKO</text></svg>,
  },
  {
    name: "Daikin",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="400" fill="#0085D0">Daikin</text></svg>,
  },
  {
    name: "MITSUBISHI ELECTRIC",
    logo: (
      <svg viewBox="0 0 150 40" className="h-8 w-auto">
        <polygon points="10,6 18,6 22,14 14,14" fill="#E60012" />
        <polygon points="14,14 22,14 26,22 18,22" fill="#E60012" />
        <polygon points="18,22 26,22 30,30 22,30" fill="#E60012" />
        <text x="38" y="27" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="#333" letterSpacing="1">MITSUBISHI ELECTRIC</text>
      </svg>
    ),
  },
  {
    name: "LG",
    logo: (
      <svg viewBox="0 0 100 40" className="h-8 w-auto">
        <circle cx="16" cy="20" r="14" fill="#A50034" />
        <text x="12" y="24" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" fill="white">L</text>
        <text x="40" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#333">LG</text>
      </svg>
    ),
  },
  {
    name: "SAMSUNG",
    logo: (
      <svg viewBox="0 0 140 40" className="h-8 w-auto">
        <ellipse cx="74" cy="20" rx="58" ry="16" fill="#1428A0" />
        <text x="40" y="25" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="3">SAMSUNG</text>
      </svg>
    ),
  },
  {
    name: "BOSCH",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="900" fill="#E2001A">BOSCH</text></svg>,
  },
  {
    name: "Toshiba",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fontStyle="italic" fill="#003DA5">TOSHIBA</text></svg>,
  },
  {
    name: "Panasonic",
    logo: <svg viewBox="0 0 160 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#007BC0">Panasonic</text></svg>,
  },
  {
    name: "Haier",
    logo: <svg viewBox="0 0 100 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="600" fill="#00A3E0">Haier</text></svg>,
  },
  {
    name: "Midea",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#005BAC">Midea</text></svg>,
  },
  {
    name: "GREE",
    logo: (
      <svg viewBox="0 0 110 40" className="h-8 w-auto">
        <rect x="4" y="6" width="32" height="28" rx="4" fill="#00A650" />
        <text x="9" y="25" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="white">G</text>
        <text x="44" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#00A650">GREE</text>
      </svg>
    ),
  },
  {
    name: "Hisense",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#00A3E0">Hisense</text></svg>,
  },
  {
    name: "Electrolux",
    logo: (
      <svg viewBox="0 0 150 40" className="h-8 w-auto">
        <rect x="4" y="8" width="24" height="24" rx="2" fill="#0073C6" />
        <text x="10" y="25" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="white">E</text>
        <text x="36" y="27" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" fill="#0073C6">Electrolux</text>
      </svg>
    ),
  },
  {
    name: "TCL",
    logo: (
      <svg viewBox="0 0 90 40" className="h-8 w-auto">
        <text x="6" y="28" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#E31E24">TCL</text>
      </svg>
    ),
  },
  {
    name: "Ballu",
    logo: (
      <svg viewBox="0 0 110 40" className="h-8 w-auto">
        <text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="300" fill="#00A3E0">Ballu</text>
      </svg>
    ),
  },
  {
    name: "Carrier",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" fill="#003DA5" letterSpacing="2">CARRIER</text></svg>,
  },
  {
    name: "Pioneer",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#000" letterSpacing="3">PIONEER</text></svg>,
  },
  {
    name: "ROYAL CLIMA",
    logo: (
      <svg viewBox="0 0 170 40" className="h-8 w-auto">
        <text x="6" y="23" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fontStyle="italic" fill="#B8860B">ROYAL</text>
        <text x="6" y="36" fontFamily="Georgia, serif" fontSize="12" fontWeight="700" fill="#333" letterSpacing="1">CLIMA</text>
      </svg>
    ),
  },
  {
    name: "Zanussi",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fontStyle="italic" fill="#003366">ZANUSSI</text></svg>,
  },
  {
    name: "LESSAR",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#005BAC">LESSAR</text></svg>,
  },
  {
    name: "CHIGO",
    logo: <svg viewBox="0 0 110 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fontStyle="italic" fill="#003399">CHIGO</text></svg>,
  },
  {
    name: "AUX",
    logo: <svg viewBox="0 0 90 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#003DA5" letterSpacing="3">AUX</text></svg>,
  },
  {
    name: "Neoclima",
    logo: <svg viewBox="0 0 140 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="300" fill="#00A3E0">Neoclima</text></svg>,
  },
  {
    name: "GENERAL CLIMATE",
    logo: <svg viewBox="0 0 200 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#005BAC">GENERAL CLIMATE</text></svg>,
  },
  {
    name: "DAHATSU",
    logo: <svg viewBox="0 0 140 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900" fill="#E60012">DAHATSU</text></svg>,
  },
  {
    name: "ROVEX",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fontStyle="italic" fill="#003399">ROVEX</text></svg>,
  },
  {
    name: "AKITA",
    logo: <svg viewBox="0 0 110 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#003399" letterSpacing="2">AKITA</text></svg>,
  },
  {
    name: "Centek",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#333">Centek</text></svg>,
  },
  {
    name: "WILDWIND",
    logo: <svg viewBox="0 0 150 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="600" fontStyle="italic" fill="#00A650">Wildwind</text></svg>,
  },
  {
    name: "ADIR",
    logo: <svg viewBox="0 0 100 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#005BAC" letterSpacing="2">ADIR</text></svg>,
  },
  {
    name: "AERONIK",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#0085D0">AERONIK</text></svg>,
  },
  {
    name: "AKIRA",
    logo: <svg viewBox="0 0 110 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="17" fontWeight="900" fontStyle="italic" fill="#E60012" letterSpacing="2">AKIRA</text></svg>,
  },
  {
    name: "AKSA",
    logo: <svg viewBox="0 0 100 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#003399">AKSA</text></svg>,
  },
  {
    name: "ALPINA",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="300" fontStyle="italic" fill="#00A3E0">Alpina</text></svg>,
  },
  {
    name: "DIGICOM",
    logo: <svg viewBox="0 0 140 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#79BD18">DIGICOM</text></svg>,
  },
  {
    name: "Ascenti",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#333">Ascenti</text></svg>,
  },
  {
    name: "AURORA",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#E2001A" letterSpacing="2">AURORA</text></svg>,
  },
  {
    name: "AXIOMA",
    logo: <svg viewBox="0 0 130 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#000" letterSpacing="3">AXIOMA</text></svg>,
  },
  {
    name: "BIMAR",
    logo: <svg viewBox="0 0 110 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="#005BAC">BIMAR</text></svg>,
  },
  {
    name: "BREEZE",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="300" fontStyle="italic" fill="#00A650">Breeze</text></svg>,
  },
  {
    name: "CLIMAVENETA",
    logo: <svg viewBox="0 0 180 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#005BAC">Climaveneta</text></svg>,
  },
  {
    name: "CLIMER",
    logo: <svg viewBox="0 0 120 40" className="h-8 w-auto"><text x="6" y="27" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fontStyle="italic" fill="#003399">CLIMER</text></svg>,
  },
]

export function BrandsMarquee() {
  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container-main">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Наши бренды-партнёры</h3>
      </div>
      <div className="relative">
        <div className="flex items-center gap-8 marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="shrink-0 flex items-center justify-center h-14 px-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee-track {
          animation: marquee 80s linear infinite;
          width: fit-content;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
