import useAppStore from "../store/useAppStore";

export default function Toast() {
    const { toast, hideToast } = useAppStore()

    if (!toast) return null

    const colorMap = {
        success: 'bg-[#33FE88] text-[#191919]',
        error: 'bg-red-400 text-white',
        info: 'bg-[#191919] text-white',
    }

    return (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-[100]">
            <div 
                className={`px-6 py-3 rounded-[20px] text-[13px] font-semibold shadow-lg cursor-pointer ${colorMap[toast.type]}`}
                onClick={hideToast}
            >
                {toast.message}
            </div>
        </div>
    )
}