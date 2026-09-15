<template>
  <div class="tarjeta-destino">
    <div class="imagen-wrapper">
      <img :src="imagen" :alt="`${nombre}, ${pais}`" class="imagen-destino" loading="lazy" />

      <span class="badge-categoria">{{ categoria }}</span>

      <button
        class="btn-favorito"
        :class="{ activo: esFavorito }"
        type="button"
        @click="favoritos.toggle(id_)"
        :aria-label="esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'"
      >
        <i :class="esFavorito ? 'fas fa-heart' : 'far fa-heart'"></i>
      </button>

      <div class="overlay-info">
        <span><i class="fas fa-clock me-1"></i>{{ duracion }} días</span>
        <span><i class="fas fa-star me-1"></i>{{ valoracion.toFixed(1) }}</span>
      </div>
    </div>

    <div class="contenido">
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="nombre mb-0">{{ nombre }}</h5>
      </div>
      <p class="pais"><i class="fas fa-location-dot me-1"></i>{{ pais }}</p>
      <p class="descripcion">{{ descripcion }}</p>

      <div class="footer-tarjeta">
        <h3 class="precio">{{ precioFormateado }}</h3>
        <router-link :to="`/destinos/${id_}`" class="btn-vermas">
          Ver más
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritosStore } from '../stores/favoritos'
import type { Categoria } from '../data/destinos'

const props = defineProps<{
  id: number | string
  nombre: string
  pais: string
  precio: number | string
  descripcion: string
  imagen: string
  categoria: Categoria
  duracion: number
  valoracion: number
}>()

// El prop "id" puede llegar como string desde el router; lo normalizamos a number
const id_ = computed(() => Number(props.id))

const favoritos = useFavoritosStore()
const esFavorito = computed(() => favoritos.esFavorito(id_.value))

const precioFormateado = computed(() =>
  Number(props.precio).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  })
)
</script>

<style scoped>
.tarjeta-destino {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-surface);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tarjeta-destino:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}

.imagen-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.imagen-destino {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.tarjeta-destino:hover .imagen-destino {
  transform: scale(1.08);
}

.badge-categoria {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(27, 38, 59, 0.85);
  color: var(--color-gold);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 50px;
  backdrop-filter: blur(2px);
}

.btn-favorito {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn-favorito:hover {
  transform: scale(1.1);
}

.btn-favorito.activo {
  color: var(--color-orange);
}

.overlay-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.contenido {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.nombre {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-dark);
  font-family: var(--font-heading);
}

.pais {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.descripcion {
  flex-grow: 1;
  font-size: 0.92rem;
  color: #555;
  margin-bottom: 14px;
}

.footer-tarjeta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.precio {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-orange);
  font-family: var(--font-heading);
  margin: 0;
}

.btn-vermas {
  display: inline-block;
  background-color: var(--color-dark);
  color: var(--color-gold);
  border: none;
  padding: 9px 16px;
  border-radius: 50px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.btn-vermas:hover {
  background-color: var(--color-orange);
  color: #ffffff;
  box-shadow: var(--shadow-orange);
}

@media (max-width: 575.98px) {
  .imagen-wrapper {
    height: 190px;
  }
}
</style>
