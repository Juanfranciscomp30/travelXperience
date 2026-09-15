<template>
  <div class="carrito-page">
    <div class="container py-5">
      <h2 class="section-title text-center mb-5">Tu carrito de reservas</h2>

      <div v-if="carrito.reservas.length > 0" class="row g-4">
        <div class="col-lg-8">
          <ul class="list-unstyled">
            <li
              v-for="destino in carrito.reservas"
              :key="destino.id"
              class="item-carrito d-flex justify-content-between align-items-center mb-3"
            >
              <div class="d-flex align-items-center">
                <img :src="destino.imagen" :alt="destino.nombre" class="destino-thumb me-3" />
                <div>
                  <h5 class="mb-1">{{ destino.nombre }}<span class="pais-mini">, {{ destino.pais }}</span></h5>
                  <p class="mb-0 text-muted small">{{ destino.descripcion }}</p>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <span class="precio me-3">{{ formatearPrecio(destino.precio) }}</span>
                <button
                  class="btn-eliminar"
                  @click="carrito.eliminarReserva(destino.id)"
                  aria-label="Eliminar del carrito"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </li>
          </ul>

          <button class="btn-vaciar" @click="carrito.vaciarCarrito">
            <i class="fas fa-broom me-2"></i>Vaciar carrito
          </button>
        </div>

        <div class="col-lg-4">
          <div class="resumen-card">
            <h5 class="mb-3">Resumen</h5>
            <div class="d-flex justify-content-between mb-2">
              <span>{{ carrito.reservas.length }} destino(s)</span>
              <span>{{ formatearPrecio(carrito.totalPrecio) }}</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between total-final">
              <span>Total</span>
              <span>{{ formatearPrecio(carrito.totalPrecio) }}</span>
            </div>
            <button class="btn btn-brand w-100 mt-4">
              <i class="fas fa-lock me-2"></i>Confirmar reserva
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <i class="fas fa-suitcase-rolling fa-3x mb-3 icono-vacio"></i>
        <h4>No hay reservas todavía.</h4>
        <p class="text-muted">Explora nuestros destinos y añade tu próxima aventura.</p>
        <router-link to="/destinos" class="btn btn-brand mt-2 px-4 py-2">
          Explorar destinos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarritoStore } from '../stores/carrito'
const carrito = useCarritoStore()

function formatearPrecio(precio: number) {
  return precio.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  })
}
</script>

<style scoped>
.carrito-page {
  min-height: 60vh;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-dark);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.item-carrito {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 14px 18px;
}

.pais-mini {
  color: var(--color-text-muted);
  font-weight: 400;
  font-size: 0.85rem;
}

.destino-thumb {
  width: 70px;
  height: 55px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.precio {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-orange);
}

.btn-eliminar {
  border: none;
  background: #fdecec;
  color: #d9534f;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s ease;
}
.btn-eliminar:hover {
  background: #d9534f;
  color: #fff;
}

.btn-vaciar {
  border: none;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  background-color: #f4f5f9;
  color: var(--color-dark);
  transition: all 0.25s ease;
}
.btn-vaciar:hover {
  background-color: var(--color-dark);
  color: var(--color-gold);
}

.resumen-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  position: sticky;
  top: 20px;
}

.total-final {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--color-dark);
}

.icono-vacio {
  color: var(--color-orange);
  opacity: 0.6;
}

/* ===== Responsive (móvil) ===== */
@media (max-width: 575.98px) {
  .item-carrito {
    flex-wrap: wrap;
    gap: 10px;
  }

  .item-carrito > div:first-child {
    width: 100%;
  }

  .item-carrito > div:last-child {
    width: 100%;
    justify-content: space-between;
  }

  .resumen-card {
    position: static;
    margin-top: 1.5rem;
  }
}
</style>
