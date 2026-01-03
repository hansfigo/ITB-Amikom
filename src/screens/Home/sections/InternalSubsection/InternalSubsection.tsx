import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { useAuth } from "../../../../context/AuthContext";

const educationLevels = [
  {
    id: "sarjana",
    icon: "/frame-427328204.png",
    title: "Sarjana",
    fields: [
      {
        name: "Seni Rupa Desain",
        color: "bg-[#ffae20]",
        opacity: "opacity-70",
      },
      { name: "Bisnis Manajemen", color: "bg-[#6aa0ca]", opacity: "" },
      { name: "Sains", color: "bg-[#10995e]", opacity: "opacity-70" },
      { name: "Engineering", color: "bg-[#ff7224]", opacity: "opacity-70" },
    ],
    programs: [
      {
        title: "Program Studi",
        items: [
          "Akuaria",
          "Astronomi",
          "Fisikia",
          "Kimia",
          "Matematika",
          "Desain Interior",
          "Desain Produk",
          "Kriya",
          "Seni Rupa",
          "Teknik Dirgantara",
          "Teknik Mesin",
          "Teknik Perminyakan",
          "Teknik Pertambangan",
        ],
      },
    ],
  },
  {
    id: "pascasarjana",
    icon: "/pascasarjana.png",
    title: "Pascasarjana",
    fields: [
      {
        name: "Seni Rupa Desain",
        color: "bg-[#ffae20]",
        opacity: "opacity-70",
      },
      { name: "Bisnis Manajemen", color: "bg-[#6aa0ca]", opacity: "" },
      { name: "Sains", color: "bg-[#10995e]", opacity: "opacity-70" },
      { name: "Engineering", color: "bg-[#ff7224]", opacity: "opacity-70" },
    ],
    programs: [
      {
        title: "Program Studi Magister",
        items: [
          "Sains Kebumian",
          "Teknik Air Tanah",
          "Teknik Geologi",
          "Akuaria",
          "Fisika",
          "Matematika",
        ],
      },
      {
        title: "Program Studi Doktor",
        items: [
          "Teknik Geologi",
          "Astronomi",
          "Kimia",
          "Fisika",
          "Teknik Dirgantara",
          "Teknik Mesin",
          "Teknik Geofisika",
        ],
      },
    ],
  },
  {
    id: "profesi",
    icon: "/profesi.png",
    title: "Profesi",
    fields: [
      { name: "Apoteker", color: "bg-[#ffae20]", opacity: "opacity-70" },
      { name: "Insinyur", color: "bg-[#6aa0ca]", opacity: "" },
    ],
    programs: [
      {
        title: "Program Studi",
        items: [
          "Apoteker",
          "Rekayasa Kehutanan",
          "Rekayasa Pertanian",
          "Teknik Geologi",
          "Teknik Geodesi dan Geomatika",
          "Teknik Pertambangan",
          "Teknik Perminyakan",
          "Teknik Geofisika",
          "Teknik Elektro",
        ],
      },
    ],
  },
];

const DecorativeBackground = () => (
  <div className="absolute top-[-22px] left-[179px] w-[354px] h-[414px] pointer-events-none">
    <div className="absolute top-[75px] left-[101px] w-[159px] h-[331px] rotate-[-135deg] bg-[linear-gradient(210deg,rgba(230,239,246,1)_0%,rgba(255,255,255,1)_100%)]" />
    <div className="absolute -top-2 left-[122px] w-1.5 h-[348px] rotate-[-135deg] bg-[linear-gradient(225deg,rgba(230,239,246,0.8)_0%,rgba(255,255,255,0.8)_100%)]" />
    <div className="absolute top-[193px] left-[59px] w-[45px] h-[45px] rounded-[22.3px] border border-solid border-[#b4e2f3] rotate-[-8.84deg] opacity-50" />
    <div className="absolute top-[5px] left-[145px] w-[77px] h-[77px] rounded-[38.26px] border border-solid border-[#b4e2f3] rotate-[-8.84deg] opacity-50" />
  </div>
);

export const InternalSubsection = (): JSX.Element => {
  const { user } = useAuth();

  if (user) {
    return <></>;
  }

  return (
    <section className="w-full bg-white py-[60px]">
      <div className="flex flex-col items-center gap-12 container mx-auto px-4">
        <h2 className="font-h5-bold font-[number:var(--h5-bold-font-weight)] text-[#333333] text-[length:var(--h5-bold-font-size)] tracking-[var(--h5-bold-letter-spacing)] leading-[var(--h5-bold-line-height)] [font-style:var(--h5-bold-font-style)] text-center">
          Tentukan Jenjang Pendidikan yang Kamu Inginkan
        </h2>

        <div className="flex items-start gap-6 w-full justify-center flex-wrap lg:flex-nowrap">
          {educationLevels.map((level) => (
            <Card
              key={level.id}
              className="w-full lg:w-[392px] bg-white rounded-[18px] shadow-blur-4px overflow-hidden"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex flex-col items-start justify-center gap-5 w-full">
                  <div className="flex flex-col items-start justify-center gap-3 w-full">
                    <button className="flex items-center gap-4 w-full rounded-lg hover:bg-gray-50 transition-colors">
                      {level.icon && (
                        <img
                          className="w-12 h-12 object-contain"
                          alt={level.title}
                          src={level.icon}
                        />
                      )}
                      {!level.icon && <div className="w-12 h-12" />}
                      <span className="flex-1 text-left font-h8-bold font-[number:var(--h8-bold-font-weight)] text-[#333333] text-[length:var(--h8-bold-font-size)] tracking-[var(--h8-bold-letter-spacing)] leading-[var(--h8-bold-line-height)] [font-style:var(--h8-bold-font-style)]">
                        {level.title}
                      </span>
                      <ChevronDownIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  <div className="w-full h-px bg-gray-200" />

                  <div className="flex flex-col items-start justify-center gap-2 w-full">
                    <h3 className="font-h11-bold font-[number:var(--h11-bold-font-weight)] text-[#333333] text-[length:var(--h11-bold-font-size)] tracking-[var(--h11-bold-letter-spacing)] leading-[var(--h11-bold-line-height)] [font-style:var(--h11-bold-font-style)]">
                      Cakupan Bidang Studi
                    </h3>
                    <div className="flex flex-wrap items-center gap-[10px] w-full">
                      {level.fields.map((field, index) => (
                        <Badge
                          key={index}
                          className={`${field.color} ${field.opacity} text-white hover:${field.color} px-2 py-1.5 rounded-lg font-body-text-14px-medium font-[number:var(--body-text-14px-medium-font-weight)] text-[length:var(--body-text-14px-medium-font-size)] tracking-[var(--body-text-14px-medium-letter-spacing)] leading-[var(--body-text-14px-medium-line-height)] [font-style:var(--body-text-14px-medium-font-style)]`}
                        >
                          {field.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 w-full flex-1">
                    {level.programs.map((program, programIndex) => (
                      <div
                        key={programIndex}
                        className="flex flex-col items-start gap-2 w-full"
                      >
                        <div className="relative flex flex-col items-start justify-center gap-2 w-full">
                          <DecorativeBackground />
                          <h3 className="font-h11-bold font-[number:var(--h11-bold-font-weight)] text-[#333333] text-[length:var(--h11-bold-font-size)] tracking-[var(--h11-bold-letter-spacing)] leading-[var(--h11-bold-line-height)] [font-style:var(--h11-bold-font-style)]">
                            {program.title}
                          </h3>
                          <p className="font-body-text-16px-regular font-[number:var(--body-text-16px-regular-font-weight)] text-[length:var(--body-text-16px-regular-font-size)] tracking-[var(--body-text-16px-regular-letter-spacing)] leading-[var(--body-text-16px-regular-line-height)] [font-style:var(--body-text-16px-regular-font-style)]">
                            {program.items.map((item, itemIndex) => (
                              <React.Fragment key={itemIndex}>
                                <a href={`/programs/${item.toLowerCase().replace(/\s+/g,'-')}`} className="text-brand hover:underline">{item}</a>
                                {itemIndex < program.items.length - 1 && (
                                  <span className="text-[#333333]">, </span>
                                )}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                        {programIndex < level.programs.length - 1 && (
                          <div className="h-5" />
                        )}
                      </div>
                    ))}
                    <a href="/programs" className="[font-family:'Inter',Helvetica] font-medium text-brand text-base text-center tracking-[0] leading-[22px] underline hover:text-brand/90 transition-colors">Lihat Program Studi Lainnya</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
