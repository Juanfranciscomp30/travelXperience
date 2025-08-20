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
    descripcion: 'La ciudad del amor y la luz. Ideal para escapadas románticas.',
    precio: 799,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg',
  },
  {
    id: 2,
    nombre: 'Tokyo, Japón',
    descripcion: 'Una experiencia urbana y cultural única en el corazón de Asia.',
    precio: 1299,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Tokyo_Tower_and_around_Skyscrapers.jpg',
  },
  {
    id: 3,
    nombre: 'Málaga, España',
    descripcion: 'Sol, playa, cultura y pescaíto frito. ¡Pa qué más!',
    precio: 499,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/45/La_Malagueta_M%C3%A1laga_Spain.jpg',
  },
  {
    id: 4,
    nombre: 'Nueva York, EE. UU.',
    descripcion: 'La ciudad que nunca duerme, ideal para aventuras urbanas.',
    precio: 1399,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Times_Square%2C_New_York_City_%28HDR%29.jpg',
  },
  {
    id: 5,
    nombre: 'Roma, Italia',
    descripcion: 'Historia, arte y pasta en cada esquina. La cuna del Imperio Romano.',
    precio: 899,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
  },
  {
    id: 6,
    nombre: 'Londres, Reino Unido',
    descripcion: 'Clásico y moderno a la vez. Big Ben, té y mucha cultura.',
    precio: 1099,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/London_Eye_Twilight_April_2006.jpg',
  },
  {
    id: 7,
    nombre: 'Sídney, Australia',
    descripcion: 'Surf, sol y la Ópera más famosa del mundo.',
    precio: 1799,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Sydney_Opera_House_-_Dec_2008.jpg',
  },
  {
    id: 8,
    nombre: 'Estambul, Turquía',
    descripcion: 'Un puente entre Asia y Europa. Historia y gastronomía brutal.',
    precio: 849,
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Bosphorus_Bridge%2C_Istanbul_2013.jpg',
  }
];

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
