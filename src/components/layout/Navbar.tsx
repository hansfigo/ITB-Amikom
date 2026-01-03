import { ChevronDownIcon, LogOut, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const topNavLinks = [{ label: "Berita dan Acara", link: "/news" }, { label: "Hubungi Kami", link: "/contact" }];

const mainNavItems = [
  { label: "Program", hasDropdown: true },
  { label: "Akademik", hasDropdown: true },
  { label: "Kemahasiswaan", hasDropdown: true },
];

type ProgramDropdown = {
  title: string;
  description: string;
  programs: {
    xyz: string[];
    international: string[];
  };
  link: string;
};

const programDropdownData: Record<string, ProgramDropdown> = {
  sarjana: {
    title: "Sarjana",
    description: "Jenjang pendidikan awal bagi lulusan sekolah menengah atas, ditempuh dalam waktu 4 tahun.",
    programs: {
      xyz: ["spesialisasi", "minor", "double-major", "multidisiplin"],
      international: [],
    },
    link: "/programs/sarjana/spesialisasi"
  },
  pascasarjana: {
    title: "Pascasarjana",
    description: "Jenjang pendidikan lanjutan yang mencakup program magister (2 tahun) dan doktor (3 tahun).",
    programs: {
      xyz: ["minor", "multidisiplin"],
      international: [],
    },
    link: "/programs/pascasarjana/multidisiplin"
  },
  profesi: {
    title: "Profesi",
    description: "Jenjang pendidikan tinggi yang berfokus pada keahlian khusus setelah sarjana.",
    programs: {
      xyz: [],
      international: [],
    },
    link: "/"
  }
};

export const Navbar = (): JSX.Element => {
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const [isAkademikOpen, setIsAkademikOpen] = useState(false);
  const [isKemahasiswaanOpen, setIsKemahasiswaanOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const quickLinksRef = useRef<HTMLDivElement | null>(null);
  const [quickLinksPos, setQuickLinksPos] = useState<{ left: number; top: number } | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const calculateQuickLinksPos = () => {
    const el = quickLinksRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const left = rect.left + rect.width / 2; // center
    const top = rect.bottom + 8; // 8px gap
    return { left, top };
  };

  const toggleQuickLinks = () => {
    // close other menus then toggle quick links
    setIsProgramDropdownOpen(false);
    setIsAkademikOpen(false);
    setIsKemahasiswaanOpen(false);
    setIsProfileOpen(false);
    setIsLangOpen(false);
    setIsQuickLinksOpen((v) => {
      const next = !v;
      if (next) {
        // compute position immediately
        const pos = calculateQuickLinksPos();
        setQuickLinksPos(pos);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isQuickLinksOpen) return;
    const onResize = () => setQuickLinksPos(calculateQuickLinksPos());
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [isQuickLinksOpen]);

  useEffect(() => {
    if (!user) {
      setIsProfileOpen(false);
    }
  }, [user]);

  // Portal renderer for quick links
  const QuickLinksPortal = ({ pos }: { pos: { left: number; top: number } | null }) => {
    if (!isQuickLinksOpen || !pos) return null;
    const style: React.CSSProperties = {
      position: "fixed",
      left: pos.left,
      top: pos.top,
      transform: "translateX(-50%)",
      zIndex: 9999,
    };

    const content = (
      <div style={style}>
        <div className="bg-white rounded-[20px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] p-4 w-[320px] border border-gray-100">
          <nav className="flex flex-col gap-2">
            <a href="/external/six" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded">
              <img src="/icons/six.svg" alt="SIX" className="w-6 h-6" />
              <span className="text-sm text-gray-800">SIX XYZ</span>
            </a>
            <a href="/external/edunex" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded">
              <img src="/icons/edunex.svg" alt="Edunex" className="w-6 h-6" />
              <span className="text-sm text-gray-800">Edunex LMS XYZ</span>
            </a>
            <a href="/admission" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded">
              <img src="/icons/admission.svg" alt="Admission" className="w-6 h-6" />
              <span className="text-sm text-gray-800">Admission XYZ</span>
            </a>
            <a href="/continuing" className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded">
              <img src="/icons/continuing.svg" alt="Continuing" className="w-6 h-6" />
              <span className="text-sm text-gray-800">Continuing &amp; Professional Education</span>
            </a>
          </nav>
        </div>
      </div>
    );

    return createPortal(content, document.body);
  };

  const closeAll = () => {
    setIsProgramDropdownOpen(false);
    setIsAkademikOpen(false);
    setIsKemahasiswaanOpen(false);
    setIsProfileOpen(false);
    setIsQuickLinksOpen(false);
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAll();
    navigate("/");
  };

  return (
    <nav className="w-full inline-flex flex-col items-start relative">
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col w-full items-end justify-center gap-2.5 px-[71px] py-2.5 bg-[#0660a6] border-b-[0.6px] [border-bottom-style:solid] border-[#cccccc]">
          <div className="inline-flex items-center justify-end gap-2.5 w-full container">
            <div className="flex w-full items-center gap-2.5">
              <div className="flex items-center gap-1 flex-1" />

              <div className="inline-flex items-center justify-center gap-6">
                {topNavLinks.map((link, index) => (
                  <Link
                    to={link.link}
                    key={index}
                    className="font-body-text-14px-regular font-[number:var(--body-text-14px-regular-font-weight)] text-white text-[length:var(--body-text-14px-regular-font-size)] text-center tracking-[var(--body-text-14px-regular-letter-spacing)] leading-[var(--body-text-14px-regular-line-height)] [font-style:var(--body-text-14px-regular-font-style)] hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="inline-flex items-center gap-3">
                  {/* Language selector (flag image) - placed left of Quick Links */}
                  <div className="relative">
                    <button
                      className="inline-flex items-center gap-2 px-2 py-1 bg-transparent text-white rounded hover:opacity-90"
                      onClick={() => {
                        setIsLangOpen(!isLangOpen);
                        setIsQuickLinksOpen(false);
                      }}
                    >
                      <img src="/flags/id.svg" alt="ID" className="w-5 h-4 object-cover" />
                      <ChevronDownIcon className="w-4 h-4 text-white" />
                    </button>

                    {isLangOpen && (
                      <div className="absolute right-0 mt-3 z-50">
                        <div className="bg-white rounded-xl shadow-md p-3 w-36 border border-gray-100">
                          <nav className="flex flex-col">
                            <button className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50" onClick={() => { /* switch to EN logic */ closeAll(); }}>
                              <img src="/flags/gb.svg" alt="EN" className="w-5 h-4 object-cover" />
                              <span className="text-sm font-medium">EN</span>
                            </button>
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Links pill (top-bar) with icons in floating menu */}
                  <div
                    ref={quickLinksRef}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-[100px] shadow-blur-7px cursor-pointer hover:opacity-90 transition-opacity relative"
                    onClick={() => toggleQuickLinks()}
                  >
                    <div className="flex items-center justify-center font-[number:var(--body-text-14px-regular-font-weight)] text-[#333333] text-[length:var(--body-text-14px-regular-font-size)] font-body-text-14px-regular text-center tracking-[var(--body-text-14px-regular-letter-spacing)] leading-[var(--body-text-14px-regular-line-height)] [font-style:var(--body-text-14px-regular-font-style)]">
                      Quick Links
                    </div>

                    <ChevronDownIcon className="w-5 h-5 text-[#333333]" />

                    {/* Quick Links dropdown rendered into portal (see below) */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-20 items-center justify-center gap-2.5 bg-white shadow-shadow-blur-2px">
          <div className="flex w-full container items-center justify-between px-4">
            <Link
              to={"/"}
            >
              <div className="inline-flex items-center gap-2">
                <div className="inline-flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#005aab] rounded-[28px]" />

                  <div className="[font-family:'Inter',Helvetica] font-semibold text-[#333333] text-sm tracking-[0] leading-5">
                    Akademik dan Kemahasiswaan
                    <br />
                    Kampus XYZ
                  </div>
                </div>
              </div>
            </Link>

            <div className="inline-flex items-center justify-end gap-5">
              <div className="inline-flex items-center gap-4 relative">
                {mainNavItems.map((item, index) => (
                  <div key={index} className="relative">
                    <button
                      className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                      onClick={() => {
                        // Toggle the clicked menu and close others
                        if (item.label === "Program") {
                          setIsProgramDropdownOpen(!isProgramDropdownOpen);
                          setIsAkademikOpen(false);
                          setIsKemahasiswaanOpen(false);
                          setIsProfileOpen(false);
                        }

                        if (item.label === "Akademik") {
                          setIsAkademikOpen(!isAkademikOpen);
                          setIsProgramDropdownOpen(false);
                          setIsKemahasiswaanOpen(false);
                          setIsProfileOpen(false);
                        }

                        if (item.label === "Kemahasiswaan") {
                          setIsKemahasiswaanOpen(!isKemahasiswaanOpen);
                          setIsProgramDropdownOpen(false);
                          setIsAkademikOpen(false);
                          setIsProfileOpen(false);
                        }
                      }}
                    >
                      <div className="font-body-text-16px-regular font-[number:var(--body-text-16px-regular-font-weight)] text-[#333333] text-[length:var(--body-text-16px-regular-font-size)] text-center tracking-[var(--body-text-16px-regular-letter-spacing)] leading-[var(--body-text-16px-regular-line-height)] whitespace-nowrap [font-style:var(--body-text-16px-regular-font-style)]">
                        {item.label}
                      </div>

                      {item.hasDropdown && (
                        <ChevronDownIcon className={`w-6 h-6 text-[#333333] transition-transform ${item.label === "Program" && isProgramDropdownOpen ? "rotate-180" : ""
                          }`} />
                      )}
                    </button>

                    {/* Program Dropdown */}
                    {item.label === "Program" && isProgramDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50">
                        <div className="bg-white rounded-[20px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] p-6 w-[850px] border border-gray-100">
                          <div className="grid grid-cols-3 gap-6">
                            {Object.entries(programDropdownData).map(([key, program]) => (
                              <div key={key} className="flex flex-col border-r border-gray-100 last:border-r-0 pr-6 last:pr-0">
                                <Link
                                  to={program.link}
                                  className="group mb-3"
                                  onClick={() => setIsProgramDropdownOpen(false)}
                                >
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-[#069dd8] font-semibold text-lg group-hover:underline">
                                      {program.title}
                                    </h3>
                                    <svg className="w-4 h-4 text-[#069dd8] group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                </Link>

                                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                  {program.description}
                                </p>

                                <div className="gap-4 flex justify-start items-start">
                                  {program.programs.xyz.length > 0 && (
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-500 mb-1">Program xyz</h4>
                                      <div className="space-y-1">
                                        {program.programs.xyz.map((prog, idx) => (
                                          <Link key={idx} to={`/programs/${key}/${prog}`} className="text-xs text-gray-700 hover:text-[#069dd8] cursor-pointer transition-colors block">
                                            {prog.replace(/-/g, " ")}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {program.programs.international.length > 0 && (
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-500 mb-1">Program Internasional</h4>
                                      <div className="space-y-1">
                                        {program.programs.international.map((prog, idx) => (
                                          <Link key={idx} to={`/programs/${key}/${prog}`} className="text-xs text-gray-700 hover:text-[#069dd8] cursor-pointer transition-colors block">
                                            {prog.replace(/-/g, " ")}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <Link
                                  to="/programs"
                                  className="text-[#069dd8] text-xs font-medium mt-3 hover:underline inline-block"
                                  onClick={() => setIsProgramDropdownOpen(false)}
                                >
                                  Lihat Semua Program Studi
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Akademik Dropdown */}
                    {item.label === "Akademik" && isAkademikOpen && (
                      <div className="absolute top-full left-0 mt-2 z-50">
                        <div className="bg-white rounded-xl shadow-md p-3 w-52 border border-gray-100">
                          <nav className="flex flex-col gap-1">
                            <Link to="/akademik/kurikulum" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Kurikulum</span>
                            </Link>
                            <Link to="/akademik/program-studi" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Program Studi</span>
                            </Link>
                            <Link to="/akademik/accreditation" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Akreditasi</span>
                            </Link>
                          </nav>
                        </div>
                      </div>
                    )}

                    {/* Kemahasiswaan Dropdown */}
                    {item.label === "Kemahasiswaan" && isKemahasiswaanOpen && (
                      <div className="absolute top-full left-0 mt-2 z-50">
                        <div className="bg-white rounded-xl shadow-md p-3 w-56 border border-gray-100">
                          <nav className="flex flex-col gap-1">
                            <Link to="/kemahasiswaan/beasiswa" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Beasiswa & Bantuan</span>
                            </Link>
                            <Link to="/kemahasiswaan/organisasi" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Organisasi Mahasiswa</span>
                            </Link>
                            <Link to="/kemahasiswaan/kegiatan" onClick={closeAll} className="block px-2 py-1 rounded hover:bg-gray-50">
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Kegiatan & Event</span>
                            </Link>
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center justify-end gap-3">
                {!user && (
                  <Link
                    to="/login"
                    className="rounded-full border border-[#069dd8] text-[#069dd8] px-5 py-2 font-medium hover:bg-[#069dd8]/10 transition-colors"
                    onClick={closeAll}
                  >
                    Login
                  </Link>
                )}

                {user && (
                  <div className="inline-flex items-center justify-end gap-4">
                    {/* Profile Section */}
                    <div className="relative">
                      <button className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => {
                        // close quick links & lang when opening profile to avoid overlap
                        setIsQuickLinksOpen(false);
                        setIsLangOpen(false);
                        setIsProfileOpen(!isProfileOpen);
                        setIsProgramDropdownOpen(false);
                        setIsAkademikOpen(false);
                        setIsKemahasiswaanOpen(false);
                      }}>
                        <img
                          src="/frame-427322943-1.png"
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center';
                            fallback.innerHTML = '<span class="text-gray-600 font-semibold text-sm">IM</span>';
                            target.parentElement?.appendChild(fallback);
                          }}
                        />

                        <div className="flex flex-col items-start">
                          <div className="font-semibold text-[#333333] text-sm">{user.name}</div>
                          <div className="text-xs text-[#808080]">{user.major}</div>
                        </div>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-3 z-50">
                          <div className="bg-white rounded-xl shadow-md p-3 w-44 border border-gray-100">
                            <Link to="/profile" onClick={closeAll} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-50">
                              <User className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700 hover:text-brand transition-colors">Profil Saya</span>
                            </Link>

                            <button onClick={() => handleLogout()} className="w-full text-left flex items-center gap-2 px-2 py-2 mt-1 rounded hover:bg-red-50">
                              <LogOut className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-600">Keluar</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {
        (isProgramDropdownOpen || isAkademikOpen || isKemahasiswaanOpen || isProfileOpen || isQuickLinksOpen || isLangOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => closeAll()}
          />
        )
      }

      {/* Portal-rendered Quick Links dropdown (position computed from pill) */}
      <QuickLinksPortal pos={quickLinksPos} />
    </nav >
  );
};
