<template>
  <div v-if="destino" class="detalle-page">
    <div class="container py-5">
      <router-link to="/destinos" class="volver-link mb-4 d-inline-block">
        <i class="fas fa-arrow-left me-2"></i>Volver a destinos
      </router-link>

      <div class="row g-5">
        <!-- Galería -->
        <div class="col-lg-6">
          <div class="imagen-principal-wrapper mb-3">
            <img :src="imagenSeleccionada" :alt="destino.nombre" class="imagen-principal" />
            <span class="badge-categoria">{{ destino.categoria }}</span>
            <button
              class="btn-favorito"
              :class="{ activo: esFavorito }"
              type="button"
              @click="favoritos.toggle(destino.id)"
            >
              <i :class="esFavorito ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
          </div>
          <div class="miniaturas">
            <img
              v-for="(img, i) in destino.imagenes"
              :key="i"
              :src="img"
              :alt="`${destino.nombre} ${i + 1}`"
              class="miniatura"
              :class="{ activa: img === imagenSeleccionada }"
              @click="imagenSeleccionada = img"
            />
          </div>
        </div>

        <!-- Info -->
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <p class="pais-detalle mb-1">
            <i class="fas fa-location-dot me-1"></i>{{ destino.pais }}
          </p>
          <h1 class="fw-bold destino-nombre">{{ destino.nombre }}</h1>

          <div class="meta-row my-3">
            <span class="meta-chip"><i class="fas fa-star me-1"></i>{{ destino.valoracion.toFixed(1) }}</span>
            <span class="meta-chip"><i class="fas fa-clock me-1"></i>{{ destino.duracion }} días</span>
            <span class="meta-chip"><i class="fas fa-tag me-1"></i>{{ destino.categoria }}</span>
          </div>

          <p class="destino-descripcion text-muted mb-4">{{ destino.descripcion }}</p>

          <h3 class="destino-precio mb-4">
            {{ precioFormateado }}
            <span class="precio-nota">/ persona</span>
          </h3>

          <div class="d-flex gap-3 flex-wrap">
            <button
              class="btn btn-reservar"
              :class="{ añadido: yaEnCarrito }"
              @click="reservarDestino"
              :disabled="yaEnCarrito"
            >
              <i :class="yaEnCarrito ? 'fas fa-check' : 'fas fa-cart-plus'" class="me-2"></i>
              {{ yaEnCarrito ? 'Ya está en tu carrito' : 'Reservar ahora' }}
            </button>
            <button class="btn btn-favorito-grande" :class="{ activo: esFavorito }" @click="favoritos.toggle(destino.id)">
              <i :class="esFavorito ? 'fas fa-heart' : 'far fa-heart'" class="me-2"></i>
              {{ esFavorito ? 'En favoritos' : 'Añadir a favoritos' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Relacionados -->
      <div v-if="relacionados.length" class="relacionados mt-5 pt-5">
        <h4 class="mb-4">También te puede interesar</h4>
        <div class="row g-4">
          <div class="col-md-4" v-for="rel in relacionados" :key="rel.id">
            <TarjetaDestino
              :id="rel.id"
              :nombre="rel.nombre"
              :pais="rel.pais"
              :descripcion="rel.descripcion"
              :precio="rel.precio"
              :imagen="rel.imagen"
              :categoria="rel.categoria"
              :duracion="rel.duracion"
              :valoracion="rel.valoracion"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container text-center py-5">
    <i class="fas fa-triangle-exclamation fa-3x mb-3 text-warning"></i>
    <h3>Destino no encontrado</h3>
    <router-link to="/destinos" class="btn btn-brand mt-3">
      ← Volver al listado
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useCarritoStore } from '../stores/carrito'
import { useFavoritosStore } from '../stores/favoritos'
import { destinos } from '../data/destinos'
import TarjetaDestino from '../components/TarjetaDestino.vue'

const carrito = useCarritoStore()
const favoritos = useFavoritosStore()

const route = useRoute()
const id = computed(() => Number(route.params.id))
const destino = computed(() => destinos.find((d) => d.id === id.value))

const imagenSeleccionada = ref(destino.value?.imagenes[0] ?? '')
watch(destino, (nuevo) => {
  imagenSeleccionada.value = nuevo?.imagenes[0] ?? ''
})

const esFavorito = computed(() => (destino.value ? favoritos.esFavorito(destino.value.id) : false))

const yaEnCarrito = computed(() =>
  destino.value ? carrito.reservas.some((r) => r.id === destino.value!.id) : false
)

const precioFormateado = computed(() =>
  destino.value
    ? Number(destino.value.precio).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
      })
    : ''
)

const relacionados = computed(() => {
  if (!destino.value) return []
  return destinos
    .filter((d) => d.categoria === destino.value!.categoria && d.id !== destino.value!.id)
    .slice(0, 3)
})

function reservarDestino() {
  if (destino.value && !yaEnCarrito.value) {
    carrito.añadirReserva(destino.value)
  }
}
</script>

<style scoped>
.detalle-page {
  background-color: var(--color-bg);
}

.volver-link {
  color: var(--color-dark);
  font-weight: 600;
  transition: color 0.2s ease;
}
.volver-link:hover {
  color: var(--color-orange);
}

.imagen-principal-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.imagen-principal {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

.badge-categoria {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(27, 38, 59, 0.85);
  color: var(--color-gold);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 50px;
}

.btn-favorito {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}
.btn-favorito:hover {
  transform: scale(1.1);
}
.btn-favorito.activo {
  color: var(--color-orange);
}

.miniaturas {
  display: flex;
  gap: 10px;
}

.miniatura {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0.6;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.miniatura:hover {
  opacity: 0.9;
}
.miniatura.activa {
  opacity: 1;
  border-color: var(--color-orange);
}

.pais-detalle {
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.95rem;
}

.destino-nombre {
  font-family: var(--font-heading);
  color: var(--color-dark);
  font-size: 2.6rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.meta-chip {
  background: #fff;
  border: 1px solid var(--color-border);
  color: var(--color-dark);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 50px;
}

.destino-descripcion {
  font-size: 1.1rem;
  line-height: 1.7;
}

.destino-precio {
  font-family: var(--font-heading);
  color: var(--color-orange);
  font-weight: 700;
}

.precio-nota {
  font-size: 1rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.btn-reservar {
  background-color: var(--color-dark);
  color: var(--color-gold);
  font-weight: 600;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  border: none;
  transition: all 0.25s ease;
}
.btn-reservar:hover:not(:disabled) {
  background-color: var(--color-orange);
  color: #fff;
  box-shadow: var(--shadow-orange);
}
.btn-reservar.añadido {
  background-color: #dcefe0;
  color: #1e7a34;
  cursor: default;
}

.btn-favorito-grande {
  background: #fff;
  border: 2px solid var(--color-border);
  color: var(--color-dark);
  font-weight: 600;
  border-radius: 50px;
  padding: 0.8rem 1.6rem;
  transition: all 0.25s ease;
}
.btn-favorito-grande:hover {
  border-color: var(--color-orange);
  color: var(--color-orange);
}
.btn-favorito-grande.activo {
  border-color: var(--color-orange);
  color: var(--color-orange);
  background: #fff5f0;
}

.relacionados {
  border-top: 1px solid var(--color-border);
}

/* ===== Responsive (móvil) ===== */
@media (max-width: 767.98px) {
  .imagen-principal {
    height: 260px;
  }

  .destino-nombre {
    font-size: 1.9rem;
  }

  .miniaturas {
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
  }

  .miniatura {
    flex: 0 0 auto;
  }

  .destino-descripcion {
    font-size: 1rem;
  }

  .d-flex.gap-3.flex-wrap {
    flex-direction: column;
  }

  .btn-reservar,
  .btn-favorito-grande {
    width: 100%;
  }
}
</style>
