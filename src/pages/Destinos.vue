<template>
  <div class="destinos-page">
    <!-- Cabecera -->
    <section class="destinos-hero text-white text-center">
      <div class="container py-5">
        <h1 class="fw-bold mb-2">Explora nuestros destinos</h1>
        <p class="lead mb-0">{{ destinos.length }} experiencias esperándote por el mundo</p>
      </div>
    </section>

    <div class="container filtros-wrapper">
      <!-- Barra de filtros -->
      <div class="filtros-card shadow">
        <div class="row g-3 align-items-end">
          <div class="col-12 col-lg-4">
            <label class="form-label filtro-label">
              <i class="fas fa-magnifying-glass me-2"></i>Buscar
            </label>
            <div class="input-group input-group-buscar">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input
                type="text"
                class="form-control"
                v-model="filtro.texto"
                placeholder="Ej: París, Málaga, Bali..."
              />
              <button
                v-if="filtro.texto"
                class="input-group-text btn-limpiar-texto"
                @click="filtro.texto = ''"
                type="button"
                aria-label="Borrar búsqueda"
              >
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>

          <div class="col-12 col-md-7 col-lg-4">
            <label class="form-label filtro-label">
              <i class="fas fa-euro-sign me-2"></i>Rango de precio
              <span class="precio-valor">{{ filtro.precio[0] }}€ - {{ filtro.precio[1] }}€</span>
            </label>
            <Slider
              class="vue-slider"
              v-model="filtro.precio"
              :min="precioMinGlobal"
              :max="precioMaxGlobal"
              :step="10"
              :tooltips="false"
            />
          </div>

          <div class="col-8 col-md-3 col-lg-3">
            <label class="form-label filtro-label">
              <i class="fas fa-arrow-down-wide-short me-2"></i>Ordenar por
            </label>
            <select class="form-select selector-orden" v-model="orden">
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="valoracion">Mejor valorados</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>

          <div class="col-4 col-md-2 col-lg-1 d-grid">
            <button
              class="btn btn-limpiar-filtros"
              type="button"
              :disabled="!hayFiltrosActivos"
              @click="limpiarFiltros"
              title="Limpiar filtros"
            >
              <i class="fas fa-rotate-left"></i>
            </button>
          </div>
        </div>

        <!-- Píldoras de categoría -->
        <div class="categorias-pills mt-3">
          <button
            class="pill"
            :class="{ activa: filtro.categoria === null }"
            @click="filtro.categoria = null"
          >
            Todos
          </button>
          <button
            v-for="cat in categorias"
            :key="cat"
            class="pill"
            :class="{ activa: filtro.categoria === cat }"
            @click="filtro.categoria = filtro.categoria === cat ? null : cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Contador de resultados -->
      <div class="d-flex justify-content-between align-items-center mt-4 mb-3">
        <p class="resultados-count mb-0">
          <strong>{{ destinosOrdenados.length }}</strong>
          {{ destinosOrdenados.length === 1 ? 'destino encontrado' : 'destinos encontrados' }}
        </p>
      </div>

      <!-- Resultados -->
      <div class="row g-4 pb-5">
        <div class="col-lg-4 col-md-6" v-for="destino in destinosOrdenados" :key="destino.id">
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

        <div v-if="destinosOrdenados.length === 0" class="col-12 text-center py-5">
          <i class="fas fa-compass fa-3x mb-3 icono-vacio"></i>
          <h4>No hay destinos que coincidan con tu búsqueda</h4>
          <p class="text-muted">Prueba a ajustar los filtros o el rango de precio.</p>
          <button class="btn btn-brand mt-2" @click="limpiarFiltros">Limpiar filtros</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import TarjetaDestino from '../components/TarjetaDestino.vue'
import { destinos, categorias, type Categoria } from '../data/destinos'

// Cálculo automático de límites globales
const precios = destinos.map((d) => d.precio)
const precioMinGlobal = Math.min(...precios)
const precioMaxGlobal = Math.max(...precios)

// Filtro reactivo
const filtro = reactive({
  texto: '',
  precio: [precioMinGlobal, precioMaxGlobal] as [number, number],
  categoria: null as Categoria | null,
})

const orden = ref<'relevancia' | 'precio-asc' | 'precio-desc' | 'valoracion' | 'nombre'>(
  'relevancia'
)

const hayFiltrosActivos = computed(
  () =>
    filtro.texto !== '' ||
    filtro.categoria !== null ||
    filtro.precio[0] !== precioMinGlobal ||
    filtro.precio[1] !== precioMaxGlobal ||
    orden.value !== 'relevancia'
)

function limpiarFiltros() {
  filtro.texto = ''
  filtro.categoria = null
  filtro.precio = [precioMinGlobal, precioMaxGlobal]
  orden.value = 'relevancia'
}

const destinosFiltrados = computed(() =>
  destinos.filter((d) => {
    const texto = `${d.nombre} ${d.pais}`.toLowerCase()
    const coincideTexto = texto.includes(filtro.texto.toLowerCase())

    const precioMin = Number(filtro.precio[0])
    const precioMax = Number(filtro.precio[1])
    const enRango = d.precio >= precioMin && d.precio <= precioMax

    const coincideCategoria = filtro.categoria === null || d.categoria === filtro.categoria

    return coincideTexto && enRango && coincideCategoria
  })
)

const destinosOrdenados = computed(() => {
  const lista = [...destinosFiltrados.value]
  switch (orden.value) {
    case 'precio-asc':
      return lista.sort((a, b) => a.precio - b.precio)
    case 'precio-desc':
      return lista.sort((a, b) => b.precio - a.precio)
    case 'valoracion':
      return lista.sort((a, b) => b.valoracion - a.valoracion)
    case 'nombre':
      return lista.sort((a, b) => a.nombre.localeCompare(b.nombre))
    default:
      return lista
  }
})
</script>

<style scoped>
.destinos-hero {
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-soft) 100%);
  font-family: var(--font-heading);
}

.filtros-wrapper {
  margin-top: -2.5rem;
  position: relative;
  z-index: 2;
}

.filtros-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-md) !important;
}

.filtro-label {
  font-weight: 600;
  color: var(--color-dark);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.precio-valor {
  color: var(--color-orange);
  font-weight: 700;
}

.input-group-buscar .input-group-text {
  background-color: #f4f5f9;
  border-right: none;
  color: var(--color-text-muted);
}
.input-group-buscar .form-control {
  border-left: none;
  border-right: none;
}
.input-group-buscar .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
.btn-limpiar-texto {
  background-color: #f4f5f9;
  border-left: none;
  cursor: pointer;
  color: var(--color-text-muted);
}
.btn-limpiar-texto:hover {
  color: var(--color-orange);
}

.selector-orden {
  border-radius: 10px;
}
.selector-orden:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 0.2rem rgba(255, 111, 60, 0.15);
}

.btn-limpiar-filtros {
  background-color: #f4f5f9;
  color: var(--color-dark);
  border: none;
  border-radius: 10px;
  height: 100%;
  min-height: 38px;
}
.btn-limpiar-filtros:hover:not(:disabled) {
  background-color: var(--color-dark);
  color: var(--color-gold);
}
.btn-limpiar-filtros:disabled {
  opacity: 0.4;
}

.categorias-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.pill {
  background: #f4f5f9;
  border: 1px solid transparent;
  color: var(--color-dark);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.45rem 1.1rem;
  border-radius: 50px;
  transition: all 0.2s ease;
}
.pill:hover {
  border-color: var(--color-orange);
}
.pill.activa {
  background-color: var(--color-orange);
  color: #fff;
  box-shadow: var(--shadow-orange);
}

.resultados-count {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
.resultados-count strong {
  color: var(--color-dark);
}

.icono-vacio {
  color: var(--color-orange);
  opacity: 0.6;
}

/* @vueform/slider se personaliza por variables CSS propias (no por clases
   tipo .vue-slider-rail, que son de otra librería y no existían en el DOM
   real — por eso antes salía con el estilo por defecto, feo y sin forma). */
.vue-slider {
  --slider-bg: #e6e7ef;
  --slider-connect-bg: var(--color-orange);
  --slider-height: 6px;
  --slider-radius: 999px;

  --slider-handle-bg: #ffffff;
  --slider-handle-border: 3px solid var(--color-orange);
  --slider-handle-width: 20px;
  --slider-handle-height: 20px;
  --slider-handle-radius: 999px;
  --slider-handle-shadow: 0 2px 6px rgba(27, 38, 59, 0.25);
  --slider-handle-shadow-active: 0 0 0 6px rgba(255, 111, 60, 0.18);
  --slider-handle-ring-color: rgba(255, 111, 60, 0.18);

  margin-top: 16px;
  margin-bottom: 4px;
}

/* ===== Responsive (móvil) ===== */
@media (max-width: 767.98px) {
  .filtros-wrapper {
    margin-top: -1.25rem;
  }

  .filtros-card {
    padding: 1.25rem;
    border-radius: var(--radius-md);
  }

  .destinos-hero .container {
    padding-top: 2.5rem !important;
    padding-bottom: 3.5rem !important;
  }

  .destinos-hero h1 {
    font-size: 1.8rem;
  }

  .categorias-pills {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
  }

  .pill {
    flex: 0 0 auto;
  }

  .btn-limpiar-filtros {
    width: 100%;
  }
}
</style>
