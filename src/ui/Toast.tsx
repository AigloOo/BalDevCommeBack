import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  duration?: number;
}

let toastCounter = 0;
let addToast: ((message: Omit<ToastMessage, "id">) => void) | null = null;

export const toast = (message: Omit<ToastMessage, "id">) => {
  if (addToast) {
    addToast(message);
  }
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToast = (message) => {
      const id = toastCounter++;
      setToasts((prev) => [...prev, { ...message, id }]);

      if (message.duration !== Infinity) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, message.duration || 3000);
      }
    };

    return () => {
      addToast = null;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] border border-gray-200"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-medium text-gray-900">{toast.title}</h3>
                {toast.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
