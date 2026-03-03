# Sistema de Gestión de Restaurante 🍽️

Un sistema integral de gestión para restaurantes que facilita la administración de pedidos, inventario, mesas y operaciones diarias.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [API Endpoints](#api-endpoints)
- [Configuración](#configuración)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- 📦 **Gestión de Inventario**: Control de ingredientes y stock
- 🛒 **Sistema de Pedidos**: Creación y seguimiento de órdenes
- 🪑 **Administración de Mesas**: Reservas y asignación de mesas
- 👥 **Gestión de Personal**: Control de empleados y roles
- 💰 **Sistema de Facturación**: Generación de recibos y reportes
- 📊 **Reportes y Estadísticas**: Análisis de ventas y desempeño
- 🔐 **Autenticación y Autorización**: Sistema de usuarios seguros
- 📱 **Interfaz Responsiva**: Acceso desde dispositivos móviles y desktop

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v16.0 o superior)
- npm o yarn
- MongoDB (o tu base de datos preferida)
- Git

## 📥 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Compkev22/restaurant_system.git
cd restaurant_system
```

### 2. Instalar Dependencias

```bash
npm install
```

O si usas yarn:

```bash
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=27017
DB_NAME=restaurant_system

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRE=7d

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña
```

### 4. Inicializar la Base de Datos

```bash
npm run seed
```

### 5. Iniciar el Servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🚀 Uso

### Inicio de Sesión

```bash
# URL de inicio de sesión
http://localhost:3000/login

# Credenciales de prueba
Usuario: admin@restaurant.com
Contraseña: admin123
```

### Operaciones Básicas

#### Crear un Nuevo Pedido
```bash
POST /api/orders
Content-Type: application/json

{
  "tableId": "mesa-001",
  "items": [
    {
      "menuItemId": "pizza-001",
      "quantity": 2,
      "notes": "Sin cebolla"
    }
  ]
}
```

#### Consultar Mesas Disponibles
```bash
GET /api/tables/available
```

#### Actualizar Estado de Pedido
```bash
PUT /api/orders/{orderId}
Content-Type: application/json

{
  "status": "delivered"
}
```

## 📁 Estructura del Proyecto

```
restaurant_system/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Table.js
│   │   ├── MenuItem.js
│   │   └── Inventory.js
│   ├── services/
│   ├── utils/
│   └── config/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript** - Interactividad
- **Bootstrap** - Framework CSS (opcional)

### Herramientas
- **Git** - Control de versiones
- **Postman** - Prueba de APIs
- **Jest** - Testing

## 🔌 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |

### Pedidos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/orders` | Listar pedidos |
| POST | `/api/orders` | Crear pedido |
| GET | `/api/orders/:id` | Obtener pedido |
| PUT | `/api/orders/:id` | Actualizar pedido |
| DELETE | `/api/orders/:id` | Eliminar pedido |

### Mesas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tables` | Listar mesas |
| GET | `/api/tables/available` | Mesas disponibles |
| POST | `/api/tables` | Crear mesa |
| PUT | `/api/tables/:id` | Actualizar mesa |

### Menú
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/menu` | Listar items de menú |
| POST | `/api/menu` | Crear item de menú |
| PUT | `/api/menu/:id` | Actualizar item |
| DELETE | `/api/menu/:id` | Eliminar item |

### Inventario
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/inventory` | Listar inventario |
| PUT | `/api/inventory/:id` | Actualizar stock |

## ⚙️ Configuración

### Base de Datos

Por defecto, el sistema usa MongoDB. Para cambiar la base de datos:

1. Instala el driver correspondiente
2. Actualiza `src/config/database.js`
3. Modifica los modelos según el nuevo esquema

### Rol de Usuarios

El sistema soporta los siguientes roles:

- **admin**: Acceso total al sistema
- **manager**: Gestión de pedidos y mesas
- **waiter**: Toma de pedidos
- **kitchen**: Preparación de pedidos
- **cashier**: Procesamiento de pagos

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Pruebas con cobertura
npm run test:coverage

# Pruebas en modo watch
npm run test:watch
```

## 📚 Documentación Adicional

Para más información, consulta:
- [Documentación de API](./docs/API.md)
- [Guía de Desarrollo](./docs/DEVELOPMENT.md)
- [Guía de Seguridad](./docs/SECURITY.md)

## 🐛 Reportar Errores

Si encuentras un bug, por favor:

1. Verifica que el error no haya sido reportado
2. Abre una nueva issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)

## 💡 Solicitar Características

Para sugerir nuevas características:

1. Abre una issue con la etiqueta `enhancement`
2. Describe la nueva funcionalidad
3. Explica el caso de uso

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Estándares de Código

- Usa camelCase para variables y funciones
- Mantén las funciones pequeñas y enfocadas
- Comenta código complejo
- Escribe pruebas unitarias
- Sigue la estructura de carpetas establecida

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Kevin Compean** - [@Compkev22](https://github.com/Compkev22)

## 🙏 Agradecimientos

- Agradecemos a todos los contribuidores
- Inspiración en mejores prácticas de desarrollo

## 📞 Contacto

Para preguntas o soporte:
- Email: contacto@restaurante.com
- Issues: [GitHub Issues](https://github.com/Compkev22/restaurant_system/issues)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!