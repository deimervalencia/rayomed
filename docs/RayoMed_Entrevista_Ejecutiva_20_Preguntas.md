# RayoMed.ai — Entrevista ejecutiva inicial (20 preguntas)

**Propósito:** obtener decisiones de negocio y alcance antes de redactar el SDD.  
**Referencia:** «Alcance Técnico: RayoMed.ai — Sprint Piloto V9».  
**Participantes recomendados:** patrocinador del producto, Product Owner, representante del cliente piloto y arquitecto.  
**Duración:** 60–90 minutos; si no alcanza, dividirla en dos sesiones.  
**Regla:** si una respuesta no está decidida, marcarla *Pendiente*; no pedirle al asistente de código que la invente.

## Apertura de la entrevista

> «Quiero que definamos RayoMed desde el negocio antes de hablar de programación. Voy a pedirle ejemplos concretos, explicaré las implicaciones técnicas de cada decisión y dejaré constancia de lo acordado. Nuestro objetivo es identificar qué debe construirse en el piloto, qué vendrá después y cómo sabremos que lo entregado funciona».

## A. Qué producto es y a quién se dirige

1. **¿Qué problema principal queremos resolver al médico o a la clínica?** ¿Cómo lo resuelven hoy y cuánto tiempo/dinero les cuesta?
2. **¿Qué es RayoMed exactamente: CRM comercial, sistema médico integral o solución comercial que después incorporará módulos clínicos?** ¿Cuál es la visión a dos años?
3. **¿Para qué tipo de cliente sale el piloto?** ¿Clínicas de estética, odontólogos, medicina general, especialistas independientes u otro? Nombrar el primer cliente real.
4. **¿Qué es imprescindible en la primera versión?** Elegir un máximo de cinco capacidades; distinguirlas de lo deseable y de lo futuro.
5. **¿Qué NO vamos a desarrollar en el piloto?** Confirmar expresamente si incluye o excluye historia clínica propia, teleconsulta, pagos, facturación, campañas y gestión clínica avanzada.

## B. Operación real y usuarios

6. **Cuénteme un caso real desde el primer contacto hasta que el paciente sale de la clínica.** ¿Quién interviene, en qué aplicación y qué información comparte?
7. **¿Quién utilizará RayoMed cada día?** ¿Qué hace recepción, médico, comercial, administrador y paciente? ¿Quién puede ver antecedentes y fotografías?
8. **¿Cómo saben hoy que una persona ya es paciente?** ¿Qué pasa si escribe desde dos números o asiste a dos clínicas?
9. **¿Cómo se manejan las citas?** ¿Quién reserva, confirma, cancela o reprograma? ¿Qué pasa si dos personas piden el mismo horario?
10. **¿Cuál es el mayor problema actual de presupuestos y seguimiento?** ¿Qué pasos debe automatizar RayoMed y cuáles tienen que ser aprobados por una persona?

## C. Dependencias y arquitectura

11. **La V9 pone a Google Calendar como fuente única de agenda. ¿Es una decisión obligatoria o una propuesta que podemos revisar?** ¿Se usan sedes, equipos o consultorios además de profesionales?
12. **La V9 plantea una instancia Vtiger por cliente. ¿Hay una razón empresarial/contractual para imponerlo?** ¿Quién asumirá mantenimiento, hosting y actualizaciones de cada instancia?
13. **¿Qué sistemas actuales se conservarán obligatoriamente?** ¿Qué sistemas pueden reemplazarse? Pedir APIs y responsables de cada proveedor.
14. **¿De quién serán el número WhatsApp, las conversaciones, los pacientes y los datos al terminar el contrato?** ¿Qué puede procesar EasyChatbot?

## D. Historia clínica, IA y cumplimiento

15. **El documento V9 excluye historia clínica; la visión del producto la menciona. ¿Qué decisión aprobamos?** ¿Dónde quedan antecedentes, diagnósticos, notas y documentos?
16. **¿Qué quiere que haga la IA en una consulta real?** Solicitar tres ejemplos exactos de entrada, respuesta esperada y aprobación humana; diferenciar automatización de IA.
17. **¿Qué datos personales y sensibles procesará RayoMed, para qué finalidad y quién autoriza su uso?** ¿Quién validará con criterio legal esos tratamientos y la retención de fotografías?
18. **¿La clínica piloto requiere facturación electrónica y RIPS?** ¿Quién validará la normativa vigente y con qué proveedor se integrará? No asumir que un paciente particular está exento por definición.

## E. Éxito y decisiones de proyecto

19. **¿Cuándo se considera exitoso el piloto?** Definir tres a cinco indicadores medibles y una demostración end-to-end que acepte el cliente.
20. **¿Cuál es el presupuesto, la fecha objetivo y quién puede aprobar cambios de alcance?** ¿Quién valida funcionalmente cada módulo y decide cuando hay dudas?

## Acta de cierre (rellenar en la reunión)

| Decisión | Respuesta acordada | Responsable | Estado |
|---|---|---|---|
| Tipo de producto y visión | | | Pendiente |
| Cliente piloto y especialidad inicial | | | Pendiente |
| Funcionalidades MVP (máx. 5) | | | Pendiente |
| Funcionalidades excluidas | | | Pendiente |
| Historia clínica en el piloto | | | Pendiente |
| Google Calendar como dependencia | | | Pendiente |
| Vtiger por cliente como dependencia | | | Pendiente |
| Alcance de IA y aprobación humana | | | Pendiente |
| Responsabilidades de EasyChatbot / WABA | | | Pendiente |
| Facturación / RIPS y validación legal | | | Pendiente |
| Presupuesto / fecha / métricas de éxito | | | Pendiente |
| Responsable de aprobar el PRD y el SDD | | | Pendiente |

### Cómo registrar cada respuesta

**Pregunta:**  
**Respuesta literal:**  
**Decisión:** Confirmado / Hipótesis / Pendiente  
**Prioridad de implementación:** MVP / Fase posterior / Fuera de alcance  
**Evidencia / ejemplo real:**  
**Responsable y fecha:**

## Resultado de la primera entrevista

No se busca tener el SDD completo de inmediato. Se busca terminar con un **alcance de MVP firmado**, responsables y una lista de temas técnicos pendientes que se profundizarán con médicos, recepción, facturación, seguridad y proveedores. El cuestionario de descubrimiento ampliado contiene las preguntas necesarias para esa segunda fase.
