<template>
  <div>
    <h2>Listado de Destinos</h2>

    <ul>
      <li v-for="d in destinos" :key="d.id">
        {{ d.nombre }} - {{ d.precio }}€
      </li>
    </ul>

    <h3>Añadir destino</h3>
    <form @submit.prevent="crearDestino">
      <input v-model="nuevo.nombre" placeholder="Nombre">
      <input v-model="nuevo.descripcion" placeholder="Descripción">
      <input v-model="nuevo.precio" type="number" placeholder="Precio">
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      destinos: [],
      nuevo: {
        nombre: "",
        descripcion: "",
        precio: ""
      }
    };
  },

  // Aquí va el GET
  mounted() {
    axios.get("http://localhost:8080/api/destinos")
      .then(res => {
        this.destinos = res.data;
      });
  },

  methods: {
    // Aquí va el POST
    crearDestino() {
      axios.post("http://localhost:8080/api/destinos", this.nuevo)
        .then(() => {
          this.destinos.push({ ...this.nuevo });
          this.nuevo = { nombre: "", descripcion: "", precio: "" };
        });
    }
  }
};
</script>
