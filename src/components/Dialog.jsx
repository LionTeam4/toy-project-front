import useDialogStore from "../store/useDialogStore";

export default function Dialog() {
    const { dialog, hideDialog } = useDialogStore()

    if (!dialog) return null
    
    const handleConfirm = () => {
        dialog.onConfirm?.()
        hideDialog()
    }

    const handleCancel = () => {
        dialog.onCancel?.()
        hideDialog()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200]">
            <div className="bg-white rounded-[20px] px-6 py-6 w-[300px] flex flex-col gap-4">
                <h2 className="text-[16px] font-bold text-gray-900 text-center font-sans">
                    {dialog.title}
                </h2>
                <p className="text-[13px] text-black/60 text-center leading-[136%] font-sans">
                    {dialog.message}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleCancel}
                        className="flex-1 h-[44px] rounded-[20px] bg-gray-50 text-[13px] font-semibold text-gray-900 cursor-pointer font-sans"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 h-[44px] rounded-[20px] bg-primary text-[13px] font-semibold text-gray-900 cursor-pointer font-sans"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}