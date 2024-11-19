import { ToastOptions } from 'react-hot-toast';
import { create } from 'zustand'

export type ToastStoreType = {
    message: string, opts?: ToastOptions
}
export type ToasterMessageStore = {
    toast: ToastStoreType | null;
    setToast: (toast: ToastStoreType | null) => void;
}

export const toastStore = create<ToasterMessageStore>()((set) => ({
    toast: null,
    setToast: (toast) => set({ toast }),
}))

