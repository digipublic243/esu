import { MenuAssetType } from '@/src/types/request/types/menu';
import { create } from 'zustand'

interface CurrentMenuStroreInterface {
    menus: MenuAssetType[] | null,
    setMenus: (data: MenuAssetType[]) => void
}

export const MenusStore = create<CurrentMenuStroreInterface>()((set) => ({
    menus: null,
    setMenus: (data) => set({ menus: data })
}))

