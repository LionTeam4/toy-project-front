import useAppStore from "../store/useAppStore";

export default function Dialog() {
    const { dialog, hideDialog } = useAppStore()

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
                <h2 className="text-[16px] font-bold text-[#000000] text-center">
                {dialog.title}
                </h2>
                <p className="text-[13px] text-black/60 text-center leading-[136%]">
                {dialog.message}
                </p>
                <div className="flex gap-2">
                <button
                    onClick={handleCancel}
                    className="flex-1 h-[44px] rounded-[20px] bg-[#F5F5F5] text-[13px] font-semibold text-[#000000] cursor-pointer"
                >
                    취소
                </button>
                <button
                    onClick={handleConfirm}
                    className="flex-1 h-[44px] rounded-[20px] bg-[#33FE88] text-[13px] font-semibold text-[#000000] cursor-pointer"
                >
                    확인
                </button>
                </div>
            </div>
        </div>
    )
}