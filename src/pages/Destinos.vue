<template>
  <div class="container py-5">
    <h2 class="section-title text-center mb-5">Nuestros destinos exclusivos</h2>
    <div class="row g-4">
      <div
        v-for="destino in destinos"
        :key="destino.id"
        class="col-md-6 col-lg-4"
      >
        <div class="card shadow-sm h-100 destino-card">
          <img
            :src="destino.imagen"
            :alt="destino.nombre"
            class="card-img-top rounded-top"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary">{{ destino.nombre }}</h5>
            <p class="card-text text-muted flex-grow-1">
              {{ destino.descripcion }}
            </p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="precio text-warning fw-bold">{{ destino.precio }} €</span>
              <router-link
                :to="`/destinos/${destino.id}`"
                class="btn btn-outline-warning btn-sm"
              >
                Ver detalles
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const destinos = [
  {
    id: 1,
    nombre: 'París, Francia',
    descripcion: 'La ciudad del amor y la luz. Ideal para escapadas románticas.',
    precio: 799,
    imagen:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    nombre: 'Tokyo, Japón',
    descripcion: 'Una experiencia urbana y cultural única en el corazón de Asia.',
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
    descripcion: 'La ciudad que nunca duerme, ideal para aventuras urbanas.',
    precio: 1399,
    imagen:
      'https://images.unsplash.com/photo-1549921296-3a6b52e5797d?auto=format&fit=crop&w=800&q=80',
  },
]
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
</style>
