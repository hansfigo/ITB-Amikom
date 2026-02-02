import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MainLayout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronLeftIcon, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Notification } from "../../components/ui/NotificationPanel";

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
};

export const NotificationDetail = (): JSX.Element => {
  const { programSlug, status } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const notification = location.state?.notification as Notification | undefined;

  const detail = programDetails[programSlug ?? ""];

  const getStatusIcon = () => {
    switch (status) {
      case "registered":
        return <CheckCircle2 className="w-16 h-16 text-green-500" />;
      case "pending":
        return <Clock className="w-16 h-16 text-blue-500" />;
      case "rejected":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case "registered":
        return "Pendaftaran Diterima";
      case "pending":
        return "Sedang Ditinjau";
      case "rejected":
        return "Pendaftaran Ditolak";
      default:
        return "";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "registered":
        return "Selamat! Anda telah berhasil terdaftar di program ini. Status Anda sudah terdaftar dan menunggu tahap selanjutnya.";
      case "pending":
        return "Pendaftaran Anda sedang kami tinjau. Kami akan memberikan update status dalam waktu 3-5 hari kerja.";
      case "rejected":
        return "Sayangnya, pendaftaran Anda tidak diterima. Silakan hubungi bagian akademik untuk informasi lebih lanjut.";
      default:
        return "";
    }
  };

  const getButtonLabel = () => {
    switch (status) {
      case "registered":
        return "Sudah Terdaftar";
      case "pending":
        return "Status Ditinjau";
      case "rejected":
        return "Coba Program Lain";
      default:
        return "";
    }
  };

  const getButtonAction = () => {
    switch (status) {
      case "rejected":
        return () => navigate("/programs");
      default:
        return () => {};
    }
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
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Kembali
        </button>

        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-6">{getStatusIcon()}</div>

          <h1 className="text-3xl font-bold text-center mb-4">
            {getStatusTitle()}
          </h1>

          <p className="text-center text-gray-600 max-w-md mb-8">
            {getStatusMessage()}
          </p>

          <Card className="rounded-lg w-full max-w-2xl mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{detail.type}</div>
                    <div className="text-lg font-semibold">{detail.title}</div>
                    <div className="text-sm text-gray-400">{detail.faculty}</div>
                  </div>
                  <div className="text-sm font-semibold px-4 py-1 bg-[#ffefd4] text-[#e99400] rounded-full">
                    {detail.degree}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={getButtonAction()}
            className={`px-8 py-3 rounded-[25px] font-medium ${
              status === "rejected"
                ? "bg-[#069dd8] hover:bg-[#069dd8]/90 text-white"
                : "bg-gray-300 text-gray-700 cursor-default"
            }`}
            disabled={status !== "rejected"}
          >
            {getButtonLabel()}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationDetail;
