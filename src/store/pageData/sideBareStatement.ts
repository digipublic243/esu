import { create } from 'zustand'

export const SideBareStatement = create<{ isOpen: boolean; setState: (state: boolean) => void }>()((set) => ({
    isOpen: false,
    setState: (state) => set({ isOpen: state })
}))

