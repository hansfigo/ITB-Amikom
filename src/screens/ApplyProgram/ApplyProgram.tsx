import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../../components/layout";
import { Badge } from "../../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { saveApplication } from "../../lib/applicationStorage";
import ConfirmModal from "../../components/ui/ConfirmModal";

// Import program details from ProgramDetail
const programDetails: Record<string, any> = {
  "struktur-lepas-pantai": {
    degree: "Sarjana",
    type: "Program Spesialisasi",
    faculty: "FTSL / Teknik Kelautan",
    title: "Struktur Lepas Pantai",
  },
  "fisika-bangunan": {
    degree: "Sarjana",
    type: "Program Minor",
    faculty: "FTI / Teknik Fisika",
    title: "Fisika Bangunan",
  },
  "teknik-lingkungan": {
    degree: "Sarjana",
    type: "Program Double Major",
    faculty: "FTI / Teknik Lingkungan",
    title: "Teknik Lingkungan",
  },
  "pariwisata-hayati-berkelanjutan": {
    degree: "Magister",
    type: "Program Multidisiplin",
    faculty: "SAPPK/Perencanaan Kepariwisataan • SITH / Biomanajemen",
    title: "Pariwisata Hayati Berkelanjutan",
  },
};

export const ApplyProgram = (): JSX.Element => {
  const { programSlug, programName, programType } = useParams();
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState("");
  
  const detail = programDetails[programSlug ?? ""];
  
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!programSlug || !programName || !programType || !detail) return setConfirmOpen(false);
    
    // Save to localStorage
    saveApplication({
      programSlug,
      programName,
      programType,
      programTitle: detail.title,
      programDegree: detail.degree,
      faculty: detail.faculty,
      motivationLetter: motivation,
    });

    setConfirmOpen(false);
    // Navigate to success page
    navigate(`/programs/${programName}/${programType}/${programSlug}/apply/success`);
  };

  if (!detail) {
    return (
      <MainLayout>
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold">Program tidak ditemukan</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] w-full px-6 py-10">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList className="gap-1">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{(programName ?? "Sarjana").toString().replace(/\b\w/g, (c) => c.toUpperCase())}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  {({
                    "spesialisasi": "Spesialisasi",
                    "minor": "Minor",
                    "double-major": "Double Major",
                    "multidisiplin": "Multidisiplin",
                  } as Record<string, string>)[(programType ?? "spesialisasi").toString()] ?? "Spesialisasi"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/programs/${programName}/${programType}/${programSlug}`}>{detail.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Daftar Program</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-2xl font-bold mb-6">Pendaftaran Program</h1>

        <div className="space-y-6">
          <Card className="rounded-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{detail.type}</div>
                    <div className="text-lg font-semibold">{detail.title}</div>
                    <div className="text-sm text-gray-400">{detail.faculty}</div>
                  </div>
                  <Badge className="ml-4 bg-[#ffefd4] text-[#e99400]">{detail.degree}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-lg">IM</span>
                </div>
                <div>
                  <div className="font-semibold">Ismail Mail</div>
                  <div className="text-sm text-gray-500">15522024</div>
                  <div className="text-sm text-gray-400">Fakultas Teknik Sipil &amp; Kelautan / Teknik Kelautan</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="font-semibold mb-2">Motivation Letter</h3>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 border-b px-4 py-2 flex gap-2 items-center">
                <button className="hover:bg-gray-200 p-1 rounded" title="Bold"><strong>B</strong></button>
                <button className="hover:bg-gray-200 p-1 rounded" title="Italic"><em>I</em></button>
                <button className="hover:bg-gray-200 p-1 rounded" title="Underline"><u>U</u></button>
                <span className="border-l h-4 mx-1"></span>
                <button className="hover:bg-gray-200 p-1 rounded" title="Link">🔗</button>
                <button className="hover:bg-gray-200 p-1 rounded" title="Image">🖼️</button>
                <button className="hover:bg-gray-200 p-1 rounded" title="Mention">@</button>
                <button className="hover:bg-gray-200 p-1 rounded" title="Code">&#60;/&#62;</button>
              </div>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Tulis Motivation Letter di Kolom Ini"
                className="w-full min-h-[220px] p-4 text-sm resize-vertical border-0 focus:outline-none"
              />
            </div>
            <div className="text-right text-sm text-gray-400 mt-2">{motivation.length}/1000 Kata</div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-[#069dd8] hover:bg-[#069dd8]/90 rounded-[25px] px-8">Daftar Program</Button>
          </div>
        </div>
      </div>
      <ConfirmModal open={confirmOpen} onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} />
    </MainLayout>
  );
};

export default ApplyProgram;
