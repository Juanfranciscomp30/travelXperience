import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    reservas: [] as any[], // aquí guardaremos los destinos reservados
  }),

  actions: {
    añadirReserva(destino: any) {
      const yaExiste = this.reservas.find((d) => d.id === destino.id)
      if (!yaExiste) {
        this.reservas.push(destino)
      }
    },

    eliminarReserva(id: number) {
      this.reservas = this.reservas.filter((d) => d.id !== id)
    },

    vaciarCarrito() {
      this.reservas = []
    },
  },

  getters: {
    totalPrecio(state): number {
      return state.reservas.reduce((sum, d) => sum + d.precio, 0)
    },
  },
})
