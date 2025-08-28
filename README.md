# Product Manager App

Mini CRM para gestionar productos con **Angular 19**, **Angular Material (MDC)** y **NgRx**.  
UI con estilo **glass**, diálogos accesibles y _snackbars_ con acción **Deshacer**.

<!-- (Opcional) agrega una captura en docs/screenshot.png y descomenta la línea -->
<!-- ![screenshot](./docs/screenshot.png) -->

---

## ✨ Características

- **CRUD** de productos (crear, listar, editar, eliminar).
- **Diálogos Material** con tema _glass_ (editar y confirmar eliminación).
- **Snackbars** con **Deshacer** (crear/editar/eliminar).
- **Barra de progreso** mientras carga el listado inicial.
- **Standalone Components** + **NgRx Store/Effects**.

---

## 🛠️ Tech Stack

Angular 19, RxJS · Angular Material (MDC) · NgRx (Store + Effects) · TypeScript, SCSS · JSON Server

---

## 🚀 Inicio rápido

```bash
# 1) Clonar e instalar
git clone https://github.com/pinzii/product-manager-app.git
cd product-manager-app
npm install


Crea un archivo db.json en la raíz del proyecto con este contenido:

{
  "products": [
    { "id": 1, "name": "Laptop",  "price": 3500000 },
    { "id": 2, "name": "Monitor", "price": 950000  }
  ]
}

Inicia la API local con JSON Server:

npx json-server --watch db.json --port 3000
# La API queda en http://localhost:3000  (endpoint base: /products)

En otra terminal, levanta la aplicación:

npm start
# Abre http://localhost:4200
Por defecto la app consume http://localhost:3000/products.


🧩 Estructura

src/app/
├─ core/                 # notificaciones, interceptores, etc.
├─ auth/                 # auth mínima (servicio + guard opcional)
├─ products/
│  ├─ components/
│  │  ├─ product-form/               # formulario crear/editar
│  │  ├─ confirm-dialog/             # diálogo de confirmación
│  │  └─ product-form/edit-product-dialog/ # diálogo de edición (glass)
│  ├─ models/
│  ├─ service/           # ProductService (HTTP)
│  └─ state/             # NgRx (actions, reducer, effects, selectors)
└─ ...


🔌 Endpoints (JSON Server)

GET /products

GET /products/:id

POST /products

PUT /products/:id

DELETE /products/:id

Modelo:

export interface Product {
  id?: number | string;
  name: string;
  price: number;
}


🎨 UI/UX

Tema glass en diálogos y cards (blur, bordes y sombras sutiles).

Snackbars con clases por estado (success/info/warn/error) y duración/posición coherentes.

Accesibilidad básica: labels, tooltips, foco visible.

📜 Scripts útiles

{
  "start": "ng serve",
  "build": "ng build",
  "api": "json-server --watch db.json --port 3000",
  "lint": "ng lint",
  "format": "prettier --write \"src/**/*.{ts,html,scss}\""
}


🗺️ Roadmap (ideas futuras)

Búsqueda/orden/paginación en tabla (Material).

Loader global (barra superior) vía interceptor.

Tests (unit/e2e).

Deploy (GitHub Pages / Vercel + API mock).

PWA.

🧑‍💻 Autor

pinzii – https://github.com/pinzii
Si te sirve, ¡deja una ⭐ al repo!
```
