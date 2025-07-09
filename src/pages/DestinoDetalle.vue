<template>
  <div class="container py-5" v-if="destino">
    <div class="row g-4">
      <div class="col-md-6">
        <img
          :src="destino.imagen"
          :alt="destino.nombre"
          class="img-fluid rounded shadow-lg destino-imagen"
        />
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h1 class="fw-bold text-primary destino-nombre">{{ destino.nombre }}</h1>
        <p class="destino-descripcion text-muted my-4">{{ destino.descripcion }}</p>
        <h3 class="text-warning fw-semibold destino-precio">{{ destino.precio }} €</h3>
        <button class="btn btn-hero btn-lg mt-4 w-100" @click="reservarDestino">
          Reservar ahora
        </button>
        <router-link
          to="/destinos"
          class="btn btn-outline-secondary mt-3 text-center"
        >
          ← Volver a destinos
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="container text-center py-5">
    <h3 class="text-danger">Destino no encontrado</h3>
    <router-link to="/destinos" class="btn btn-primary mt-3">
      ← Volver al listado
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

const destinos = [
  {
    id: 1,
    nombre: 'París, Francia',
    descripcion:
      'La ciudad del amor y la luz. Ideal para escapadas románticas.',
    precio: 799,
    imagen:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    nombre: 'Tokyo, Japón',
    descripcion:
      'Una experiencia urbana y cultural única en el corazón de Asia.',
    precio: 1299,
    imagen:
      'https://images.unsplash.com/photo-1511732351544-895952bd2f97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    nombre: 'Málaga, España',
    descripcion: 'Sol, playa, cultura y pescaíto frito. ¡Pa qué más!',
    precio: 499,
    imagen:
      'https://images.unsplash.com/photo-1604579371775-6df2b4eb595f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    nombre: 'Nueva York, EE. UU.',
    descripcion:
      'La ciudad que nunca duerme, ideal para aventuras urbanas.',
    precio: 1399,
    imagen:
      'https://images.unsplash.com/photo-1549921296-3a6b52e5797d?auto=format&fit=crop&w=800&q=80',
  },
]
const route = useRoute()
const id = parseInt(route.params.id)
const destino = computed(() => destinos.find((d) => d.id === id))

function reservarDestino() {

  if (destino.value) {
    carrito.añadirReserva(destino.value)  // Añade el destino al carrito
    alert(`Destino añadido al carrito: ${destino.value.nombre}`)
  }
}
</script>

<style scoped>
.destino-imagen {
  border-radius: 15px;
  object-fit: cover;
  max-height: 400px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(255, 111, 60, 0.4);
}

.destino-nombre {
  font-family: 'Poppins', sans-serif;
  color: #ff6f3c;
  font-size: 2.5rem;
  text-shadow: 0 1px 10px rgba(255, 111, 60, 0.5);
}

.destino-descripcion {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

.destino-precio {
  font-family: 'Poppins', sans-serif;
}

.btn-hero {
  background-color: #1b263b;
  color: #ffc857;
  font-weight: 600;
  border-radius: 50px;
  transition: background-color 0.3s ease;
}

.btn-hero:hover {
  background-color: #ffc857;
  color: #1b263b;
  box-shadow: 0 0 15px #ffc857aa;
}
</style>
