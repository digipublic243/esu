import { ConnectedUserType } from '@/src/types/auth/connectedUser.type'
import { create } from 'zustand'

type ConnectedUserStoreType = {
    user: null | ConnectedUserType,
    setter: (data: ConnectedUserType | null) => void
}

export const connectedUserStore = create<ConnectedUserStoreType>()((set) => ({
    user: null,
    setter: (user) => {
        return set({ user })
    }
}))

