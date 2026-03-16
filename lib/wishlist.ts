import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  toggle: (item: WishlistItem) => void
  remove: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  getCount: () => number
  openWishlistPanel: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (item: WishlistItem) => {
        const { items } = get()
        const exists = items.some((i) => i.productId === item.productId)

        if (exists) {
          set({ items: items.filter((i) => i.productId !== item.productId) })
        } else {
          set({ items: [...items, item] })
        }
      },

      remove: (productId: string) => {
        const { items } = get()
        set({ items: items.filter((i) => i.productId !== productId) })
      },

      isInWishlist: (productId: string) => {
        const { items } = get()
        return items.some((i) => i.productId === productId)
      },

      getCount: () => {
        return get().items.length
      },

      openWishlistPanel: () => {
        window.dispatchEvent(new CustomEvent('openWishlistPanel'))
      },
    }),
    {
      name: 'habyah-wishlist',
      version: 1,
    }
  )
)
