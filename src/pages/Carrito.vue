<template>
  <div class="container py-5">
    <h2 class="section-title text-center mb-5">Tu carrito de reservas</h2>

    <div v-if="carrito.reservas.length > 0">
      <ul class="list-group mb-4 shadow-sm">
        <li
          v-for="destino in carrito.reservas"
          :key="destino.id"
          class="list-group-item d-flex justify-content-between align-items-center border-0 mb-3 rounded shadow-sm"
        >
          <div class="d-flex align-items-center">
            <img
              :src="destino.imagen"
              :alt="destino.nombre"
              class="destino-thumb me-3 rounded"
            />
            <div>
              <h5 class="mb-1 text-primary">{{ destino.nombre }}</h5>
              <p class="mb-0 text-muted small">{{ destino.descripcion }}</p>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <span class="precio text-warning fw-bold me-3">{{ destino.precio }} €</span>
            <button
              class="btn btn-sm btn-danger btn-eliminar"
              @click="carrito.eliminarReserva(destino.id)"
            >
              Eliminar
            </button>
          </div>
        </li>
      </ul>

      <div class="d-flex justify-content-between align-items-center">
        <h4>Total: <span class="text-warning">{{ carrito.totalPrecio }} €</span></h4>
        <button class="btn btn-secondary btn-vaciar" @click="carrito.vaciarCarrito">
          Vaciar carrito
        </button>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h4>No hay reservas todavía.</h4>
      <router-link to="/destinos" class="btn btn-primary mt-3 px-4 py-2">
        Explorar destinos
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'
const carrito = useCarritoStore()
</script>

<style scoped>
.section-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #1b263b;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.destino-thumb {
  width: 70px;
  height: 50px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(255, 111, 60, 0.3);
}

.precio {
  font-size: 1.2rem;
}

.btn-eliminar {
  border-radius: 50px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-eliminar:hover {
  background-color: #ff6f3c;
  color: white;
  box-shadow: 0 0 10px #ff6f3caa;
}

.btn-vaciar {
  border-radius: 50px;
  font-weight: 600;
  background-color: #1b263b;
  color: #ffc857;
  transition: background-color 0.3s ease;
}

.btn-vaciar:hover {
  background-color: #ffc857;
  color: #1b263b;
  box-shadow: 0 0 15px #ffc857aa;
}
</style>
