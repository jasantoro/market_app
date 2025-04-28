
# Market App - Frutas y Verduras 🍎🥕

Marketplace web para venta de frutas y verduras, con panel de administración, estadísticas y funcionalidad de app móvil vía PWA.

---

## 📦 Estructura del Proyecto

- **Backend (Express API)** - `market_backend/`
- **Frontend (React + PWA)** - `market_react_pwa/`

---

## 🚀 Cómo levantar la app

### 1. Backend (API)
```bash
cd market_backend
npm install
npm start
```
La API se levanta en: `http://localhost:4000`

### 2. Frontend (React PWA)
```bash
cd market_react_pwa
npm install
npm start
```
La app se abre en: `http://localhost:3000`

> Se puede instalar como app en Android/iOS desde el navegador (PWA)

---

## 👤 Usuarios de Prueba

| Rol    | Email               | Password |
|--------|---------------------|----------|
| Cliente | user@example.com   | 1234     |
| Admin   | admin@example.com  | admin    |

---

## 🔒 Funcionalidades

### Cliente
- Registro / login
- Navegación por productos
- Carrito + checkout
- App instalable (PWA)

### Admin
- Ver pedidos (Backoffice)
- Marcar pedidos como completados
- Dashboard con métricas y gráficas
- Filtros por fecha y usuarios más compradores

---

## 📊 Tecnologías

- React + React Router
- Express.js + JSON backend
- PWA support (service worker + manifest)
- Chart.js para visualizaciones

---

## 📁 Estructura de carpetas

```
market_backend/
├── server.js
├── package.json

market_react_pwa/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── App.js
│   └── pages/
├── package.json
```

---

## 🧪 Para probar como app

1. Visitá `http://localhost:3000` en tu celular
2. Usá “Agregar a la pantalla de inicio” desde el navegador
3. Usalo como si fuera una app nativa

---

## ✅ Siguientes pasos

- Subida a Play Store/App Store vía React Native (opcional)
- Base de datos real (MongoDB, PostgreSQL)
- Roles avanzados, notificaciones, reportes

---

Desarrollado con ❤️ por tu asistente AI
