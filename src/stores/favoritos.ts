import { defineStore } from 'pinia'

const STORAGE_KEY = 'tienda-vue.favoritos'

function cargarFavoritosGuardados(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as number[]) : []
  } catch {
    return []
  }
}

function guardarFavoritos(ids: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // localStorage no disponible — no es crítico
  }
}

export const useFavoritosStore = defineStore('favoritos', {
  state: () => ({
    ids: cargarFavoritosGuardados(),
  }),

  actions: {
    toggle(id: number) {
      if (this.ids.includes(id)) {
        this.ids = this.ids.filter((x) => x !== id)
      } else {
        this.ids = [...this.ids, id]
      }
      guardarFavoritos(this.ids)
    },

    esFavorito(id: number): boolean {
      return this.ids.includes(id)
    },
  },

  getters: {
    total: (state) => state.ids.length,
  },
})
