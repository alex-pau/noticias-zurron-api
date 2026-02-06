
# 📰 API Noticias Ayuntamiento de Zurrón

Backend desarrollado con **NestJS** y **MongoDB** para la gestión integral de noticias, secciones y comentarios. Este proyecto forma parte del trabajo final para la asignatura de **Acceso a Datos**.

## 🚀 Características principales
- **CRUD completo** de noticias con persistencia en MongoDB Atlas.
- **Paginación avanzada** optimizada para *Infinite Scroll* (carga inicial de 5 noticias).
- **Sistema de comentarios** embebido con validaciones estrictas (Regex para emails y longitudes mínimas).
- **Buscador dinámico** por título y autor mediante expresiones regulares (insensible a mayúsculas).
- **Gestión de secciones** dinámica que devuelve categorías e iconos únicos.
- **CORS configurado** para permitir peticiones desde entornos Angular (4200) e Ionic (8100).

## 🛠️ Tecnologías utilizadas
- [NestJS](https://nestjs.com/) - Framework progresivo de Node.js.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Base de datos NoSQL en la nube.
- [Mongoose](https://mongoosejs.com/) - Modelado de objetos para Node.js (ODM).
- [Class-validator](https://github.com/typestack/class-validator) & [Class-transformer](https://github.com/typestack/class-transformer) - Validación y transformación de datos.

## 📋 Requisitos previos
Es necesario tener instalado:
- **Node.js** (v18 o superior)
- **npm** o **yarn**
- Una cuenta en **MongoDB Atlas** (o una instancia local de MongoDB)

## ⚙️ Configuración del entorno
Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```env
URL=tu_url_de_mongodb_atlas
PORT=3000

```

## 🛠️ Instalación y ejecución

1. **Clonar el repositorio:**
```bash
git clone [https://github.com/tu-usuario/zurron-api.git](https://github.com/tu-usuario/zurron-api.git)
cd zurron-api

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Ejecutar en modo desarrollo:**
```bash
npm run start:dev

```


4. **Acceso:** La API estará escuchando en `http://localhost:3000`.

Aquí tienes la tabla de **Endpoints** actualizada incluyendo todos los métodos de tu controlador de manera detallada. Esta estructura es perfecta para el README porque permite a cualquier desarrollador (o a tu profesor) entender la API de un solo vistazo.

---

## 📡 Endpoints

Todos los endpoints tienen como base: `http://localhost:3000/noticias`

### 📰 Gestión de Noticias

| Método | Ruta | Descripción |
| --- | --- | --- |
| **GET** | `/` | Obtiene el listado completo de noticias sin paginar. |
| **GET** | `/page` | **Paginación:** Soporta `?page=X&limit=Y`. Por defecto 5 noticias. |
| **GET** | `/noticia/:id` | Obtiene el detalle de una noticia específica por su ID. |
| **POST** | `/` | Crea una nueva noticia. Requiere `NoticiaDto` en el body. |
| **PUT** | `/update/:id` | Actualiza una noticia existente por su ID. |
| **DELETE** | `/delete/:id` | Elimina una noticia de la base de datos. |

### 🔍 Búsqueda y Filtros

| Método | Ruta | Descripción |
| --- | --- | --- |
| **GET** | `/buscar` | Búsqueda por término (`?termino=...`). Filtra en título y autor. |
| **GET** | `/secciones` | Obtiene una lista única de todas las secciones e iconos usados. |
| **GET** | `/seccion/:seccion` | Filtra todas las noticias pertenecientes a una sección específica. |

### 💬 Comentarios

| Método | Ruta | Descripción |
| --- | --- | --- |
| **POST** | `/noticia/:id/comentario` | Añade un comentario al array de la noticia. Valida nombre, email y texto. |

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Siéntete libre de usarlo, modificarlo y distribuirlo.

---

**Desarrollado por:** [Alex Pau](https://github.com/alex-pau) - 2026