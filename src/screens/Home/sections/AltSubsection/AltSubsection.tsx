import React, { useMemo, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/home/separator";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const academicScheduleData = [
  {
    date: "20 Mei - 4 Jun 2024",
    description:
      "Pengisian Kuesioner Evaluasi Perkuliahan Semester II-2023/2024",
  },
  {
    date: "20 Mei - 20 Jun 2024",
    description:
      "Periode Pembukaan Kelas/Mata Kuliah Semester Pendek 2023/2024 oleh Program Studi",
  },
  {
    date: "22 Mei 2024",
    description:
      "Batas Waktu Pemenuhan Persyaratan Administrasi Kelulusan untuk Yudisium Mei 2024",
  },
  {
    date: "24 Mei 2024",
    description: "Hari Terakhir Masa Kuliah Semester II-2023/2024",
  },
];

const academicServicesData = [
  {
    title: "Dokumen Kemahasiswaan",
    icon: true,
    icon_path : "/dokumen-kemahasiswaan-icon.png",
  },
  {
    title: "Dokumen Wisuda",
    icon: true,
    icon_path : "/dokumen-wisuda-icon.png",
  },
  {
    title: "Dokumen Registrasi dan Aktivasi Akun",
    icon: true,
    icon_path : "/dokumen-registrasi-icon.png",
  },
  {
    title: "Dokumen Alumni",
    icon: true,
    icon_path : "/dokumen-alumni-icon.png",
  },
];

export const AltSubsection = (): JSX.Element => {
  const { user } = useAuth();

  const programTabs = ["Spesialisasi", "Minor", "Double Major", "Multidisiplin"];
  const [activeTab, setActiveTab] = useState(0);

  const programCards = useMemo(
    () => [
      {
        title: "Struktur Lepas Pantai",
        level: "Sarjana",
        faculty: "FTSL",
        major: "Teknik Kelautan",
        to: "/programs/sarjana/spesialisasi/struktur-lepas-pantai",
      },
      {
        title: "Teknik Pantai dan Kawasan Pesisir",
        level: "Sarjana",
        faculty: "FTSL",
        major: "Teknik Kelautan",
      },
      {
        title: "Pelabuhan, Transportasi Laut dan Logistik",
        level: "Sarjana",
        faculty: "FTSL",
        major: "Teknik Kelautan",
      },
    ],
    [],
  );

  if (!user) {
    return (
      <section className="w-full bg-white py-[60px]">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-12 flex-1">
            <h2 className="font-h5-bold font-[number:var(--h5-bold-font-weight)] text-[#3d3d3d] text-[length:var(--h5-bold-font-size)] tracking-[var(--h5-bold-letter-spacing)] leading-[var(--h5-bold-line-height)] [font-style:var(--h5-bold-font-style)]">
              Jadwal Akademik 2023/2024
            </h2>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {academicScheduleData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex gap-3">
                      <div className="w-[210px] flex-shrink-0">
                        <div className="font-h10-bold font-[number:var(--h10-bold-font-weight)] text-[#333333] text-[length:var(--h10-bold-font-size)] tracking-[var(--h10-bold-letter-spacing)] leading-[var(--h10-bold-line-height)] [font-style:var(--h10-bold-font-style)]">
                          {item.date}
                        </div>
                      </div>
                      <div className="flex-1 font-body-text-16px-regular font-[number:var(--body-text-16px-regular-font-weight)] text-[#4c4c4c] text-[length:var(--body-text-16px-regular-font-size)] tracking-[var(--body-text-16px-regular-letter-spacing)] leading-[var(--body-text-16px-regular-line-height)] [font-style:var(--body-text-16px-regular-font-style)]">
                        {item.description}
                      </div>
                    </div>
                    {index < academicScheduleData.length - 1 && (
                      <Separator className="bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Button
                variant="outline"
                className="h-auto px-4 py-4 rounded-[100px] border-[#069dd8] text-[#069dd8] hover:bg-[#069dd8] hover:text-white font-medium text-base w-fit"
              >
                Semua Jadwal Akademik
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-12 w-full lg:w-[494px]">
            <h2 className="font-h5-bold font-[number:var(--h5-bold-font-weight)] text-[#3d3d3d] text-[length:var(--h5-bold-font-size)] tracking-[var(--h5-bold-letter-spacing)] leading-[var(--h5-bold-line-height)] [font-style:var(--h5-bold-font-style)]">
              Layanan Akademik Kampus XYZ
            </h2>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {academicServicesData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="w-7 h-7 flex-shrink-0">
                        <img
                          className="w-full h-full object-contain"
                          alt="Service icon"
                          src={item.icon_path}
                        />
                      </div>
                      <div className="flex-1 font-h10-semibold font-[number:var(--h10-semibold-font-weight)] text-[#333333] text-[length:var(--h10-semibold-font-size)] tracking-[var(--h10-semibold-letter-spacing)] leading-[var(--h10-semibold-line-height)] [font-style:var(--h10-semibold-font-style)]">
                        {item.title}
                      </div>
                    </div>
                    {index < academicServicesData.length - 1 && (
                      <Separator className="bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Button
                variant="outline"
                className="h-auto px-4 py-4 rounded-[100px] border-[#069dd8] text-[#069dd8] hover:bg-[#069dd8] hover:text-white font-medium text-base w-fit"
              >
                Semua Layanan Akademik
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-[60px]">
      <div className="container mx-auto px-4 flex flex-col gap-12">
        <div className="flex flex-col gap-12">
          <h2 className="font-h5-bold font-[number:var(--h5-bold-font-weight)] text-[#3d3d3d] text-[length:var(--h5-bold-font-size)] tracking-[var(--h5-bold-letter-spacing)] leading-[var(--h5-bold-line-height)] [font-style:var(--h5-bold-font-style)]">
            Jadwal Akademik 2023/2024
          </h2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {academicScheduleData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex gap-3">
                    <div className="w-[210px] flex-shrink-0">
                      <div className="font-h10-bold font-[number:var(--h10-bold-font-weight)] text-[#333333] text-[length:var(--h10-bold-font-size)] tracking-[var(--h10-bold-letter-spacing)] leading-[var(--h10-bold-line-height)] [font-style:var(--h10-bold-font-style)]">
                        {item.date}
                      </div>
                    </div>
                    <div className="flex-1 font-body-text-16px-regular font-[number:var(--body-text-16px-regular-font-weight)] text-[#4c4c4c] text-[length:var(--body-text-16px-regular-font-size)] tracking-[var(--body-text-16px-regular-letter-spacing)] leading-[var(--body-text-16px-regular-line-height)] [font-style:var(--body-text-16px-regular-font-style)]">
                      {item.description}
                    </div>
                  </div>
                  {index < academicScheduleData.length - 1 && (
                    <Separator className="bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="outline"
              className="h-auto px-4 py-4 rounded-[100px] border-[#069dd8] text-[#069dd8] hover:bg-[#069dd8] hover:text-white font-medium text-base w-fit"
            >
              Semua Jadwal Akademik
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[28px] leading-8 font-bold text-[#222222]">
              Jelajahi Skema <span className="text-[#0660a6]">Program</span> Akademik Kampus XYZ
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Kuasai suatu topik secara mendalam dan jadilah profesional yang menciptakan inovasi untuk masa depan
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            {programTabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === idx ? "text-[#0660a6] border-[#0660a6]" : "text-gray-500 border-transparent hover:text-[#0660a6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2 items-stretch">
            {programCards.map((card) => {
              const content = (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-4 flex flex-col justify-between gap-4 h-full"
                >
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex items-center w-fit rounded-full bg-[#f7f9ff] text-[#f09b00] text-xs font-semibold px-3 py-1 border border-[#fbe3ba]">
                      {card.level}
                    </span>
                    <div className="text-base font-semibold text-[#222222] leading-snug">{card.title}</div>
                    <div className="text-xs text-gray-600 leading-relaxed space-y-1">
                      <div>{card.faculty}</div>
                      <div>{card.major}</div>
                    </div>
                  </div>
                  <Button className="rounded-full bg-[#069dd8] hover:bg-[#0660a6] text-white font-semibold">
                    Daftar Sekarang
                  </Button>
                </div>
              );

              return card.to ? (
                <Link key={card.title} to={card.to} className="block h-full">
                  {content}
                </Link>
              ) : (
                content
              );
            })}

            <div className="bg-gradient-to-br from-[#0c7bc7] to-[#0660a6] text-white rounded-2xl p-6 flex flex-col justify-between shadow-[0_18px_52px_rgba(6,96,166,0.25)] h-full min-h-[260px]">
              <div className="text-lg font-semibold">Semua Program Spesialisasi</div>
              <div className="mt-6">
                <Button variant="secondary" className="rounded-full px-5 py-2 bg-white text-[#0660a6] font-semibold shadow hover:bg-slate-50">
                  Lihat Program →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
