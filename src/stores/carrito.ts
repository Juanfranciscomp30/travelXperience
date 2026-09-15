import { defineStore } from 'pinia'
import type { Destino } from '../data/destinos'

const STORAGE_KEY = 'tienda-vue.carrito'

function cargarReservasGuardadas(): Destino[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Destino[]) : []
  } catch {
    return []
  }
}

function guardarReservas(reservas: Destino[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas))
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.) — no es crítico
  }
}

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    reservas: cargarReservasGuardadas(),
  }),

  actions: {
    añadirReserva(destino: Destino) {
      const yaExiste = this.reservas.find((d) => d.id === destino.id)
      if (!yaExiste) {
        this.reservas.push(destino)
        guardarReservas(this.reservas)
      }
    },

    eliminarReserva(id: number) {
      this.reservas = this.reservas.filter((d) => d.id !== id)
      guardarReservas(this.reservas)
    },

    vaciarCarrito() {
      this.reservas = []
      guardarReservas(this.reservas)
    },
  },

  getters: {
    totalPrecio(state): number {
      return state.reservas.reduce((sum, d) => sum + d.precio, 0)
    },
  },
})
