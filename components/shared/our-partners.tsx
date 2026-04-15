"use client";

const companies = [
  {
    name: "Facebook",
    logo: "https://i.pinimg.com/originals/68/1d/da/681dda9fbe146ce9859082506a10b41e.png",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/960px-Google_2015_logo.svg.png",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
  },
  {
    name: "Spotify",
    logo: "https://t4.ftcdn.net/jpg/05/40/91/61/360_F_540916117_1GCgjToslnZoMDc1UEUUuKjGV6bYUsWW.jpg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Alibaba",
    logo: "https://s.yimg.com/os/en/us.finance.gurufocus/568a0ae2bcba0ce9fbd06e691db9f39e",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Microsoft",
    logo: "https://msftstories.thesourcemediaassets.com/sites/213/2019/09/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1920px-Meta_Platforms_Inc._logo.svg.png",
  },
  {
    name: "Uber",
    logo: "https://e7.pngegg.com/pngimages/710/321/png-clipart-uber-uber.png",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/1280px-Airbnb_Logo_Bélo.svg.png",
  },
  {
    name: "PayPal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    name: "Discord",
    logo: "https://static.wixstatic.com/media/0bd445_475f1adb20d14068a4166333e4112c3d~mv2.png/v1/fill/w_3840,h_2160,al_c/Discord-logo.png",
  },
  {
    name: "GitHub",
    logo: "https://static.vecteezy.com/system/resources/previews/016/833/880/large_2x/github-logo-git-hub-icon-with-text-on-white-background-free-vector.jpg",
  },
  {
    name: "LinkedIn",
    logo: "https://t3.ftcdn.net/jpg/13/94/40/96/360_F_1394409647_JAgwAZeTDf10f0Q3iXRLy7a6vRUMJM3E.jpg",
  },
];

export default function OurPartners() {
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by global brands
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden py-5">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0b0f14] dark:via-[#0b0f14]/80 dark:to-transparent md:w-24" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0b0f14] dark:via-[#0b0f14]/80 dark:to-transparent md:w-24" />

          <div className="marquee flex w-max items-center gap-5 md:gap-8">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="group flex h-[72px] min-w-[150px] items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-5 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5 md:h-[84px] md:min-w-[180px] md:px-6"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain opacity-80 grayscale transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 md:h-10"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group flex h-[88px] items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5 md:h-[96px]"
            >
              <img
                src={company.logo}
                alt={company.name}
                width={130}
                height={44}
                className="max-h-10 w-auto object-contain opacity-80 grayscale transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 50s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
