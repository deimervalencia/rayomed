# RayoMed Discovery Studio

Aplicación web responsive para entrevistar a dirección, usuarios de la clínica piloto y equipo técnico; registrar las respuestas del levantamiento de RayoMed.ai; y preparar los insumos para un **PRD** y un **SDD** sin inventar requisitos.

La aplicación reproduce los dos cuestionarios elaborados a partir de «Alcance Técnico: RayoMed.ai — Sprint Piloto V9»:

- **20 preguntas ejecutivas:** visión, operación, dependencias, IA, historia clínica, presupuesto y validación.
- **117 preguntas técnicas** en 16 áreas, identificadas con `Q001`–`Q117` y prioridad de levantamiento `P0/P1`.
- **12 decisiones arquitectónicas** (`D01`–`D12`) y **7 escenarios** de validación (`A`–`G`).

## Funciones

- Diseño responsive para computadores y teléfonos, con navegación por sección y pregunta.
- Buscador y filtros de prioridad y estado.
- **137 preguntas ampliadas:** cada pregunta muestra qué significa en lenguaje claro, un ejemplo meramente ilustrativo y qué debe quedar definido en la respuesta. Sondeos opcionales desplegables para profundizar.
- El documento Markdown exportado incluye también el contexto explicativo, para que las decisiones sean interpretables durante el análisis PRD/SDD.
- Campos: respuesta literal, estado, fase, responsable, evidencia, riesgo, aceptación y notas.
- Panel de avances, recuento de decisiones pendientes y preguntas críticas.
- Guardado automático **en el navegador** mediante `localStorage`.
- Exportación de **Markdown (.md)** con toda la información para compartir con ChatGPT y analizar el PRD/SDD.
- Exportación de **JSON (.json)** para respaldo, recuperación y traslado entre dispositivos.
- Importación de JSON con validación de formato y confirmación previa.
- Instalable como PWA en navegadores compatibles, con caché de recursos estáticos para usarla sin conexión tras la primera visita.
- Sin servicios externos, sin claves API, sin cuenta requerida, sin dependencia de npm y sin envío automático de datos.

**Importante:** No existe sincronización entre dispositivos ni multiusuario. La información permanece en el navegador **del dispositivo y perfil usados**. Descargar el JSON después de cada entrevista o jornada es imprescindible para conservarla de manera independiente. Borrar los datos del navegador puede borrar el avance. Esta versión es para entrevistas de requisitos, **NO** para registrar datos reales de pacientes.

## Ejecutar localmente

Requiere Node.js 20+ (probado con Node 22).

```bash
npm run dev
```

Abre `http://localhost:5173`.

Para ejecutar las pruebas y preparar una versión publicable:

```bash
npm test
npm run build
```

Los archivos de `dist/` pueden alojarse en GitHub Pages o cualquier hosting estático. Si solo quieres servir el contenido sin herramientas, puedes usar cualquier servidor HTTP en la raíz del proyecto.

## Publicar en GitHub Pages

### Opción A: mediante la web de GitHub

1. Crea un repositorio (por ejemplo `rayomed-discovery`) en tu cuenta de GitHub. Puedes mantener el repositorio público, pues solo contiene el código y cuestionarios, **no las respuestas**.
2. Sube el contenido del proyecto completo a la rama `main`, incluyendo `.github/workflows/deploy.yml` y `public/questions.json`.
3. En el repositorio: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Abre **Actions** y comprueba que el workflow `Publicar GitHub Pages` haya terminado correctamente. Si la configuración de Pages se habilitó después del primer push, ve a **Actions → Publicar GitHub Pages → Run workflow**.
5. La URL será `https://TU-USUARIO.github.io/rayomed-discovery/` si tu repositorio se llama `rayomed-discovery`. Reemplaza el usuario por el real.

### Opción B: con GitHub CLI instalado y sesión autorizada

Desde el directorio del proyecto:

```bash
# Verificar autenticación (si aún no estás conectado: gh auth login)
gh auth status

git init
git add .
git commit -m "feat: RayoMed Discovery Studio"
git branch -M main

# Elegir visibilidad según la política de tu organización
gh repo create rayomed-discovery --public --source=. --remote=origin --push
```

Después, activa GitHub Actions como fuente de Pages según el paso 3 de la opción A.

**Nota de seguridad:** Publicar en GitHub Pages hace pública la interfaz. El código y los textos del cuestionario podrán verse por cualquier visitante; las respuestas almacenadas por cada usuario en `localStorage` NO se publican ni sincronizan. No emplees el cuestionario para información sensible de pacientes, contraseñas ni credenciales.

## Uso paso a paso

1. En **Exportar y compartir**, completa los datos de la entrevista.
2. Realiza la **Entrevista ejecutiva** con dirección (o empieza con las áreas críticas).
3. Continua con **Cuestionario técnico** por roles y por secciones.
4. Registra las decisiones `D01`–`D12` y los casos `A`–`G`.
5. Descarga **JSON** para seguir más adelante en cualquier dispositivo.
6. Descarga **Markdown**, súbelo como archivo en ChatGPT y solicita la revisión del alcance y la generación del PRD/SDD. Si todavía falta información, el documento la señalará como pendiente.

El Markdown incluye un resumen, la lista de preguntas P0 abiertas y recomendaciones de cómo continuar sin convertir hipótesis en requisitos aprobados.

## Estructura del repositorio

```text
rayomed-discovery-app/
├── index.html
├── styles.css
├── app.js                   # UI + interacción + almacenamiento local
├── lib.js                   # Modelo, validación de backup, Markdown
├── public/
│   ├── questions.json       # 20 + 117 preguntas originales
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── sw.js                # Caché estática para PWA
├── docs/                    # Cuestionarios originales Markdown
├── tests/                   # Pruebas sin dependencias
├── scripts/                 # Servidor de desarrollo y build
└── .github/workflows/deploy.yml
```

## Alcance de seguridad y limitaciones

- El guardado local es útil para entrevistas, pero no es una base de datos empresarial ni incorpora control de acceso central.
- Se necesita una versión con autenticación, backend, permisos, auditoría, almacenamiento cifrado y gestión multiusuario para colaboración entre entrevistadores y sincronización.
- La PWA almacena archivos estáticos. Las respuestas solo están en el almacenamiento del navegador y dentro de los archivos JSON exportados por el usuario.
- Evita abrir respaldos JSON de fuentes no confiables.
- No introducir información clínica identificable ni adjuntar fotografías reales.
- El documento exportado no sustituye validaciones del responsable clínico, legal o fiscal.

## Origen documental

Cuestionarios incluidos bajo `docs/` creados a partir del documento RayoMed V9, ampliados con preguntas de descubrimiento y escenarios de arquitectura. Los ejemplos de sondeo no son decisiones adoptadas.

---

Versión 1.2 · Octubre de 2026.
