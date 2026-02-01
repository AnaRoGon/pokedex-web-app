# Pokedex Online en React
Aplicación web desarrollada con React que funciona como una Pokédex interactiva para explorar, filtrar y consultar detalles del mundo Pokémon en tiempo real.

El proyecto está disponible en la dirección: <https://poke-api-ana-rogon-react.netlify.app/>

# Características principales

## Pantalla de inicio
Una landing page visual que invita al usuario a sumergirse en la experiencia de la Pokédex.

![01](https://github.com/user-attachments/assets/d27cca4a-5500-49ae-94fd-74395ab8a4ef)

## Buscador y filtrado dinámico 
Permite explorar la lista de Pokémon con una funcionalidad de búsqueda por nombre y filtrado por tipos elementales. Los estados de búsqueda y filtros se mantienen mediante
`sessionStorage`para mejorar la experiencia de usuario durante la navegación.

![02](https://github.com/user-attachments/assets/97f13955-26fc-4a71-be87-adc4dacccecf)

## Visualización mediante Grid
Implementación de un sistema de rejilla (Grid) con paginación optimizada para mostrar los resultados de los Pokemon de forma clara y estilizada.

![03](https://github.com/user-attachments/assets/8bf7f30b-72c1-41be-8b28-92a2aeaa8d98)

## Pantalla de detalles
Consulta del detalle de cada Pokémon, mostrando sus estadísticas, habilidades, etc.

![04](https://github.com/user-attachments/assets/c15e2880-a03b-404c-9f4d-a764d550442e)

## Tecnologías utilizadas

Para el desarrollo de esta aplicación se destaca: 
* **React 19 & Vite**: Para un entorno de desarrollo rápido y una estructura de componentes moderna.
* **TanStack Query**: Para la gestión eficiente del estado asíncrono, caché y sincronización con la PokéAPI.
* **Axios**: Cliente HTTP para realizar las peticiones a la API externa de forma robusta.
* **PrimeReact**: Uso de una librería de componentes que nos permite reutilizar modelos de diseño que cuidan la accesibilidad y personalizarlos según nos interese.
* **Tailwind CSS**: Que permite integrar estilos de manera sencilla, cuidando la accesibilidad y el diseño general de la aplicación.
* **React Router**: Gestión de la navegación por rutas, incluyendo el uso de HashRouter para facilitar el despliegue.
* **Vitest & Testing Library**: Suite de pruebas para garantizar la calidad y estabilidad de los componentes y hooks.
  
## Levantar desarrollo
1. Clonar el repositorio.
   ```
   git clone https://github.com/AnaRoGon/pokedex-web-app.git
3. Editar el archivo `.en`con las variables de entorno que encontraremos en el archivo `.env.template`
5. Instalar las dependencias
   ```
   npm install   
7. Lanzar el servidor de desarrollo.
   ```
   npm run dev
