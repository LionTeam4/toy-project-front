import useToastStore from "../store/useToastStore";

export default function Toast() {
    const { toast, hideToast } = useToastStore()

    if (!toast) return null

    const colorMap = {
        success: 'bg-primary text-gray-900',
        error: 'bg-red-400 text-white',
        info: 'bg-gray-900 text-white',
    }

    return (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-[100]">
            <div 
                className={`px-6 py-3 rounded-[20px] text-[13px] font-semibold shadow-lg cursor-pointer font-sans ${colorMap[toast.type]}`}
                onClick={hideToast}
            >
                {toast.message}
            </div>
        </div>
    )
}