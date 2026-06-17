# 🗄️ Configuración de Supabase — Guía Completa

Esta guía te ayudará a configurar la integración con Supabase para almacenar planes de acción y glosario.

---

## 📋 Requisitos Previos

- ✅ Cuenta en [supabase.com](https://supabase.com/)
- ✅ Proyecto Supabase creado
- ✅ Variables de entorno en Vercel:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 Paso 1: Obtener Credenciales de Supabase

1. Ve a https://supabase.com/dashboard
2. Abre tu proyecto
3. Ve a **Settings > API**
4. Copia:
   - **Project URL** → Este es tu `SUPABASE_URL`
   - **Service Role secret** → Este es tu `SUPABASE_SERVICE_ROLE_KEY`

### Ejemplo:
```
SUPABASE_URL = https://abcdefghijkl.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ Paso 2: Crear Tablas en Supabase

### Opción A: Usar SQL Editor (Recomendado)

1. En tu proyecto Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega el contenido de `supabase/migrations/001_create_tables.sql`
4. Haz clic en **Run** (botón azul)

Las 4 tablas se crearán automáticamente:
- ✅ `glosario` (40+ términos)
- ✅ `planes_accion` (planes generados)
- ✅ `checklist_items` (items del checklist)
- ✅ `checklist_estado` (estado por sesión)

### Opción B: Crear Manualmente

Si prefieres, copia cada comando SQL:

```sql
-- TABLA 1: Glosario
create table if not exists glosario (
  id text primary key,
  termino text not null unique,
  definicion text not null,
  ejemplo text not null,
  relacionados text[] not null default '{}',
  eje integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- TABLA 2: Planes de Acción
create table if not exists planes_accion (
  id uuid default gen_random_uuid() primary key,
  tipo_entidad text not null,
  diagnostico text not null,
  objetivos text[] not null default '{}',
  ejes jsonb not null default '{}',
  hitos jsonb not null default '{}',
  riscos text[] not null default '{}',
  siguiente_paso text not null,
  respuestas_formulario jsonb not null default '{}',
  revision_agente jsonb,
  estado text default 'generado' check(estado in ('generado', 'revisado', 'aprobado')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- TABLA 3: Items del Checklist
create table if not exists checklist_items (
  id text primary key,
  categoria text not null,
  descripcion text not null,
  norma text not null,
  plazo text,
  created_at timestamp with time zone default now()
);

-- TABLA 4: Estado del Checklist
create table if not exists checklist_estado (
  id uuid default gen_random_uuid() primary key,
  item_id text not null references checklist_items(id) on delete cascade,
  estado text not null default 'pendiente' check(estado in ('pendiente', 'en-progreso', 'completado')),
  session_id text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(item_id, session_id)
);
```

---

## 🌱 Paso 3: Llenar la Base de Datos (Seed)

Una vez creadas las tablas, necesitas poblarlas con:
- 40+ términos del glosario
- 30+ items del checklist

### Opción A: Endpoint Automático (Recomendado)

1. Agrega una variable de entorno en Vercel:
   ```
   SEED_SECRET_KEY = tu-clave-secreta-aleatoria
   ```

2. Luego, haz una petición POST con la clave:
   ```bash
   curl -X POST https://tu-sitio.vercel.app/api/admin/seed-data \
     -H "Authorization: Bearer tu-clave-secreta-aleatoria"
   ```

3. Deberías recibir:
   ```json
   {
     "success": true,
     "glosario": { "inserted": 40, "total": 40 },
     "checklist": { "inserted": 30, "total": 30 },
     "message": "Base de datos poblada exitosamente"
   }
   ```

### Opción B: Cargar CSV Manualmente

1. Ve a la tabla `glosario` en Supabase
2. Haz clic en **Import data > CSV**
3. Exporta desde `lib/glosario-data.ts` como CSV y cárgalo

---

## ✅ Paso 4: Verificar la Integración

### 1. Glosario — Búsqueda en tiempo real

```bash
curl "https://tu-sitio.vercel.app/api/glosario/search?q=gobernanza&eje=3"
```

Debería retornar:
```json
{
  "data": [
    {
      "id": "e001",
      "termino": "Gobernanza de IA",
      "definicion": "...",
      "ejemplo": "...",
      "relacionados": [...],
      "eje": 3
    }
  ],
  "count": 1
}
```

### 2. Guardar un Plan

Ve a `/plan-accion`:
1. Completa el formulario de 8 preguntas
2. Haz clic en "Generar Plan de Acción"
3. El plan se guarda automáticamente en Supabase

Para verificar:
```bash
curl "https://tu-sitio.vercel.app/api/planes/list?limit=5"
```

### 3. Obtener un Plan Específico

```bash
curl "https://tu-sitio.vercel.app/api/planes/get?id=uuid-del-plan"
```

---

## 🔒 Seguridad: Row Level Security (RLS)

Las tablas tienen RLS habilitado por defecto:

- ✅ **Lectura pública:** Cualquiera puede ver glosario y planes
- ✅ **Escritura protegida:** Solo el backend (service role) puede escribir
- ✅ **No hay exposición:** La `SUPABASE_SERVICE_ROLE_KEY` está solo en Vercel (backend)

---

## 🆘 Troubleshooting

### Error: "SUPABASE_URL not configured"

```
❌ Error: SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurados
```

**Solución:**
1. Verifica que ambas variables estén en Vercel > Settings > Environment Variables
2. Asegúrate de que estén en los 3 entornos (Production, Preview, Development)
3. Redeploy la app después de agregar variables

### Error: "relation 'glosario' does not exist"

```
❌ Error: Table 'glosario' not found
```

**Solución:**
1. Ve a tu proyecto Supabase > SQL Editor
2. Copia el contenido de `supabase/migrations/001_create_tables.sql`
3. Ejecuta en SQL Editor
4. Verifica que las tablas aparezcan en la pestaña "Tables"

### Error: "unauthorized"

```
❌ 401 Unauthorized when calling /api/admin/seed-data
```

**Solución:**
1. Configura `SEED_SECRET_KEY` en Vercel
2. Pasa el header correcto: `Authorization: Bearer tu-clave-secreta`

### Los datos no se guardan después de generar un plan

**Solución:**
1. Abre Vercel > Deployments > Logs
2. Busca errores en `/api/generar-plan`
3. Verifica que `SUPABASE_SERVICE_ROLE_KEY` sea correcta (muy larga, empieza con `eyJ`)
4. En Supabase, verifica que la tabla `planes_accion` exista

---

## 📊 Tablas y Endpoints

| Endpoint | Método | Función |
|----------|--------|---------|
| `/api/glosario/search?q=X&eje=Y` | GET | Buscar términos |
| `/api/planes/save` | POST | Guardar plan generado |
| `/api/planes/list?limit=X&offset=Y` | GET | Listar todos los planes |
| `/api/planes/get?id=UUID` | GET | Obtener un plan específico |
| `/api/admin/seed-data` | POST | Llenar BD con datos iniciales |

---

## 🚀 Flujo Completo

1. ✅ Crea tablas en Supabase (Paso 2)
2. ✅ Agrega variables de entorno en Vercel (SUPABASE_URL, SERVICE_ROLE_KEY)
3. ✅ Llena la BD: POST `/api/admin/seed-data`
4. ✅ Usa `/plan-accion` → genera y guarda automáticamente
5. ✅ Usa `/glosario` → busca términos desde BD
6. ✅ Ve `/api/planes/list` → consulta todos tus planes guardados

---

## 📖 Documentación Relacionada

- [Supabase SQL Editor](https://supabase.com/docs/guides/sql-editor)
- [Supabase Auth & RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [API REST de Supabase](https://supabase.com/docs/guides/api)
