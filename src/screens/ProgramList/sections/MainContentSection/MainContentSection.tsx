import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Separator } from "../../../../components/ui/home/separator";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { useProgram } from "../../programContext";

const programTypes = [
  { id: "spesialisasi", label: "Spesialisasi", checked: true },
  { id: "minor", label: "Minor", checked: false },
  { id: "double-major", label: "Double Major", checked: false },
  { id: "multidisiplin", label: "Multidisiplin", checked: false },
];

const faculties = [
  { id: "fKampus XYZ", label: "Fakultas Ilmu dan Teknologi Kebumian (FKampus XYZ)", checked: true },
  { id: "fmipa", label: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)", checked: false },
  { id: "fsrd", label: "Fakultas Seni Rupa dan Desain (FSRD)", checked: false },
  { id: "fti", label: "Fakultas Teknologi Industri (FTI)", checked: false },
  { id: "ftmd", label: "Fakultas Teknik Mesin dan Dirgantara (FTMD)", checked: false },
];

const studyPrograms = [
  { id: "all", label: "Pilih Semua", checked: true },
  { id: "meteorologi", label: "Meteorologi", checked: true },
  { id: "oseanografi", label: "Oseanografi", checked: true },
  { id: "geodesi", label: "Teknik Geodesi dan Geomatika", checked: true },
  { id: "geologi", label: "Teknik Geologi", checked: true },
];

// Programs grouped by type. UI expects a `programs` variable, so we derive it
// from `programFilter` later so existing render code doesn't need changes.
const programsByType: Record<string, Array<{ title: string; faculty: string; department?: string, slug? : string }>> = {
  "spesialisasi": [
    { title: "Struktur Lepas Pantai", faculty: "FTSL", department: "Teknik Kelautan", slug: "struktur-lepas-pantai" },
    { title: "Teknik Pantai dan Kawasan Pesisir", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Pelabuhan, Transportasi Laut dan Logistik", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Lingkungan Laut, Reklamasi dan Pengerukan", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Teknik Geodesi Terapan", faculty: "FKampus XYZ", department: "Teknik Geodesi dan Geomatika" },
    { title: "Teknik Geologi Terapan", faculty: "FKampus XYZ", department: "Teknik Geologi" },
    { title: "Pelabuhan dan Transportasi Laut", faculty: "FKampus XYZ", department: "Oseanografi" },
    { title: "Rekayasa Pantai dan Pesisir", faculty: "FKampus XYZ", department: "Meteorologi" },
  ],

  "minor": [
    { title: "Fisika Bangunan", faculty: "FTI", department: "Teknik Fisika", slug: "fisika-bangunan" },
    { title: "Material Maju", faculty: "FTI", department: "Teknik Fisika" },
    { title: "Industry 4.0", faculty: "FTI", department: "Teknik Fisika" },
    { title: "Instrumentasi & Kontrol", faculty: "FTI", department: "Teknik Fisika" },
    { title: "Perencanaan Wilayah & Kota", faculty: "SAPPK", department: "Perencanaan Wilayah & kota" },
    { title: "Kimia Organik", faculty: "FMIPA", department: "Kimia" },
    { title: "Biokimia Umum", faculty: "FMIPA", department: "Kimia" },
    { title: "Kimia Analitik", faculty: "FMIPA", department: "Kimia" },
    { title: "Teknologi Nano", faculty: "FKampus XYZ", department: "Meteorologi" },
  ],

  "double-major": [
    { title: "Teknik Lingkungan", faculty: "FTMD", department: "Teknik Lingkungan", slug: "teknik-lingkungan" },
    { title: "Teknik Elektro", faculty: "STEI", department: "Teknik Elektro" },
    { title: "Teknik Material", faculty: "FTMD", department: "Teknik Material" },
    { title: "Teknik Mesin", faculty: "FTMD", department: "Teknik Mesin" },
    { title: "Teknik Geofisika", faculty: "FTTM", department: "Teknik Geofisika" },
    { title: "Kewirausahaan", faculty: "SBM", department: "Manajemen" },
    { title: "Teknik Sipil", faculty: "FTSL", department: "Teknik Sipil" },
    { title: "Teknik Fisika", faculty: "FTI", department: "Teknik Fisika" },
  ],

  "multidisiplin": [
    { title: "Teknologi Nano", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Teknologi Kesehatan", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Pendidikan Sains 4.0", faculty: "SAPPK", department: "Perencanaan Kepariwisataan" },
    { title: "Digital Technopreneurship", faculty: "FKampus XYZ", department: "Interdisipliner" },
    { title: "Smart-X", faculty: "FKampus XYZ", department: "Interdisipliner" },
    { title: "Material Baterai", faculty: "FKampus XYZ", department: "Interdisipliner" },
    { title: "Kebencanaan", faculty: "FKampus XYZ", department: "Meteorologi" },
    { title: "Pariwisata Hayati Berkelanjutan", faculty: "SAPPK", department: "Perencanaan Kepariwisataan", slug: "pariwisata-hayati-berkelanjutan" },
    { title: "Kepemimpinan Desain", faculty: "FKampus XYZ", department: "Interdisipliner" },
  ],
};

// `programFilter` (state) drives which list to show; keep a `programs` variable
// so existing render code (which expects `programs`) continues to work.
// NOTE: `programFilter` default is 'spesialisasi' so this will resolve correctly.


export const MainContentSection = (): JSX.Element => {
  const { programName, programType } = useProgram();
  const navigate = useNavigate();

  const [programFilter, setProgramFilter] = useState("spesialisasi");
  const [facultyFilter, setFacultyFilter] = useState("fKampus XYZ");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(studyPrograms.map(p => p.id));
  const [isProgramExpanded, setIsProgramExpanded] = useState(true);
  const [isFacultyExpanded, setIsFacultyExpanded] = useState(true);
  const [isStudyProgramExpanded, setIsStudyProgramExpanded] = useState(true);

  // When the route provides a programName, adjust filters/defaults accordingly
  useEffect(() => {
    if (!programName) return;
    const pn = programName.toLowerCase();

    if (pn === "pascasarjana") {
      setProgramFilter("multidisiplin");
      setFacultyFilter("fmipa");
    } else if (pn === "sarjana") {
      setProgramFilter("spesialisasi");
      setFacultyFilter("fKampus XYZ");
    } else if (pn === "profesi") {
      setProgramFilter("spesialisasi");
      setFacultyFilter("fti");
    }
  }, [programName]);

  // If the route provides an explicit programType (e.g., /programs/sarjana/minor) use it
  useEffect(() => {
    if (!programType) return;
    const pt = String(programType).toLowerCase();
    if (programsByType[pt]) {
      setProgramFilter(pt);
    }
  }, [programType]);

  // derive programs to display from selected programFilter
  const programs = programsByType[programFilter] ?? programsByType["spesialisasi"];

  // nice human label for the selected program type (used in heading)
  const selectedProgramTypeLabel = programTypes.find((p) => p.id === programFilter)?.label ?? "Program";

  const handleProgramCheckboxChange = (programId: string) => {
    if (programId === "all") {
      if (selectedPrograms.length === studyPrograms.length) {
        setSelectedPrograms([]);
      } else {
        setSelectedPrograms(studyPrograms.map(p => p.id));
      }
    } else {
      setSelectedPrograms(prev => {
        if (prev.includes(programId)) {
          return prev.filter(id => id !== programId && id !== "all");
        } else {
          const newSelection = [...prev, programId];
          if (newSelection.length === studyPrograms.length - 1) {
            return studyPrograms.map(p => p.id);
          }
          return newSelection;
        }
      });
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-6 flex gap-6 items-start">
  <aside className="hidden md:flex md:sticky md:top-20 mt-10 w-72 flex-col items-start gap-6 bg-white">
          <div className="relative w-[66px] h-9">
            <div className="inline-flex items-center gap-2.5">
              <h2 className="font-h7-bold font-[number:var(--h7-bold-font-weight)] text-[#333333] text-[length:var(--h7-bold-font-size)] tracking-[var(--h7-bold-letter-spacing)] leading-[var(--h7-bold-line-height)] [font-style:var(--h7-bold-font-style)]">
                Filter
              </h2>
            </div>
          </div>
          <div className="flex w-full items-center gap-3 px-5 py-4 rounded-[100px] border border-solid border-[#cdd3da]">
            <SearchIcon className="w-6 h-6 text-[#b3b3b3]" />
            <Input
              placeholder="Cari Program Spesialisasi"
              className="border-0 p-0 h-6 [font-family:'Inter',Helvetica] font-normal text-[#b3b3b3] text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Separator className="w-full" />
          <div className="flex flex-col w-full items-start gap-6">
            <button
              onClick={() => setIsProgramExpanded(!isProgramExpanded)}
              className="flex items-center justify-between w-full"
            >
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#333333] text-[22px] tracking-[0] leading-[30px]">
                Program
              </h3>
              {isProgramExpanded ? (
                <ChevronUpIcon className="w-6 h-6" />
              ) : (
                <ChevronDownIcon className="w-6 h-6" />
              )}
            </button>
            {isProgramExpanded && (
              <RadioGroup
                value={programFilter}
                onValueChange={(val) => {
                  // keep UI in sync immediately, then navigate so URL becomes source of truth
                  setProgramFilter(val);
                  const pn = (programName || "sarjana").toString();
                  navigate(`/programs/${pn}/${val}`);
                }}
                className="flex flex-col gap-4"
              >
                {programTypes.map((program) => (
                  <div key={program.id} className="flex items-start gap-5">
                    <RadioGroupItem
                      value={program.id}
                      id={program.id}
                      className="w-6 h-6 rounded-full border border-neutral-300 data-[state=checked]:border-[#069dd8] data-[state=checked]:bg-[#069dd8] flex-shrink-0"
                    />
                    <Label
                      htmlFor={program.id}
                      className="[font-family:'Inter',Helvetica] font-normal text-[#333333] text-base tracking-[0] leading-[26px] cursor-pointer"
                    >
                      {program.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
          <Separator className="w-full" />
          <div className="flex flex-col w-full items-start gap-5">
            <div className="flex flex-col items-start gap-6 w-full">
              <button
                onClick={() => setIsFacultyExpanded(!isFacultyExpanded)}
                className="flex items-center justify-between w-full"
              >
                <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#333333] text-[22px] tracking-[0] leading-[30px]">
                  Fakultas
                </h3>
                {isFacultyExpanded ? (
                  <ChevronUpIcon className="w-6 h-6" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6" />
                )}
              </button>
              {isFacultyExpanded && (
                <div className="flex flex-col items-start gap-4 w-full">
                  <RadioGroup value={facultyFilter} onValueChange={setFacultyFilter} className="flex flex-col gap-4 w-full">
                    {faculties.map((faculty) => (
                      <div key={faculty.id} className="flex items-center gap-5 w-full">
                        <RadioGroupItem
                          value={faculty.id}
                          id={faculty.id}
                          className="w-6 h-6 rounded-full border border-neutral-300 data-[state=checked]:border-[#069dd8] data-[state=checked]:bg-[#069dd8] flex-shrink-0"
                        />
                        <Label
                          htmlFor={faculty.id}
                          className="flex-1 [font-family:'Inter',Helvetica] font-normal text-[#333333] text-base tracking-[0] leading-[26px] cursor-pointer"
                        >
                          {faculty.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <button className="[font-family:'Inter',Helvetica] font-medium text-[#069dd8] text-base tracking-[0] leading-[22px] underline">
                Lebih Banyak
              </button>
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex flex-col items-start gap-6 w-full">
            <button
              onClick={() => setIsStudyProgramExpanded(!isStudyProgramExpanded)}
              className="flex items-center justify-between w-full"
            >
              <h3 className="font-bold text-[22px] leading-[30px] [font-family:'Inter',Helvetica] text-[#333333] tracking-[0]">
                Program Studi
              </h3>
              {isStudyProgramExpanded ? (
                <ChevronUpIcon className="w-6 h-6" />
              ) : (
                <ChevronDownIcon className="w-6 h-6" />
              )}
            </button>
            {isStudyProgramExpanded && (
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex items-center gap-5 w-full">
                  <Checkbox
                    id="all"
                    checked={selectedPrograms.includes("all")}
                    onCheckedChange={() => handleProgramCheckboxChange("all")}
                  />
                  <Label
                    htmlFor="all"
                    className="flex-1 [font-family:'Inter',Helvetica] font-normal text-[#333333] text-base tracking-[0] leading-[26px] cursor-pointer"
                  >
                    Pilih Semua
                  </Label>
                </div>
                <div className="flex flex-col items-start gap-4 pl-11 w-full">
                  {studyPrograms.slice(1).map((program) => (
                    <div key={program.id} className="flex items-center gap-5 w-full">
                      <Checkbox
                        id={program.id}
                        checked={selectedPrograms.includes(program.id)}
                        onCheckedChange={() => handleProgramCheckboxChange(program.id)}
                        className="w-6 h-6 rounded border-[#069dd8] data-[state=checked]:bg-[#069dd8] data-[state=checked]:border-[#069dd8]"
                      />
                      <Label
                        htmlFor={program.id}
                        className="flex-1 [font-family:'Inter',Helvetica] font-normal text-[#333333] text-base tracking-[0] leading-[26px] cursor-pointer"
                      >
                        {program.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Separator className="w-full" />
        </aside>
        <main className="flex-1 flex flex-col gap-14 mt-10 py-6">
          <div className="flex flex-col items-start gap-7">
            <div className="flex flex-col items-start justify-center gap-5 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-1">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#808080] text-base tracking-[0] leading-[26px]">
                    {`Program ${programName ?? ""} ${selectedProgramTypeLabel} FKampus XYZ`}
                  </span>
                  <span className="font-h11-bold font-[number:var(--h11-bold-font-weight)] text-[#069dd8] text-[length:var(--h11-bold-font-size)] tracking-[var(--h11-bold-letter-spacing)] leading-[var(--h11-bold-line-height)] [font-style:var(--h11-bold-font-style)]">
                    ({programs.length} Program)
                  </span>
                </div>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[234px] h-12 rounded-[100px] border border-solid border-[#cdd3da]">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Urutkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
-            <div className="grid justify-center items-start gap-6 w-full grid-cols-[repeat(auto-fill,minmax(289px,1fr))]">
              {programs.map((program, index) => {
                const slug = (program as any).slug;
                const card = (
                  <Card key={index} className="w-[289px] h-[209px] bg-white rounded-[25px] shadow-[0px_2px_25px_#000e331a] border-0">
                    <CardContent className="flex flex-col items-center gap-3 pt-4 pb-0 px-4 h-full">
                      <div className="flex flex-col items-start gap-4 pt-0 pb-4 px-0 flex-1 w-full">
                        <div className="flex flex-col items-start gap-2.5 flex-1 w-full">
                          <Badge className="h-6 bg-[#ffefd4] text-[#e99400] hover:bg-[#ffefd4] rounded-lg font-body-text-12px-medium font-[number:var(--body-text-12px-medium-font-weight)] text-[length:var(--body-text-12px-medium-font-size)] tracking-[var(--body-text-12px-medium-letter-spacing)] leading-[var(--body-text-12px-medium-line-height)] [font-style:var(--body-text-12px-medium-font-style)]">
                            Sarjana
                          </Badge>
                          <div className="flex flex-col items-start gap-2 w-full">
                            <h4 className="w-full h-[43px] [font-family:'Inter',Helvetica] font-bold text-[#333333] text-base tracking-[0] leading-[22px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                              {program.title}
                            </h4>
                            <div className="flex flex-col items-start gap-1 w-full">
                              <div className="flex flex-wrap items-start gap-[8px] w-full">
                                <span className="flex-1 font-body-text-14px-regular font-[number:var(--body-text-14px-regular-font-weight)] text-[#333333] text-[length:var(--body-text-14px-regular-font-size)] tracking-[var(--body-text-14px-regular-letter-spacing)] leading-[var(--body-text-14px-regular-line-height)] [font-style:var(--body-text-14px-regular-font-style)]">
                                  {program.faculty}
                                </span>
                              </div>
                              <div className="flex items-center gap-2.5 w-full rounded-[5px] overflow-hidden">
                                <span className="text-[#808080] text-[length:var(--body-text-14px-regular-font-size)] leading-[var(--body-text-14px-regular-line-height)] flex-1 font-body-text-14px-regular font-[number:var(--body-text-14px-regular-font-weight)] tracking-[var(--body-text-14px-regular-letter-spacing)] [font-style:var(--body-text-14px-regular-font-style)]">
                                  {program.department}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="h-10 w-full bg-[#069dd8] hover:bg-[#069dd8]/90 rounded-[25px] font-body-text-14px-medium font-[number:var(--body-text-14px-medium-font-weight)] text-white text-[length:var(--body-text-14px-medium-font-size)] tracking-[var(--body-text-14px-medium-letter-spacing)] leading-[var(--body-text-14px-medium-line-height)] [font-style:var(--body-text-14px-medium-font-style)]">
                          Daftar Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );

                if (slug && programName) {
                  return (
                    <Link key={index} to={`/programs/${programName}/${programFilter}/${slug}`} className="block">
                      {card}
                    </Link>
                  );
                }
                return card;
              })}
            </div>
          </div>
          <div className="inline-flex items-center gap-5 justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-[43.75px] h-[43.75px] bg-[#b3b3b3] hover:bg-[#b3b3b3]/90 rounded-[87.45px] shadow-[0px_1.75px_17.49px_#0000001a] p-[8.74px]"
            >
              <ChevronLeftIcon className="w-[26.51px] h-[26.51px] text-white" />
            </Button>
            <div className="inline-flex items-center gap-2">
              <div className="flex flex-col w-[49.26px] h-[46.21px] items-center justify-center rounded-lg border-[0.5px] border-solid border-neutral-200">
                <span className="font-h11-bold font-[number:var(--h11-bold-font-weight)] text-[#3d3d3d] text-[length:var(--h11-bold-font-size)] tracking-[var(--h11-bold-letter-spacing)] leading-[var(--h11-bold-line-height)] [font-style:var(--h11-bold-font-style)]">
                  1
                </span>
              </div>
              <span className="font-body-text-14px-regular font-[number:var(--body-text-14px-regular-font-weight)] text-[#808080] text-[length:var(--body-text-14px-regular-font-size)] tracking-[var(--body-text-14px-regular-letter-spacing)] leading-[var(--body-text-14px-regular-line-height)] [font-style:var(--body-text-14px-regular-font-style)]">
                dari 2
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-[43.75px] h-[43.75px] bg-[#069dd8] hover:bg-[#069dd8]/90 rounded-[87.45px] shadow-[0px_1.75px_17.49px_#0000001a] p-[8.74px]"
            >
              <ChevronRightIcon className="w-[26.51px] h-[26.51px] text-white" />
            </Button>
          </div>
        </main>
      </div>
    </div>

  );
};
