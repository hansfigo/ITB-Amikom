import React from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type Notification = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  status: "registered" | "pending" | "rejected";
  programSlug: string;
  programName: string;
  programType: string;
};

type NotificationPanelProps = {
  open: boolean;
  notifications: Notification[];
  onClose: () => void;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "registered":
      return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    case "pending":
      return <Clock className="w-6 h-6 text-blue-500" />;
    case "rejected":
      return <XCircle className="w-6 h-6 text-red-500" />;
    default:
      return null;
  }
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  open,
  notifications,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleNotificationClick = (notification: Notification) => {
    navigate(
      `/notifications/${notification.programName}/${notification.programType}/${notification.programSlug}/${notification.status}`,
      {
        state: { notification },
      }
    );
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-16 right-4 z-50 w-96 bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">Notifikasi</h3>
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Tandai sudah baca
          </a>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(notification.status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {notification.title}
                    </p>
                    {notification.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
