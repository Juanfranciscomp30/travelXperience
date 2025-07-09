<template>
  <div>
    <!-- Hero con fondo degradado y texto grande -->
    <section
      class="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white"
    >
      <div class="container">
        <h1 class="display-3 fw-bold mb-3 hero-title">
          Descubre destinos que transforman tu vida
        </h1>
        <p class="lead hero-subtitle mb-4">
          Viaja con nosotros y vive experiencias exclusivas llenas de emoción y lujo.
        </p>
        <router-link to="/destinos" class="btn btn-hero px-5 py-3 shadow-lg">
          Explora destinos
        </router-link>
      </div>
    </section>

    <!-- Sección de beneficios con cards -->
    <section class="benefits-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5 section-title">¿Por qué elegirnos?</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card benefit-card h-100 text-center p-4 shadow-sm border-0">
              <div class="icon-wrapper mb-3 mx-auto">
                <i class="fas fa-gem"></i>
              </div>
              <h5 class="mb-2">Experiencias Premium</h5>
              <p>Viajes exclusivos diseñados para crear recuerdos inolvidables.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card benefit-card h-100 text-center p-4 shadow-sm border-0">
              <div class="icon-wrapper mb-3 mx-auto">
                <i class="fas fa-hand-holding-dollar"></i>
              </div>
              <h5 class="mb-2">Garantía de Precio</h5>
              <p>Las mejores ofertas con transparencia y sin sorpresas.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card benefit-card h-100 text-center p-4 shadow-sm border-0">
              <div class="icon-wrapper mb-3 mx-auto">
                <i class="fas fa-headset"></i>
              </div>
              <h5 class="mb-2">Soporte 24/7</h5>
              <p>Atención personalizada siempre que la necesites.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección llamada a la acción -->
    <section
      class="cta-section d-flex justify-content-center align-items-center text-center text-white py-5"
    >
      <div class="container">
        <h3 class="mb-4 fw-semibold cta-text">
          ¿Listo para comenzar tu aventura? Reserva hoy mismo y aprovecha
          ofertas exclusivas.
        </h3>
        <router-link to="/destinos" class="btn btn-cta btn-lg px-5 py-3 shadow">
          Ver destinos
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// No hay lógica aún
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  background: linear-gradient(135deg, #ff6f3c 0%, #ffc857 100%);
  font-family: 'Poppins', sans-serif;
}

.hero-title {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
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

.benefits-section {
  background-color: #f4f4f9;
  font-family: 'Poppins', sans-serif;
}

.section-title {
  font-weight: 700;
  color: #1b263b;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.benefit-card {
  background-color: white;
  border-radius: 15px;
}

.icon-wrapper {
  font-size: 3rem;
  color: #ff6f3c;
}

.cta-section {
  background: #1b263b;
  font-family: 'Poppins', sans-serif;
}

.cta-text {
  font-size: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.btn-cta {
  background-color: #ffc857;
  color: #1b263b;
  font-weight: 600;
  border-radius: 50px;
  transition: background-color 0.3s ease;
}

.btn-cta:hover {
  background-color: #ff6f3c;
  color: white;
  box-shadow: 0 0 20px #ff6f3caa;
}
</style>
