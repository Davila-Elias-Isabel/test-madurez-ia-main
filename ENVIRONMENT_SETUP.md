# Configuración de Variables de Entorno

## 📋 Variables Requeridas en Vercel

Este proyecto requiere configurar **4 variables de entorno** en Vercel para funcionar correctamente.

### 1. **ANTHROPIC_API_KEY** ⚙️ (Obligatoria)

**Descripción:** Clave API de Anthropic para autenticar llamadas a Claude IA.

**Usado en:**
- `app/api/chat/route.ts` — Chat flotante global (Asesora ENIA)
- Modelo: `claude-haiku-4-5` (fast, real-time)

**Dónde obtenerla:**
1. Ve a https://console.anthropic.com/
2. Ve a la sección "API Keys"
3. Crea una nueva key o copia una existente
4. Copia el valor completo (comienza con `sk-ant-`)

**Cómo agregar en Vercel:**
```
Settings > Environment Variables
Nombre: ANTHROPIC_API_KEY
Valor: sk-ant-v0-xxxxxxxxxxxxx
Selecciona: Production, Preview, Development
```

---

### 2. **ANTHROPIC_API_KEY_2** ⚙️ (Obligatoria)

**Descripción:** Segunda clave API de Anthropic para servicios de generación y revisión de planes.

**Usado en:**
- `app/api/generar-plan/route.ts` — Genera planes de acción (8 preguntas → plan IA)
- `app/api/revisar-plan/route.ts` — Revisa planes con evidencia de mercado
- Modelo: `claude-haiku-4-5` (optimizado para velocidad)

**Dónde obtenerla:**
- Misma fuente que ANTHROPIC_API_KEY (puedes usar la misma key o una diferente)
- Ve a https://console.anthropic.com/ > API Keys

**Cómo agregar en Vercel:**
```
Settings > Environment Variables
Nombre: ANTHROPIC_API_KEY_2
Valor: sk-ant-v0-xxxxxxxxxxxxx
Selecciona: Production, Preview, Development
```

---

### 3. **SUPABASE_URL** 🗄️ (Obligatoria)

**Descripción:** URL base de tu base de datos Supabase.

**Usado en:**
- `lib/supabase.ts` — Conexión a Supabase desde APIs
- `app/api/generar-plan/route.ts` — Guardar planes generados
- `app/api/revisar-plan/route.ts` — Leer planes para revisar
- `app/api/seed-glosario/route.ts` — Cargar 40+ términos de glosario

**Dónde obtenerla:**
1. Ve a https://supabase.com/ y accede a tu proyecto
2. Ve a **Settings > API**
3. Copia el valor de **Project URL** (similar a: `https://xxxxxxxxxxxxx.supabase.co`)

**Cómo agregar en Vercel:**
```
Settings > Environment Variables
Nombre: SUPABASE_URL
Valor: https://xxxxxxxxxxxxx.supabase.co
Selecciona: Production, Preview, Development
```

---

### 4. **SUPABASE_SERVICE_ROLE_KEY** 🔐 (Obligatoria)

**Descripción:** Clave de servicio de Supabase con permisos completos para lectura/escritura en la base de datos.

**Usado en:**
- `lib/supabase.ts` — Autenticación con Supabase desde el backend
- Crear tablas, insertar datos, consultar planes y glosario

**⚠️ SEGURIDAD:** Esta clave tiene acceso completo. Úsala SOLO en variables de entorno del servidor (backend). Nunca la expongas en el cliente.

**Dónde obtenerla:**
1. Ve a https://supabase.com/ > Tu proyecto
2. Ve a **Settings > API**
3. En la sección **Service Role** (en la parte inferior), copia el valor debajo de **service_role secret**
4. La clave comienza con `eyJ...` y es muy larga

**Cómo agregar en Vercel:**
```
Settings > Environment Variables
Nombre: SUPABASE_SERVICE_ROLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Selecciona: Production, Preview, Development
```

---

## 🗄️ Tablas Requeridas en Supabase

Antes de usar las funcionalidades, debes crear las siguientes tablas en tu base de datos Supabase:

### Tabla: `glosario`

```sql
create table glosario (
  id text primary key,
  termino text not null,
  definicion text not null,
  ejemplo text not null,
  relacionados text[] not null,
  eje integer,
  created_at timestamp default now()
);
```

Luego ejecuta:
```bash
curl -X POST https://[tu-proyecto].vercel.app/api/seed-glosario
```

Este endpoint llenará la tabla con 40+ términos automáticamente.

### Tabla: `planes_accion`

```sql
create table planes_accion (
  id uuid default gen_random_uuid() primary key,
  tipo_entidad text not null,
  diagnostico text not null,
  objetivos text[] not null,
  ejes jsonb not null,
  hitos jsonb not null,
  riscos text[] not null,
  siguiente_paso text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

---

## ✅ Checklist de Configuración

- [ ] **ANTHROPIC_API_KEY** — Agregada a Vercel (Production, Preview, Development)
- [ ] **ANTHROPIC_API_KEY_2** — Agregada a Vercel (Production, Preview, Development)
- [ ] **SUPABASE_URL** — Agregada a Vercel (Production, Preview, Development)
- [ ] **SUPABASE_SERVICE_ROLE_KEY** — Agregada a Vercel (Production, Preview, Development)
- [ ] **Tabla `glosario`** — Creada en Supabase
- [ ] **Tabla `planes_accion`** — Creada en Supabase
- [ ] **Seed glosario** — Ejecutado (POST `/api/seed-glosario`)

---

## 🚀 Cómo Verificar que Todo Funciona

1. **Asesora ENIA flotante:**
   - Abre tu sitio en Vercel
   - Busca el botón redondo azul "ENIA" en la esquina inferior derecha
   - Abre el chat y envía un mensaje — debería responder

2. **Checklist OIA:**
   - Ve a `/checklist-oia`
   - Marca items — debería actualizar el progreso

3. **Glosario:**
   - Ve a `/glosario`
   - Busca un término (ej: "Gobernanza")
   - Debería mostrar la definición

4. **Plan de Acción:**
   - Ve a `/plan-accion`
   - Completa el formulario de 8 preguntas
   - Haz clic en "Generar Plan de Acción"
   - Debería generar un plan en segundos

---

## 🆘 Troubleshooting

**"Error: ANTHROPIC_API_KEY not configured"**
- Verifica que `ANTHROPIC_API_KEY` esté en Vercel > Settings > Environment Variables
- Asegúrate de guardar y que aparezca en los 3 entornos (Production, Preview, Development)

**"Error: SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY not configured"**
- Verifica que ambas variables estén configuradas en Vercel
- Copia el URL y la key directamente desde https://supabase.com/ sin caracteres adicionales

**"Tabla no existe"**
- Accede a tu proyecto Supabase
- Ve a **SQL Editor**
- Copia y ejecuta el SQL de las tablas (ver sección "Tablas Requeridas")

**"Plan no se genera"**
- Abre la consola del navegador (F12) y revisa los errores
- Verifica que `ANTHROPIC_API_KEY_2` esté bien configurada
- Revisa los logs de Vercel: Deployment > Logs

---

## 📚 Documentación Relacionada

- [Anthropic Console](https://console.anthropic.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [ENIA 2026-2030](https://www.gob.pe/) — Estrategia Nacional de IA del Perú
