export const STORAGE_KEY = 'rayomed_discovery_v1'
export const STATUS = ['Pendiente', 'Confirmado', 'Hipótesis', 'Fuera de alcance', 'Descartado']
export const PHASES = ['Por definir', 'MVP', 'Siguiente fase', 'Futuro', 'No aplica']
export const DECISIONS = [
  ['D01','¿RayoMed será comercial, clínico integral o evolutivo?','Define dominios y obligaciones.'],
  ['D02','¿Cuál es la especialidad o segmento del piloto?','Evita generalizar flujos estéticos a toda la salud.'],
  ['D03','¿Quién es el cliente piloto y quién valida los flujos?','Permite probar con escenarios reales.'],
  ['D04','¿Cuáles son las cinco funciones esenciales y las exclusiones?','Cierra el alcance del MVP.'],
  ['D05','¿Quién gestiona identidad y propiedad de los datos del paciente?','Evita duplicados y cruces de información.'],
  ['D06','¿Historia clínica propia queda fuera o se incorpora?','La V9 la excluye; confirmar la visión.'],
  ['D07','¿Google Calendar será la fuente de verdad de citas?','Afecta concurrencia, recursos y recuperación.'],
  ['D08','¿Vtiger por cliente es obligatorio o una opción?','Impacta costos y modelo multi-tenant.'],
  ['D09','¿Quién controla WABA, EasyChatbot y sus contratos?','Determina la portabilidad e integración.'],
  ['D10','¿Facturación/RIPS aplica al piloto y quién valida normativa?','Evita implementar reglas fiscales sin aprobación.'],
  ['D11','¿Qué datos puede usar la IA y qué requiere aprobación humana?','Define controles de seguridad y responsabilidad.'],
  ['D12','¿Qué plazo, presupuesto y autoridad de aprobación existen?','Permite priorizar y cerrar entregables.']
]
export const SCENARIOS = [
  ['A','Cita creada desde WhatsApp','Una persona nueva escribe para valoración. El bot obtiene datos, detecta posibles duplicados, consulta disponibilidad, reserva, dispara preconsulta y confirma por WhatsApp. Describir actores, IDs, tiempos, errores y criterio de éxito.'],
  ['B','Cambio de cita en Google Calendar','Recepción mueve la cita en Google mientras un recordatorio está en cola. Definir reconciliación, invalidación de recordatorios y auditoría.'],
  ['C','Cotización aceptada después de actualizar precios','Una clínica cambia tarifas y el paciente acepta una versión anterior. Acordar vigencia, versionado y qué monto aplica.'],
  ['D','Preconsulta con fotografías y antecedentes','Un paciente sube información sensible y luego solicita revocar consentimiento o eliminación. Precisar responsables, retención y excepciones.'],
  ['E','La IA propone un código clínico inválido','Un LLM devuelve un código CUPS/CIE-10 inexistente o no vigente. Definir validación, bloqueo, revisión humana y trazabilidad.'],
  ['F','Una instancia del cliente falla y las demás continúan','Un Vtiger o proveedor de mensajería falla. Definir aislamiento, reintentos, notificaciones y recuperación.'],
  ['G','Paciente atendido en dos organizaciones','Un médico atiende en dos clínicas y un paciente se relaciona con ambas. Definir separación de datos y permisos entre organizaciones.']
]
export const blankEntry = () => ({ answer:'', status:'Pendiente', phase:'Por definir', owner:'', evidence:'', risks:'', acceptance:'', notes:'' })
export const blankDecision = () => ({ answer:'', status:'Pendiente', owner:'' })
export function createState() { return { schema:'rayomed-discovery-v1', version:1, meta:{ project:'RayoMed.ai', client:'', interviewee:'', interviewRole:'', facilitator:'', date:new Date().toISOString().slice(0,10), updatedAt:new Date().toISOString() }, responses:{}, decisions:{}, scenarios:{} } }
export function readEntry(state, id) { return { ...blankEntry(), ...(state.responses?.[id] || {}) } }
export function readDecision(state, id) { return { ...blankDecision(), ...(state.decisions?.[id] || {}) } }
export function progress(questions, state) {
  let answered=0, confirmed=0, pendingP0=0
  for(const q of questions){ const x=readEntry(state,q.id); if(x.answer.trim())answered++; if(x.status==='Confirmado')confirmed++; if(q.priority==='P0' && x.status!=='Confirmado' && x.status!=='Fuera de alcance' && x.status!=='Descartado')pendingP0++ }
  return { total:questions.length, answered, confirmed, pendingP0, percent: questions.length ? Math.round(100*answered/questions.length) : 0 }
}
const clip = (v,max=20000) => typeof v==='string' ? v.slice(0,max) : ''
const cleanRecord = (x, keys, limit=20000) => Object.fromEntries(keys.map(k=>[k,clip(x?.[k],limit)]))
export function normalizeImport(raw, allowedIds){
  if(!raw || raw.schema!=='rayomed-discovery-v1' || raw.version!==1 || typeof raw!=='object') throw new Error('El archivo no tiene el formato de respaldo RayoMed v1.')
  const state=createState()
  state.meta={...state.meta,...cleanRecord(raw.meta||{},['project','client','interviewee','interviewRole','facilitator','date','updatedAt'],200)}
  for(const id of allowedIds){ if(raw.responses && Object.hasOwn(raw.responses,id)) { const x=raw.responses[id]; state.responses[id]={...blankEntry(),...cleanRecord(x,['answer','status','phase','owner','evidence','risks','acceptance','notes'])}; if(!STATUS.includes(state.responses[id].status))state.responses[id].status='Pendiente';if(!PHASES.includes(state.responses[id].phase))state.responses[id].phase='Por definir' }}
  for(const [id] of DECISIONS){ if(raw.decisions && Object.hasOwn(raw.decisions,id)){const x=raw.decisions[id]; state.decisions[id]={...blankDecision(),...cleanRecord(x,['answer','status','owner'])}; if(!STATUS.includes(state.decisions[id].status))state.decisions[id].status='Pendiente' }}
  for(const [id] of SCENARIOS){if(raw.scenarios && Object.hasOwn(raw.scenarios,id))state.scenarios[id]=clip(raw.scenarios[id])}
  return state
}
const safeText = value => String(value || '').replace(/\r/g,'').trim() || '_Sin responder_'
const multiline = value => safeText(value)
export function markdownReport(questions, state){
  const all=[...questions.executive,...questions.detailed]
  const ep=progress(questions.executive,state),dp=progress(questions.detailed,state)
  const p0=all.filter(q=>q.priority==='P0' && !['Confirmado','Descartado','Fuera de alcance'].includes(readEntry(state,q.id).status))
  const pendingDecisions=DECISIONS.filter(([id])=>readDecision(state,id).status!=='Confirmado')
  const lines=[
    '# RayoMed.ai — Resultado de levantamiento para PRD / SDD','',
    `**Proyecto:** ${safeText(state.meta.project)}`,
    `**Cliente / clínica piloto:** ${safeText(state.meta.client)}`,
    `**Entrevistado:** ${safeText(state.meta.interviewee)} — ${safeText(state.meta.interviewRole)}`,
    `**Facilitador:** ${safeText(state.meta.facilitator)}`,
    `**Fecha:** ${safeText(state.meta.date)}`,
    `**Exportado:** ${new Date().toISOString()}`,'',
    '> Fuente: cuestionarios de descubrimiento de RayoMed, construidos sobre «Alcance Técnico: RayoMed.ai — Sprint Piloto V9». Las respuestas registradas son aportadas por los entrevistados; no equivalen automáticamente a requisitos aprobados.','',
    '## Resumen ejecutivo','',
    `- Entrevista ejecutiva: ${ep.answered}/${ep.total} respondidas; ${ep.confirmed} confirmadas.`,
    `- Levantamiento técnico: ${dp.answered}/${dp.total} respondidas; ${dp.confirmed} confirmadas.`,
    `- Preguntas P0 por cerrar: ${p0.length}.`,
    `- Decisiones D01–D12 por confirmar: ${pendingDecisions.length}.`,'',
    '## Registro de decisiones (D01–D12)',''
  ]
  for(const [id,title,why] of DECISIONS){ const x=readDecision(state,id); lines.push(`### ${id} — ${title}`,'',`- **Estado:** ${x.status}`,`- **Responsable:** ${safeText(x.owner)}`,`- **Importancia:** ${why}`,'',multiline(x.answer),'') }
  for (const [setName,qs] of [['Entrevista ejecutiva',questions.executive],['Descubrimiento técnico',questions.detailed]]){
    lines.push(`## ${setName}`,'')
    let lastSection=''
    for(const q of qs){if(q.section!==lastSection){lastSection=q.section;lines.push(`### ${q.section}`,'')}
      const x=readEntry(state,q.id)
      lines.push(`#### ${q.id} · ${q.priority} — ${q.text}`,'',`- **Estado:** ${x.status}`,
      `- **Implementación:** ${x.phase}`,
      `- **Responsable:** ${safeText(x.owner)}`,
      `- **Pregunta de profundización:** ${safeText(q.hint)}`,
      `- **Aclaración de la pregunta:** ${safeText(q.clarification)}`,
      `- **Ejemplo ilustrativo (no es requisito aprobado):** ${safeText(q.example)}`,
      `- **Qué debe quedar definido:** ${safeText(q.expected)}`,
      '','**Respuesta literal:**','',multiline(x.answer),'',
      '**Evidencia / referencias:**','',multiline(x.evidence),'',
      '**Riesgos / supuestos:**','',multiline(x.risks),'',
      '**Criterio de aceptación:**','',multiline(x.acceptance),'',
      '**Notas / acuerdos:**','',multiline(x.notes),'')
    }
  }
  lines.push('## Escenarios de validación','')
  for(const [id,title,desc] of SCENARIOS){lines.push(`### Caso ${id} — ${title}`,'',`**Escenario:** ${desc}`,'','**Respuesta del cliente:**','',multiline(state.scenarios?.[id]),'')}
  lines.push('## Preguntas críticas P0 pendientes','')
  if(p0.length) for(const q of p0) lines.push(`- **${q.id}:** ${q.text} (${readEntry(state,q.id).status})`)
  else lines.push('No quedan preguntas P0 abiertas según los estados registrados.')
  lines.push('','## Instrucciones para el análisis posterior','',
    '1. Distinguir hechos confirmados, hipótesis, pendientes y puntos descartados. No inventar respuestas ni reglas de negocio.',
    '2. Comparar las respuestas con el Alcance Técnico RayoMed V9 e identificar contradicciones y cambios de alcance.',
    '3. Preparar acta de decisiones, PRD, modelo conceptual, diagramas, ADR, contratos e historias técnicas con trazabilidad.',
    '4. No dar por validada la conformidad clínica, de protección de datos o fiscal sin revisión del responsable autorizado.',
    '5. Generar un backlog dividido en MVP y fases posteriores, con criterios de aceptación, pruebas y preguntas bloqueantes.',
    '','_Documento producido por RayoMed Discovery Studio. Revisar y aprobar antes de usarlo como especificación de construcción._','')
  return lines.join('\n')
}
