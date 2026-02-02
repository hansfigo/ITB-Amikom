import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Apakah anda yakin data sudah benar?",
  description = "Pendaftaran program akan segera diproses. Data yang telah dikirim tidak dapat diubah kembali",
  confirmLabel = "Ya, Saya Yakin",
  cancelLabel = "Kembali",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
	<div className="fixed inset-0 z-50 flex items-center justify-center">
	  <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

	  <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 mx-4">
		<div className="flex justify-center mb-4">
		  <img src="/konfirmasi.png" alt="Confirmation" className="w-36 h-36" />
		</div>

		<h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
		<p className="text-sm text-gray-500 text-center mb-6">{description}</p>

		<div className="flex justify-center gap-4">
		  <button
			onClick={onCancel}
			className="px-6 py-2 rounded-full border border-[#07a0cf] text-[#07a0cf] bg-white"
		  >
			{cancelLabel}
		  </button>
		  <button
			onClick={onConfirm}
			className="px-6 py-2 rounded-full bg-[#07a0cf] text-white"
		  >
			{confirmLabel}
		  </button>
		</div>
	  </div>
	</div>
  );
};

export default ConfirmModal;
