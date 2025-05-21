# Proyecto Docker con MongoDB, Backend y Frontend

Este proyecto consiste en una aplicación completa con contenedores Docker para:
- MongoDB como base de datos
- Backend en Node.js/Express (puerto 5000)
- Frontend en React (puerto 4000)

## Estructura del Proyecto

```
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        ├── index.js
        └── index.css
```

## Requisitos Previos

- Docker y Docker Compose instalados en tu sistema
- Git (opcional, para clonar el repositorio)

## Instrucciones de Uso

### 1. Iniciar la Aplicación

Para iniciar todos los servicios, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up
```

Para ejecutar en segundo plano:

```bash
docker-compose up -d
```

### 2. Acceder a la Aplicación

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017 (accesible desde herramientas como MongoDB Compass)

### 3. Detener la Aplicación

Para detener todos los servicios:

```bash
docker-compose down
```

Para detener y eliminar volúmenes (esto borrará los datos de MongoDB):

```bash
docker-compose down -v
```

## Desarrollo

### Modificar el Backend

El código del backend se encuentra en la carpeta `backend/`. Después de realizar cambios, necesitarás reconstruir el contenedor:

```bash
docker-compose build backend
docker-compose up -d
```

### Modificar el Frontend

El código del frontend se encuentra en la carpeta `frontend/`. Después de realizar cambios, necesitarás reconstruir el contenedor:

```bash
docker-compose build frontend
docker-compose up -d
```

## Características

- **Backend**: API RESTful con Express y MongoDB
- **Frontend**: Interfaz de usuario interactiva con React
- **Persistencia de Datos**: Los datos de MongoDB se mantienen en un volumen Docker

## Solución de Problemas

### Verificar Logs

Para ver los logs de un servicio específico:

```bash
docker-compose logs mongodb
docker-compose logs backend
docker-compose logs frontend
```

### Reiniciar un Servicio

```bash
docker-compose restart backend
```

---

Este proyecto fue creado como ejemplo de una aplicación con Docker, MongoDB, Express y React.