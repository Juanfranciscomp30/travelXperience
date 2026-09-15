<template>
  <div class="favoritos-page">
    <div class="container py-5">
      <h2 class="section-title text-center mb-5">Tus destinos favoritos</h2>

      <div v-if="destinosFavoritos.length > 0" class="row g-4">
        <div class="col-lg-4 col-md-6" v-for="destino in destinosFavoritos" :key="destino.id">
          <TarjetaDestino
            :id="destino.id"
            :nombre="destino.nombre"
            :pais="destino.pais"
            :descripcion="destino.descripcion"
            :precio="destino.precio"
            :imagen="destino.imagen"
            :categoria="destino.categoria"
            :duracion="destino.duracion"
            :valoracion="destino.valoracion"
          />
        </div>
      </div>

      <div v-else class="text-center py-5">
        <i class="far fa-heart fa-3x mb-3 icono-vacio"></i>
        <h4>Aún no tienes destinos favoritos.</h4>
        <p class="text-muted">
          Pulsa el corazón en cualquier destino para guardarlo aquí.
        </p>
        <router-link to="/destinos" class="btn btn-brand mt-2 px-4 py-2">
          Explorar destinos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritosStore } from '../stores/favoritos'
import { destinos } from '../data/destinos'
import TarjetaDestino from '../components/TarjetaDestino.vue'

const favoritos = useFavoritosStore()

const destinosFavoritos = computed(() =>
  destinos.filter((d) => favoritos.ids.includes(d.id))
)
</script>

<style scoped>
.favoritos-page {
  min-height: 60vh;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-dark);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.icono-vacio {
  color: var(--color-orange);
  opacity: 0.6;
}
</style>
