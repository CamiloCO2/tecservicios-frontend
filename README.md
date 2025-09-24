# TecServicios - Frontend (Modular + Acerca & Contacto)

Sitio estático con **HTML + CSS + JavaScript (ES Modules)**.

## Estructura
```
tecservicios-frontend/
├─ index.html
├─ servicios.html
├─ detalle.html
├─ acerca.html
├─ contacto.html
├─ admin/
│  ├─ login.html
│  └─ dashboard.html
├─ components/
└─ assets/
   ├─ css/
   │  ├─ base/{variables.css, utilities.css}
   │  ├─ components/{navbar.css, cards.css}
   │  ├─ pages/{home.css, catalogo.css, detalle.css, admin.css, acerca.css, contacto.css}
   │  └─ styles.css
   ├─ js/
   │  ├─ core/{api.js, store.js, format.js, dom.js}
   │  ├─ pages/{home.js, catalogo.js, detalle.js, login.js, dashboard.js, acerca.js, contacto.js}
   │  └─ app.js
   ├─ data/servicios.json
   └─ img/logo.svg
```

## Cómo ejecutar
- Usa **Live Server** o publica en **GitHub Pages**.
- **Login demo:** `admin@tecservicios.com` / `123456`

> Nota: abrir con `file://` puede bloquear el `fetch` del JSON; sirve la carpeta o usa Pages.
