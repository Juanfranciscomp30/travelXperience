<template>
  <div class="tarjeta-destino">
    <div class="imagen-wrapper">
      <img :src="imagen" :alt="titulo" class="imagen-destino" />
    </div>
    <div class="contenido">
      <h5 class="nombre">{{ nombre }}</h5>
      <h3 class="precio">{{ precioFormateado }}</h3>
      <p class="descripcion">{{ descripcion }}</p>
      <router-link :to="`/destinos/${id}`" class="btn-vermas">
        Ver más
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const { precio } = defineProps({
  id: [String, Number],
  nombre: String,
  precio: [String, Number],
  descripcion: String,
  imagen: String
})

const precioFormateado = computed(() =>
  Number(precio).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  })
)

</script>

<style scoped>
.tarjeta-destino {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tarjeta-destino:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.imagen-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.imagen-destino {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tarjeta-destino:hover .imagen-destino {
  transform: scale(1.05);
}

.contenido {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.titulo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffc857; /* dorado */
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.titulo:hover {
  color: #ff6f3c; /* naranja */
  text-shadow: 0 0 6px #ff6f3caa;
}

.descripcion {
  flex-grow: 1;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 12px;
}

.precio {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6f3c; /* naranja */
  text-shadow: 0 0 6px #ff6f3caa;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.precio:hover {
  color: #ffc857; /* dorado */
  text-shadow: 0 0 8px #ffc857aa;
}

.btn-vermas {
  display: inline-block;
  background-color: #1b263b; /* mismo que navbar */
  color: #ffc857; /* dorado */
  border: none;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.btn-vermas:hover {
  background-color: #ff6f3c; /* naranja */
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(255, 111, 60, 0.4);
}
</style>


