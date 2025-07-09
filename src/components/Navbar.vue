<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-navbar shadow-sm py-3">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">
        <i class="fas fa-plane-departure me-2"></i>TravelXperience
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto fw-semibold">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              active-class="active"
              exact
              >Inicio</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/destinos"
              class="nav-link"
              active-class="active"
              >Destinos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/carrito"
              class="nav-link position-relative"
              active-class="active"
            >
              Carrito
              <span
                v-if="carritoCount > 0"
                class="badge bg-warning text-dark rounded-pill carrito-badge"
                >{{ carritoCount }}</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

const carritoCount = computed(() => carrito.reservas.length)
</script>

<style scoped>
.bg-navbar {
  background-color: #1b263b;
  font-family: 'Poppins', sans-serif;
}

.navbar-brand {
  color: #ffc857;
  font-size: 1.5rem;
  letter-spacing: 1.2px;
  transition: color 0.3s ease;
}

.navbar-brand:hover {
  color: #ff6f3c;
  text-shadow: 0 0 8px #ff6f3caa;
}

.nav-link {
  color: #ffc857;
  margin-left: 1rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #ff6f3c;
  text-shadow: 0 0 6px #ff6f3caa;
}

.carrito-badge {
  font-size: 0.75rem;
  position: absolute;
  top: 0;
  right: -10px;
  padding: 3px 7px;
  box-shadow: 0 0 8px #ffc857aa;
}
</style>
