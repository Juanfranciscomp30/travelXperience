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
      <div class="col-md-4" v-for="destino in destinosFiltrados" :key="destino.id">
        <TarjetaDestino
          :id="destino.id"
          :nombre="destino.nombre"
          :descripcion="destino.descripcion"
          :precio="destino.precio"  
          :imagen="destino.imagen"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import TarjetaDestino from '../components/TarjetaDestino.vue'

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

    // Convertimos a número por seguridad
    const precioMin = Number(filtro.precio[0])
    const precioMax = Number(filtro.precio[1])

    const enRango = d.precio >= precioMin && d.precio <= precioMax

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