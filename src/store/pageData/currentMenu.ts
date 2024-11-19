import { MenuAssetType } from '@/src/types/request/types/menu';
import { create } from 'zustand'

interface CurrentMenuStroreInterface {
    menu: MenuAssetType | null,
    setFullMenuData: (data: MenuAssetType) => void
}

export const CurrentMenuStore = create<CurrentMenuStroreInterface>()((set) => ({
    menu: null,
    setFullMenuData: (data) => set({ menu: data })
}))

