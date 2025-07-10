<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center">Explora nuestros destinos</h2>

    <!-- Filtros -->
    <div class="row mb-4">
      <div class="col-md-4">
        <label class="form-label">Buscar por nombre</label>
        <input
          type="text"
          class="form-control"
          v-model="filtro.texto"
          placeholder="Ej: París, Málaga, Milan..."
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"
          >Rango de precios: {{ filtro.precio[0] }}€ - {{ filtro.precio[1] }}€</label
        >
       
        <Slider class="vue-slider"
          v-model="filtro.precio"
          :min="precioMinGlobal"
          :max="precioMaxGlobal"
          :step="10"
          :tooltip="true"
        />
      </div>
    </div>

    <!-- Resultados -->
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="destino in destinosFiltrados"
        :key="destino.id"
      >
        <div class="card h-100 shadow-sm">
          <img :src="destino.imagen" class="card-img-top" alt="Imagen destino" />
          <div class="card-body">
            <h5 class="card-title">{{ destino.nombre }}</h5>
            <p class="card-text">{{ destino.descripcion }}</p>
            <p class="card-text fw-bold">{{ destino.precio }} €</p>
            <router-link
              :to="`/destinos/${destino.id}`"
              class="btn-ver-mas w-100"
            >
              Ver más
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

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

// Cálculo automático de límites globales
const precios = destinos.map((d) => d.precio)
const precioMinGlobal = Math.min(...precios)
const precioMaxGlobal = Math.max(...precios)

// Filtro reactivo
const filtro = reactive({
  texto: '',
  precio: [precioMinGlobal, precioMaxGlobal], // rango en un array
})

// Filtro computado
const destinosFiltrados = computed(() =>
  destinos.filter((d) => {
    const coincideTexto = d.nombre
      .toLowerCase()
      .includes(filtro.texto.toLowerCase())
    const enRango = d.precio >= filtro.precio[0] && d.precio <= filtro.precio[1]
    return coincideTexto && enRango
  })
)
</script>

<style scoped>
.section-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #1b263b;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.destino-card {
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.destino-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(255, 111, 60, 0.4);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.precio {
  font-size: 1.2rem;
}

.btn-outline-warning {
  border-width: 2px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-outline-warning:hover {
  background-color: #ff6f3c;
  border-color: #ff6f3c;
  color: white;
  box-shadow: 0 0 15px #ff6f3caa;
}

.btn-ver-mas {
  background-color: #ff6f3c;
  border: none;
  text-decoration: none;
  color: white;
  font-weight: 600;
  border-radius: 30px;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 111, 60, 0.3);
}

.btn-ver-mas:hover {
  background-color: #e85c2b;
  box-shadow: 0 6px 15px rgba(255, 111, 60, 0.5);
  transform: scale(1.03);
}


.vue-slider {
  --slider-connect-bg: #ff6f3c;
  --slider-handle-bg: #ff6f3c;
  --slider-tooltip-bg: #1b263b;
  --slider-tooltip-color: #ffffff;

  height: 1.5rem;
  margin-top: 8px;
}

.vue-slider-rail {
  height: 6px;
  border-radius: 10px;
  background-color: #e0e0e0;
}

.vue-slider-handle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}


</style>