# APV Backend

API REST para APV (Administrador de Pacientes de Veterinaria). Gestiona cuentas de veterinarios, autenticación, confirmación y recuperación de cuentas, y operaciones sobre pacientes.

## Tecnologías y herramientas

- Node.js y npm
- Express 5
- MongoDB, con Mongoose como ODM
- JWT para autenticación y Nodemailer para correo SMTP

Se recomienda Node.js 22.12 o posterior. Para ejecutar la aplicación localmente también se necesita una instancia de MongoDB (local o MongoDB Atlas) y acceso a un servidor SMTP para enviar los correos de confirmación y recuperación.

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en esta carpeta y define las variables:

   ```dotenv
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   DB_URI=mongodb://127.0.0.1:27017/apv
   JWT_SECRET=reemplazar-por-un-secreto-largo-y-aleatorio
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=usuario-smtp
   SMTP_PASSWORD=contrasena-smtp
   ```

   - `DB_URI`: URI de conexión a MongoDB. La URI de ejemplo sirve para una instancia local; reemplázala por la URI de Atlas si corresponde.
   - `JWT_SECRET`: clave privada usada para firmar tokens. Usa un valor aleatorio y mantenlo fuera del control de versiones.
   - `FRONTEND_URL`: URL base del frontend; se utiliza para CORS y para formar los enlaces enviados por correo.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` y `SMTP_PASSWORD`: datos de un servidor SMTP habilitado para la aplicación.
   - `PORT` es opcional; si se omite, el servidor escucha en el puerto `4000`.

3. Asegúrate de que MongoDB esté iniciado y que las credenciales SMTP sean válidas. No compartas ni subas el archivo `.env`.

## Iniciar

Desde esta carpeta:

```bash
npm run dev
```

Esto inicia el servidor con Nodemon en `http://localhost:4000` por defecto. Para ejecutar sin Nodemon:

```bash
npm start
```

## API

Todas las rutas están bajo `/api`:

- `/api/veterinarians`: registro, inicio de sesión, confirmación de cuenta, recuperación y cambio de contraseña, y perfil.
- `/api/patients`: operaciones CRUD de pacientes; requieren autenticación mediante JWT.

El frontend debe apuntar a la URL base del servidor (sin `/api`, que se agrega en sus servicios). El origen permitido por CORS se configura mediante `FRONTEND_URL`.
