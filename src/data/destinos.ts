export type Categoria = 'Playa' | 'Ciudad' | 'Cultura' | 'Aventura' | 'Romántico'

export interface Destino {
  id: number
  nombre: string
  pais: string
  descripcion: string
  precio: number
  categoria: Categoria
  duracion: number // días recomendados
  valoracion: number // 1-5
  imagen: string
  imagenes: string[] // galería para la ficha de detalle
}

// Imágenes de stock (Lorem Picsum, con seed fija) mientras no haya un backend/API
// de imágenes real. Cada destino tiene una seed única así que cada tarjeta
// carga una foto distinta y estable (nunca un 404).
function galeria(seed: string): string[] {
  return [
    `https://picsum.photos/seed/${seed}-1/900/650`,
    `https://picsum.photos/seed/${seed}-2/900/650`,
    `https://picsum.photos/seed/${seed}-3/900/650`,
  ]
}

// Fuente única de datos de destinos (mockeados). Cuando tengáis backend/API,
// este archivo es el que hay que sustituir por la llamada a axios.
export const destinos: Destino[] = [
  {
    id: 1,
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad del amor y la luz. Ideal para escapadas románticas junto al Sena.',
    precio: 799,
    categoria: 'Romántico',
    duracion: 4,
    valoracion: 4.8,
    imagen: galeria('paris-francia')[0],
    imagenes: galeria('paris-francia'),
  },
  {
    id: 2,
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Una experiencia urbana y cultural única en el corazón de Asia.',
    precio: 1299,
    categoria: 'Ciudad',
    duracion: 6,
    valoracion: 4.7,
    imagen: galeria('tokio-japon')[0],
    imagenes: galeria('tokio-japon'),
  },
  {
    id: 3,
    nombre: 'Málaga',
    pais: 'España',
    descripcion: 'Sol, playa, cultura y pescaíto frito. ¡Pa qué más!',
    precio: 499,
    categoria: 'Playa',
    duracion: 5,
    valoracion: 4.5,
    imagen: galeria('malaga-espana')[0],
    imagenes: galeria('malaga-espana'),
  },
  {
    id: 4,
    nombre: 'Nueva York',
    pais: 'EE. UU.',
    descripcion: 'La ciudad que nunca duerme, ideal para aventuras urbanas.',
    precio: 1399,
    categoria: 'Ciudad',
    duracion: 5,
    valoracion: 4.6,
    imagen: galeria('nueva-york-eeuu')[0],
    imagenes: galeria('nueva-york-eeuu'),
  },
  {
    id: 5,
    nombre: 'Roma',
    pais: 'Italia',
    descripcion: 'Historia, arte y pasta en cada esquina. La cuna del Imperio Romano.',
    precio: 899,
    categoria: 'Cultura',
    duracion: 4,
    valoracion: 4.7,
    imagen: galeria('roma-italia')[0],
    imagenes: galeria('roma-italia'),
  },
  {
    id: 6,
    nombre: 'Londres',
    pais: 'Reino Unido',
    descripcion: 'Clásico y moderno a la vez. Big Ben, té y mucha cultura.',
    precio: 1099,
    categoria: 'Ciudad',
    duracion: 5,
    valoracion: 4.4,
    imagen: galeria('londres-reino-unido')[0],
    imagenes: galeria('londres-reino-unido'),
  },
  {
    id: 7,
    nombre: 'Sídney',
    pais: 'Australia',
    descripcion: 'Surf, sol y la Ópera más famosa del mundo.',
    precio: 1799,
    categoria: 'Playa',
    duracion: 7,
    valoracion: 4.6,
    imagen: galeria('sidney-australia')[0],
    imagenes: galeria('sidney-australia'),
  },
  {
    id: 8,
    nombre: 'Estambul',
    pais: 'Turquía',
    descripcion: 'Un puente entre Asia y Europa. Historia y gastronomía brutal.',
    precio: 849,
    categoria: 'Cultura',
    duracion: 5,
    valoracion: 4.5,
    imagen: galeria('estambul-turquia')[0],
    imagenes: galeria('estambul-turquia'),
  },
  {
    id: 9,
    nombre: 'Santorini',
    pais: 'Grecia',
    descripcion: 'Casas blancas, atardeceres de postal y el Egeo a tus pies.',
    precio: 1099,
    categoria: 'Romántico',
    duracion: 6,
    valoracion: 4.9,
    imagen: galeria('santorini-grecia')[0],
    imagenes: galeria('santorini-grecia'),
  },
  {
    id: 10,
    nombre: 'Bali',
    pais: 'Indonesia',
    descripcion: 'Playas, templos y arrozales. El paraíso tropical por excelencia.',
    precio: 1499,
    categoria: 'Playa',
    duracion: 8,
    valoracion: 4.8,
    imagen: galeria('bali-indonesia')[0],
    imagenes: galeria('bali-indonesia'),
  },
  {
    id: 11,
    nombre: 'Reikiavik',
    pais: 'Islandia',
    descripcion: 'Glaciares, volcanes y auroras boreales. Naturaleza en estado puro.',
    precio: 1599,
    categoria: 'Aventura',
    duracion: 6,
    valoracion: 4.7,
    imagen: galeria('reikiavik-islandia')[0],
    imagenes: galeria('reikiavik-islandia'),
  },
  {
    id: 12,
    nombre: 'Marrakech',
    pais: 'Marruecos',
    descripcion: 'Zocos, especias y el bullicio de la plaza Jemaa el-Fna.',
    precio: 649,
    categoria: 'Cultura',
    duracion: 5,
    valoracion: 4.3,
    imagen: galeria('marrakech-marruecos')[0],
    imagenes: galeria('marrakech-marruecos'),
  },
]

export const categorias: Categoria[] = ['Playa', 'Ciudad', 'Cultura', 'Aventura', 'Romántico']
