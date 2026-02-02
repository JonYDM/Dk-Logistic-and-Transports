# Sistema de Componentes Compartidos - DK Logística

## Descripción
Este proyecto ahora utiliza un sistema de componentes compartidos basado en **class-variance-authority** (CVA), **clsx** y **tailwind-merge**, similar al proyecto big-web-app.

## Componentes Disponibles

### 1. Title
Componente para títulos con variantes predefinidas adaptadas al diseño de DK Logística.

**Uso:**
```jsx
import { Title } from '@/shared/components';

// Título de página
<Title variant="page-title">Dashboard</Title>

// Subtítulo
<Title variant="subtitle">Vista general de DK Logística</Title>

// Título de sección
<Title variant="section-title">Servicios Recientes</Title>

// Títulos H1-H6
<Title variant="h1">Título</Title>
<Title variant="h2">Subtítulo</Title>
```

**Variantes disponibles:**
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - Títulos HTML estándar
- `page-title` - Título principal de página (5xl, font-black)
- `section-title` - Título de sección (3xl, font-black)
- `card-title` - Título de tarjeta (2xl, font-black)
- `modal-title` - Título de modal (xl, font-bold)
- `subtitle` - Subtítulo descriptivo (xl, text-gray-500, font-light)

---

### 2. Button
Botón con variantes y tamaños adaptados a la paleta neutral (dorado, gris, negro).

**Uso:**
```jsx
import { Button } from '@/shared/components';

// Botón primario (dorado)
<Button variant="primary">Guardar Cambios</Button>

// Botón secundario
<Button variant="secondary">Cancelar</Button>

// Botón con loading
<Button variant="primary" loading={isLoading}>Enviando...</Button>

// Diferentes tamaños
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>
```

**Variantes disponibles:**
- `primary` - Gradiente dorado (yellow-600 → yellow-500)
- `secondary` - Blanco con borde gris
- `outline` - Borde gris con fondo transparente
- `ghost` - Texto gris, hover gris claro
- `danger` - Rojo para acciones destructivas
- `success` - Negro (gray-900) para acciones exitosas
- `gold` - Dorado sólido
- `dark` - Negro sólido

**Tamaños:**
- `xs`, `sm`, `md`, `lg`, `xl`, `icon`

**Props adicionales:**
- `loading` - Muestra spinner de carga
- `disabled` - Deshabilita el botón

---

### 3. Badge
Insignias para estados, categorías y etiquetas.

**Uso:**
```jsx
import { Badge } from '@/shared/components';

// Badge primario (dorado)
<Badge variant="primary">Activo</Badge>

// Estados de servicio
<Badge variant="en_transito">En Tránsito</Badge>
<Badge variant="completado">Completado</Badge>
<Badge variant="cancelado">Cancelado</Badge>
<Badge variant="solicitado">Solicitado</Badge>

// Tamaños
<Badge size="xs">XS</Badge>
<Badge size="sm">SM</Badge>
<Badge size="md">MD</Badge>
<Badge size="lg">LG</Badge>
```

**Variantes disponibles:**
- `primary` - Dorado (yellow-600)
- `secondary` - Negro (gray-900)
- `neutral` - Gris claro (gray-200)
- `success` - Gris oscuro (gray-700)
- `warning` - Dorado (yellow-600)
- `danger` - Rojo (red-600)
- `info` - Gris medio (gray-400)

**Estados de servicios específicos:**
- `en_transito` - Dorado
- `completado` - Negro
- `cancelado` - Gris medio
- `asignado` - Gris oscuro
- `solicitado` - Gris claro

---

### 4. Card
Contenedor con padding y estilos consistentes.

**Uso:**
```jsx
import { Card } from '@/shared/components';

// Card básica
<Card>
  <Title variant="card-title">Título</Title>
  <p>Contenido...</p>
</Card>

// Card con hover effect
<Card hover>
  <p>Esta card tiene efecto hover</p>
</Card>

// Card con diferentes paddings
<Card padding="none">Sin padding</Card>
<Card padding="sm">Padding pequeño</Card>
<Card padding="md">Padding mediano (default)</Card>
<Card padding="lg">Padding grande</Card>
<Card padding="xl">Padding extra grande</Card>

// Card personalizada
<Card className="bg-gray-50">
  <p>Card con fondo gris</p>
</Card>
```

**Props:**
- `padding` - Controla el padding interno (`none`, `sm`, `md`, `lg`, `xl`)
- `hover` - Activa efecto hover (bg-white/80, shadow-xl)
- `className` - Clases CSS adicionales

---

## Utilidad cn()

La función `cn()` en `src/lib/utils.js` combina `clsx` y `tailwind-merge` para manejar clases CSS condicionalmente y resolver conflictos de Tailwind.

**Uso:**
```jsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)} />
```

---

## Ejemplo Completo

```jsx
import { Title, Button, Badge, Card } from '@/shared/components';

function ServicioCard({ servicio }) {
  return (
    <Card hover padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Title variant="card-title">{servicio.folio}</Title>
          <Badge variant={servicio.estado}>{servicio.estado}</Badge>
        </div>

        <p className="text-gray-600">{servicio.descripcion}</p>

        <div className="flex gap-3">
          <Button variant="primary" size="md">Ver Detalles</Button>
          <Button variant="secondary" size="md">Editar</Button>
        </div>
      </div>
    </Card>
  );
}
```

---

## Paleta de Colores

El sistema de componentes utiliza la paleta neutral de DK Logística:

- **Dorado**: `yellow-600`, `yellow-500` - Color principal, acciones primarias
- **Negro**: `gray-900` - Elementos activos, texto importante
- **Gris oscuro**: `gray-700` - Estados intermedios
- **Gris medio**: `gray-400` - Estados neutros, deshabilitado
- **Gris claro**: `gray-200`, `gray-100` - Fondos, bordes
- **Blanco**: `white` - Fondos principales

---

## Migración de Código Existente

### Antes:
```jsx
<h1 className="text-5xl font-black text-gray-900 tracking-tight">Dashboard</h1>
<p className="text-xl text-gray-500 font-light">Descripción</p>
<button className="btn-primary">Guardar</button>
<span className="badge-modern bg-yellow-600 text-white">Activo</span>
```

### Después:
```jsx
<Title variant="page-title">Dashboard</Title>
<Title variant="subtitle">Descripción</Title>
<Button variant="primary">Guardar</Button>
<Badge variant="primary">Activo</Badge>
```

---

## Configuración

El alias `@` está configurado en `vite.config.js` para apuntar a `./src`, permitiendo importaciones limpias:

```js
import { Title } from '@/shared/components';
import { cn } from '@/lib/utils';
```

---

## Dependencias Instaladas

- `class-variance-authority` - Sistema de variantes para componentes
- `clsx` - Utilidad para clases condicionales
- `tailwind-merge` - Resuelve conflictos de clases Tailwind
