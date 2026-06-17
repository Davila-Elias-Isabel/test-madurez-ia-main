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
  "estado" text default 'generado' check("estado" in ('generado', 'revisado', 'aprobado')),
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
  "estado" text not null default 'pendiente' check("estado" in ('pendiente', 'en-progreso', 'completado')),
  session_id text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(item_id, session_id)
);

-- Crear índices
create index if not exists glosario_termino_idx on glosario(termino);
create index if not exists glosario_eje_idx on glosario(eje);
create index if not exists planes_tipo_idx on planes_accion(tipo_entidad);
create index if not exists planes_estado_idx on planes_accion("estado");
create index if not exists checklist_items_categoria_idx on checklist_items(categoria);
create index if not exists checklist_estado_session_idx on checklist_estado(session_id);

-- Enable Row Level Security
alter table glosario enable row level security;
alter table planes_accion enable row level security;
alter table checklist_items enable row level security;
alter table checklist_estado enable row level security;

-- Políticas RLS: lectura pública, escritura del backend
create policy "glosario_select_public" on glosario for select using (true);
create policy "glosario_insert_backend" on glosario for insert with check (auth.role() = 'service_role');
create policy "glosario_update_backend" on glosario for update with check (auth.role() = 'service_role');

create policy "planes_select_public" on planes_accion for select using (true);
create policy "planes_insert_backend" on planes_accion for insert with check (auth.role() = 'service_role');
create policy "planes_update_backend" on planes_accion for update with check (auth.role() = 'service_role');

create policy "checklist_items_select_public" on checklist_items for select using (true);
create policy "checklist_items_insert_backend" on checklist_items for insert with check (auth.role() = 'service_role');

create policy "checklist_estado_select_public" on checklist_estado for select using (true);
create policy "checklist_estado_insert_backend" on checklist_estado for insert with check (auth.role() = 'service_role');
create policy "checklist_estado_update_backend" on checklist_estado for update with check (auth.role() = 'service_role');
