import { MenuAssetType } from '@/src/types/request/types/menu';
import { create } from 'zustand'

interface CurrentSubMenuStroreInterface {
    subMenu: MenuAssetType | null,
    setCurrentSubMenu: (data: MenuAssetType) => void
}

export const CurrentSubMenuStore = create<CurrentSubMenuStroreInterface>()((set) => ({
    subMenu: null,
    setCurrentSubMenu: (data) => set({ subMenu: data })
}))

