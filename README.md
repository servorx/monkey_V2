# 🐒 MonkeyV2 – Backend REST API

**MonkeyV2** es un backend modular desarrollado con **Node.js + Express**, diseñado como una API RESTful moderna, escalable y mantenible.  
Su propósito es servir como base para un sistema completo con arquitectura limpia, documentación Swagger, manejo de seguridad, y futura integración con ORM (Prisma o Sequelize) para persistencia en base de datos relacional (MySQL o PostgreSQL).

---

## 📘 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
4. [Estructura de Carpetas](#-estructura-de-carpetas)
5. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
6. [Instalación y Ejecución](#-instalación-y-ejecución)
7. [Configuración del Entorno](#-configuración-del-entorno)
8. [Middlewares Implementados](#-middlewares-implementados)
9. [Documentación de la API (Swagger)](#-documentación-de-la-api-swagger)
10. [Decisiones Técnicas](#-decisiones-técnicas)
11. [Roadmap y Futuras Implementaciones](#-roadmap-y-futuras-implementaciones)
12. [Autor](#-autor)

---

## 🧠 Descripción General

MonkeyV2 es un proyecto backend modular basado en **Express.js**, que busca implementar una estructura profesional y escalable para desarrollo backend con Node.js.  
El objetivo es combinar **simplicidad + buenas prácticas + arquitectura moderna**, con los siguientes enfoques:

- Modularidad clara entre capas (configuración, middlewares, rutas, controladores, servicios).
- Configuración de seguridad, CORS y limitación de peticiones (*rate limiting*).
- Documentación interactiva con **Swagger UI**.
- Preparado para integración con ORM moderno (**Prisma**) y validación de esquemas con **Zod**.
- Uso de entorno `.env` y ejecución en modo observador (`--watch`).

---

## ⚡ Características Principales

- 🔹 Servidor Express con estructura profesional.
- 🔹 Configuración de **middlewares personalizados** para seguridad y logging.
- 🔹 Soporte de **CORS dinámico**.
- 🔹 Limitador de peticiones con `express-rate-limit`.
- 🔹 Documentación API con **Swagger UI**.
- 🔹 Variables de entorno gestionadas con **dotenv**.
- 🔹 Logging HTTP con **morgan**.
- 🔹 Tipado limpio y estandarización de código.
- 🔹 Preparado para integrarse con **Prisma ORM** y **Zod** (validaciones de datos).

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura modular basada en **responsabilidad única**, inspirada en los principios de la **arquitectura hexagonal (Ports & Adapters)**.

**Capas actuales:**
```text
┌───────────────────────────────────────────────────────┐
│ API Layer                                             │ 
│ (Express, Rutas, Swagger, Middlewares)                │
├───────────────────────────────────────────────────────┤
│ Service Layer                                         │
│ (Lógica de negocio, validaciones, casos de uso)       │
├───────────────────────────────────────────────────────┤
│ Data Layer (futuro)                                   │
│ (ORM Prisma/Sequelize, conexión DB, repositorios)     │
└───────────────────────────────────────────────────────┘
```

> 🎯 La meta es mantener una separación limpia entre lógica de negocio y persistencia, permitiendo escalar a una API completa sin romper dependencias.

---

## 📁 Estructura de Carpetas

```bash
├── 📁 backend
│   ├── 📁 data
│   │   └── 📄 ddl.sql
│   ├── 📁 middlewares
│   │   ├── 📄 cors.js
│   │   ├── 📄 rateLimit.js
│   │   └── 📄 seeders.js
│   ├── 📁 prisma
│   │   └── 📄 schema.prisma
│   ├── 📁 repositories
│   │   └── ⚙️ .gitkeep
│   ├── 📁 routes
│   │   └── ⚙️ .gitkeep
│   ├── 📁 schemas
│   │   └── ⚙️ .gitkeep
│   ├── 📁 services
│   │   └── ⚙️ .gitkeep
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 app.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 server.js
│   ├── 📄 swagger.js
│   └── ⚙️ swagger_output.json
├── 📁 frontend
│   ├── 📁 api
│   │   └── ⚙️ .gitkeep
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 components
│   │   │   └── ⚙️ .gitkeep
│   │   ├── 📁 hooks
│   │   │   └── ⚙️ .gitkeep
│   │   ├── 📁 layouts
│   │   │   └── ⚙️ .gitkeep
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── ⚙️ .gitignore
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 tailwind.config.js
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   └── 📄 vite.config.ts
├── ⚙️ .gitignore
├── 📝 README.md
└── 📝 TODO.md
```

--- 

## 📝 Tecnologías Utilizadas

| Tipo                        | Tecnología / Librería                                                  | Descripción                               |
| --------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| **Core**                    | [Node.js](https://nodejs.org/)                                         | Entorno de ejecución                      |
| **Framework**               | [Express.js](https://expressjs.com/)                                   | Servidor HTTP                             |
| **Documentación**           | [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) | Documentación visual de la API            |
| **Validación entorno**      | [dotenv](https://www.npmjs.com/package/dotenv)                         | Variables de entorno                      |
| **Seguridad / Performance** | [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Límite de peticiones                      |
| **Logs HTTP**               | [morgan](https://www.npmjs.com/package/morgan)                         | Registro de peticiones                    |
| **CORS**                    | [cors](https://www.npmjs.com/package/cors)                             | Control de acceso por dominio             |
| **(Próximamente)**          | [Prisma](https://www.prisma.io/)                                       | ORM moderno para base de datos            |
| **(Opcional)**              | [Zod](https://github.com/colinhacks/zod)                               | Validación de esquemas (entradas/salidas) |
| **(conexiones)**            | [mysql2](https://www.npmjs.com/package/mysql2)                         | Conexión a base de datos                  |
| **Variables de entorno**    | [dotenv](https://www.npmjs.com/package/dotenv)                         | Variables de entorno                      |
| **Hasheo de contraseñas**   | [bcrypt](https://www.npmjs.com/package/bcrypt)                         | Contraseñas seguras                       |
| **Autenticación**           | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)             | Autenticación de usuarios                 |

---

## 📝 Instalación y Ejecución

### 📦 Clonar repositorio

```bash
git clone https://github.com/servorx/monkey_V2.git
cd monkey_V2
code .
```

### 📦 Instalar dependencias

```bash
npm install
```

### 📦 Ejecutar aplicación

```bash
npm run dev
```

---

## 📝 Configuración del Entorno

### Crear .env con las siguientes variables

```bash
DATABASE_URL=mysql://user:password@localhost:3306/db_name
SECRET_JWT_KEY=your_jwt_secret
PORT=1234
SALT_ROUNDS=10
```

---

## 📝 Middlewares Implementados

| Middleware | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cors`     | Permite la configuración de las opciones de CORS (Cross-Origin Resource Sharing) en el servidor.
| `rateLimit` | Limita el número de peticiones a un determinado número de peticiones por IP.
| `seeders`  | Inicializa los datos de la base de datos.
---

## 📝 Documentación de la API (Swagger)
Swagger genera documentación automática a partir de swagger_output.json.

- **RUTA**: http://localhost:4000/api-docs
- **Archivo fuente**: swagger_output.json
- **Middleware**: swagger-ui-express

## 📝 Decisiones Técnicas

- Uso de ESM (ECMAScript Modules) en lugar de CommonJS ("type": "module" en package.json).
- Evitar dependencias globales.
- Preferencia por middlewares reutilizables y configuración modular.
- Proyecto preparado para futura integración con ORM (Prisma preferido sobre Sequelize por DX, tipado y migraciones limpias).
- Configuración lista para despliegue en contenedor Docker (en desarrollo).

--- 

## 🚀 Roadmap y Futuras Implementaciones

✅ Etapa actual:

- Configuración base del servidor Express.
- Integración de middlewares de seguridad y logging.
- Documentación con Swagger.

🧩 Siguientes pasos:

- Implementar arquitectura de rutas, controladores y servicios.
- Integrar Prisma ORM y configurar conexión a MySQL.
- Crear sistema de autenticación JWT.
- Añadir Zod para validaciones de esquemas.
- Configurar tests automáticos con Jest.
- Desplegar API en contenedor Docker con docker-compose.yml.

---

## 👤 Autor

Ángel Pinzón
- Desarrollador backend y fullstack en formación.
Apasionado por las arquitecturas limpias, Node.js, C#, y el desarrollo de software escalable.

📧 Contacto: [Tu correo o GitHub aquí]
🌐 GitHub: github.com/<tu_usuario>



# 🐒 MonkeyV2 – Frontend Web App

**MonkeyV2 Frontend** es una aplicación web moderna desarrollada con **React**, enfocada en la práctica de arquitectura modular, consumo de APIs RESTful, gestión de autenticación y diseño con **TailwindCSS**.  
Sirve como el cliente visual del backend implementado en **Node.js + Express**, documentado con Swagger y protegido por JWT.

---

## 📘 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
4. [Estructura de Carpetas](#-estructura-de-carpetas)
5. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
6. [Instalación y Ejecución](#-instalación-y-ejecución)
7. [Configuración de Entorno](#-configuración-de-entorno)
8. [Estándares de Código y Nomenclatura](#-estándares-de-código-y-nomenclatura)
9. [Comunicación con el Backend](#-comunicación-con-el-backend)
10. [Gestión de Estado y Contexto](#-gestión-de-estado-y-contexto)
11. [Rutas y Navegación](#-rutas-y-navegación)
12. [Roadmap de Desarrollo](#-roadmap-de-desarrollo)
13. [Autor](#-autor)

---

## 🧠 Descripción General

El frontend de **MonkeyV2** tiene como objetivo ofrecer una interfaz fluida, moderna y responsiva para los usuarios que interactúan con la API del proyecto.  
Además de servir como entorno de práctica para consolidar conocimientos en **React**, **hooks**, **componentización**, **autenticación con JWT** y **comunicación con API**, este proyecto busca simular un entorno de desarrollo real con buenas prácticas profesionales.

> 🎯 Su enfoque es didáctico y técnico: crear una base sólida para integrar todas las capas de una aplicación fullstack moderna.

---

## ⚡ Características Principales

- 🧩 Aplicación SPA con **React + Vite**.
- 🎨 Estilos modernos con **TailwindCSS**.
- 🔑 Sistema de **autenticación JWT** conectado al backend Express.
- 🔄 Consumo de API con **Axios**.
- 🌐 Configuración de variables de entorno con `.env`.
- 🧭 Navegación con **React Router DOM**.
- 🪝 Custom Hooks y Context API para estado global.
- ⚙️ Arquitectura modular y escalable.
- 🔍 Validaciones con **Zod** (en formularios).
- 🧰 Estructura lista para escalabilidad (Dashboard, Auth, API, Contexts, Components).

---

## 🏗️ Arquitectura del Proyecto

La estructura sigue un enfoque de **arquitectura por funcionalidades (feature-based architecture)**, inspirada en **clean architecture frontend** y **vertical slicing**.  
Esto facilita la escalabilidad, la separación de responsabilidades y el mantenimiento del código.

```text
┌────────────────────────────┐
│        Presentación        │
│ (Componentes, Layouts, UI) │
├────────────────────────────┤
│       Lógica/UI State      │
│ (Hooks, Context, Reducers) │
├────────────────────────────┤
│        Data Layer          │
│ (Servicios, API Calls)     │
└────────────────────────────┘
```

---

## 📝 Tecnologías Utilizadas

| Tipo              | Librería / Framework                            | Descripción                      |
| ----------------- | ----------------------------------------------- | -------------------------------- |
| **Core**          | [React](https://react.dev/)                     | Framework principal              |
| **Empaquetador**  | [Vite](https://vitejs.dev/)                     | Dev server rápido                |
| **Estilos**       | [TailwindCSS](https://tailwindcss.com/)         | Framework CSS                    |
| **Ruteo**         | [React Router DOM](https://reactrouter.com/)    | Navegación SPA                   |
| **HTTP Client**   | [Axios](https://axios-http.com/)                | Peticiones a API                 |
| **Icons**         | [Lucide React](https://lucide.dev/)             | Iconos SVG modernos              |
| **Animaciones**   | [Framer Motion](https://www.framer.com/motion/) | Animaciones fluidas              |

---