# RayoMed.ai — Cuestionario de descubrimiento y levantamiento para el SDD

**Documento:** Entrevista de producto, procesos, arquitectura y riesgos  
**Versión:** 1.0 · 10 de octubre de 2026  
**Base documental:** «Alcance Técnico: RayoMed.ai — Sprint Piloto V9 (octubre 2026)»  
**Destinatarios:** Patrocinador, dirección, clínica piloto, especialistas, recepción, comercial, facturación, asesor legal, aliados de integración y equipo técnico.  
**Estado:** Guía de preguntas, no diseño aprobado ni requisitos confirmados.

> **Uso previsto:** levantar información suficiente para producir un PRD / documento funcional y un SDD técnico verificable, que posteriormente pueda ser implementado por equipos humanos o asistentes como Codex y Claude Code sin depender de supuestos ocultos.

## Cómo conducir las entrevistas

- **No enviar todas las preguntas a un solo interlocutor.** Separar por rol, usar entrevistas de 60–90 minutos y pedir ejemplos reales, pantallas, documentos anonimizados y excepciones.
- **P0**: decisión bloqueante antes de cerrar arquitectura o desarrollar el flujo. **P1**: requisito necesario para especificar el módulo o preparar una fase siguiente. La prioridad corresponde al descubrimiento, **no** implica que la funcionalidad deba construirse en el MVP.
- Respuesta permitida: **Confirmado**, **Hipótesis**, **Pendiente**, **Fuera de alcance**, **Descartado**. «No sabemos» es una respuesta útil; no autoriza a la IA a inventar una decisión.
- Preguntar siempre por **caso normal, casos alternos, fallos, autorizaciones y resultado verificable**.
- Los ejemplos que aparecen bajo cada pregunta son **sondeos del entrevistador**, no decisiones tomadas por el cliente.

### Ficha de cada respuesta

```
Código de pregunta:
Respuesta literal del cliente:
Decisión acordada (si existe):
Estado: Confirmado | Hipótesis | Pendiente | Fuera de alcance | Descartado
Prioridad del requisito: MVP | Siguiente fase | Futuro | No aplica
Responsable de validar:
Evidencia: captura | ejemplo | normativa | contrato | API | otro
Supuestos y riesgos:
Caso de aceptación observable:
Fecha de decisión:
```

## Decisiones iniciales que no se deben delegar al agente de código

| ID | Decisión pendiente | Por qué bloquea el SDD |
|---|---|---|
| D01 | Producto comercial vs. sistema clínico integral vs. evolución por fases | Cambia los dominios, entidades y alcance normativo. |
| D02 | Segmento inicial (estética, odontología, medicina general, etc.) | Cambian formularios y flujos; no asumir multiespecialidad en el piloto. |
| D03 | Cliente piloto, usuarios reales y recorrido de negocio | Sin operación validable no hay aceptación. |
| D04 | MVP explícito y exclusiones | Evita que Codex construya funcionalidades no aprobadas. |
| D05 | Propiedad de identidad de paciente y datos clínicos | Evita registros duplicados y accesos erróneos. |
| D06 | Historia clínica: excluida según V9 o cambio de alcance | Existe diferencia entre visión de producto y V9. |
| D07 | Sistema de agenda autoritativo, conflictos y sincronización | Impacta reservas, notificaciones y concurrencia. |
| D08 | Papel definitivo de Vtiger y arquitectura multi-tenant | Impacta mantenimiento, aislamiento y escalabilidad. |
| D09 | Titularidad de WhatsApp y contratos reales de EasyChatbot | Puede bloquear la integración y la portabilidad. |
| D10 | Alcance fiscal y validación de normativa vigente | Evita reglas tributarias inferidas del tipo de paciente. |
| D11 | Datos permitidos en IA y revisión humana | Impacta seguridad y responsabilidad profesional. |
| D12 | Presupuesto, plazo, equipo y condiciones de aprobación | Determina cuánto cabe realmente en el piloto. |

## Orden sugerido de trabajo

**Sesión 1 — Dirección y producto (90 min):** secciones 01, 02 y puntos P0 de 03, 09 y 16. Decidir qué es RayoMed y qué NO es el piloto.  
**Sesión 2 — Clínica y operaciones (90 min):** secciones 04–07, 09 y 14. Reconstruir flujos completos y variaciones.  
**Sesión 3 — Integraciones y arquitectura (90 min):** secciones 05, 08, 10 y 12. Revisar APIs, propiedad de datos y fallos.  
**Sesión 4 — Legal, facturación y operación (60–90 min):** secciones 06, 11, 13, 15 y 16. Validar datos sensibles, alcance fiscal, costes y aceptación.  
**Sesión 5 — Devolución y firma de decisiones (60 min):** resolver contradicciones, clasificar MVP/futuro y aprobar decisiones D01–D12.

---

## Cuestionario detallado

### 01. Visión, posicionamiento y alcance del producto

**Entrevistar a:** Dirección / patrocinador.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q001 · P0. Si RayoMed existiera hoy, ¿qué problema concreto le resolvería al profesional de salud que actualmente no puede resolver bien?**

*Sondeo:* Describir un caso real: actor, situación actual, pérdida y mejora esperada.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q002 · P0. ¿Estamos construyendo un CRM comercial de clínicas, una plataforma clínica integral o un piloto comercial que crecerá a plataforma clínica?**

*Sondeo:* Elegir una opción y describir el producto a 12–24 meses.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q003 · P0. ¿A quién queremos vender primero: cirujano estético independiente, clínica estética, odontología, consultorio general o múltiples especialidades?**

*Sondeo:* Indicar cliente piloto principal y segmentos futuros.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q004 · P0. ¿Qué cinco funcionalidades tienen que estar operativas en la primera entrega para considerar que existe un producto vendible?**

*Sondeo:* Separar imprescindible de deseable y futuro.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q005 · P0. ¿Qué queda explícitamente fuera del piloto aunque aparezca en la visión comercial?**

*Sondeo:* Ejemplos: historia clínica propia, teleconsulta, pagos, campañas, RIPS.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q006 · P1. ¿Qué indicadores demostrarán el éxito del piloto?**

*Sondeo:* Ejemplos a concretar: citas gestionadas, leads atendidos, tiempo ahorrado, cotizaciones aceptadas, tasa de ausencias.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q007 · P1. ¿Cuál es la ventaja que un cliente pagaría frente a usar Vtiger, Google Calendar, WhatsApp y su sistema clínico por separado?**

*Sondeo:* Pedir una propuesta de valor en una frase y evidencia del dolor.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q008 · P1. ¿Qué nombre comercial, marca, dominios y público geográfico tendrá el producto?**

*Sondeo:* Confirmar Colombia, otros países e idiomas inicialmente soportados.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 02. Cliente piloto y operación real

**Entrevistar a:** Clínica piloto / administrador / recepción.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q009 · P0. ¿Qué clínica o profesional participará como piloto y quién puede validar cada flujo?**

*Sondeo:* Solicitar un responsable con autoridad para aprobar los criterios de aceptación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q010 · P0. Muéstrenos cómo atienden actualmente a un paciente desde el primer contacto hasta el seguimiento posterior.**

*Sondeo:* Registrar pasos, herramientas, capturas, personas y excepciones.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q011 · P0. ¿Cuántos profesionales, sedes, consultorios, agendas, agentes y usuarios operarán en el piloto?**

*Sondeo:* Cifras estimadas actuales y a 12 meses.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q012 · P1. ¿Cuáles son los principales tres cuellos de botella operativos actuales?**

*Sondeo:* Cuantificar costos, duplicidades o tiempos si es posible.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q013 · P1. ¿Hay procedimientos o reglas de operación distintas entre especialistas y sedes?**

*Sondeo:* Registrar excepciones y configuración por cliente.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q014 · P1. ¿Qué software usan actualmente y cuáles deben seguir utilizando obligatoriamente?**

*Sondeo:* Solicitar inventario de proveedores, planes, accesos de pruebas y propietarios.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 03. Actores, roles y organización multi-cliente

**Entrevistar a:** Dirección / operaciones / TI.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q015 · P0. ¿Una cuenta representa a un profesional, una clínica, una empresa o un grupo con varias sedes?**

*Sondeo:* Definir jerarquía: organización > sede > profesional > usuario.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q016 · P0. ¿Un médico puede trabajar para varias clínicas y acceder a varias organizaciones con la misma cuenta?**

*Sondeo:* Explicar cambio de contexto, permisos y propiedad de datos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q017 · P0. ¿Quién es dueño de los datos cuando un profesional abandona la clínica o cambia de organización?**

*Sondeo:* Definir conservación, exportación y transferencias autorizadas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q018 · P0. ¿Qué puede ver y modificar cada rol: administrador, médico, comercial, recepción y supervisor?**

*Sondeo:* Usar matriz CRUD y separar datos comerciales de sensibles.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q019 · P1. ¿Los pacientes tendrán una cuenta propia o solo recibirán enlaces temporales?**

*Sondeo:* Determinar registro, autenticación, portal y acciones disponibles.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q020 · P1. ¿Se necesita administrador global de RayoMed para gestionar clientes, soporte, facturación SaaS y operaciones?**

*Sondeo:* Definir facultades limitadas, acceso soporte auditado y consentimiento.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q021 · P1. ¿Cómo se dan de alta, suspenden o eliminan organizaciones y usuarios?**

*Sondeo:* Definir invitación, aprovisionamiento, recuperación y bajas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 04. Identidad del paciente, CRM y ciclo comercial

**Entrevistar a:** Comercial / recepción / profesional.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q022 · P0. ¿Qué diferencia existe para el negocio entre lead, contacto, paciente, cita y episodio de atención?**

*Sondeo:* Construir un glosario y reglas de conversión.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q023 · P0. ¿Cómo detectan que una persona ya está registrada cuando llega por otro número o canal?**

*Sondeo:* Definir deduplicación: documento, teléfono, correo e intervención humana.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q024 · P0. ¿Cuál es el proceso completo desde el primer mensaje hasta convertirse en paciente atendido?**

*Sondeo:* Identificar responsables, estados, eventos y datos mínimos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q025 · P1. ¿Pueden existir varias oportunidades, procedimientos y cotizaciones para un mismo paciente?**

*Sondeo:* Definir relaciones uno-a-muchos y consultas históricas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q026 · P1. ¿De dónde llegan los contactos: WhatsApp, redes, web, referidos, llamadas o importaciones?**

*Sondeo:* Clasificar origen, consentimiento y trazabilidad.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q027 · P1. ¿Qué estados del pipeline deben ser globales y cuáles configurables por clínica?**

*Sondeo:* Pedir lista real, criterios de entrada/salida y estados terminales.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q028 · P1. ¿Qué acciones nunca deben ejecutarse automáticamente sobre el paciente sin validación humana?**

*Sondeo:* Ejemplos: pasar a tratado, cerrar negocio, revelar información.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 05. Agenda, disponibilidad, citas y check-in

**Entrevistar a:** Recepción / profesional / coordinación.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q029 · P0. ¿Google Calendar será la única agenda operativa o se permitirá gestionar la disponibilidad directamente en RayoMed?**

*Sondeo:* Resolver propiedad del dato y comportamiento con agenda externa.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q030 · P0. ¿Qué debe ocurrir cuando dos personas intentan reservar el mismo cupo al mismo tiempo?**

*Sondeo:* Acordar reserva provisional, bloqueo, conflicto y rechazo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q031 · P0. ¿Qué tipos de cita existen y qué duración, preparación, modalidad y recursos requieren?**

*Sondeo:* Ejemplos: valoración, control, cirugía, teleconsulta, seguimiento.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q032 · P0. ¿Quién puede crear, confirmar, cancelar y reprogramar citas, y con qué restricciones temporales?**

*Sondeo:* Pedir escenarios pacientes/recepción/chatbot/médico.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q033 · P0. ¿Qué sucede si Google Calendar está caído o una cita fue editada directamente allí?**

*Sondeo:* Definir sincronización, conciliación, reintentos y avisos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q034 · P1. ¿La disponibilidad depende de médicos, consultorios, equipos, salas o combinaciones de recursos?**

*Sondeo:* Ejemplo: consultorio y médico deben estar libres simultáneamente.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q035 · P1. ¿Qué ocurre con feriados, bloqueos personales, zonas horarias y varias sedes?**

*Sondeo:* Definir calendario base, excepciones, país y huso horario.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q036 · P1. ¿El check-in refleja un estado clínico, logístico o comercial, y quién puede cambiarlo?**

*Sondeo:* Diferenciar llegó, esperando, en consulta, finalizó y no asistió.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q037 · P1. ¿Cómo se resuelve una modificación de cita que llega duplicada o en desorden desde un webhook?**

*Sondeo:* Determinar idempotencia y regla de reconciliación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 06. Preconsulta, captación de datos y consentimiento

**Entrevistar a:** Profesional / legal / recepción.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q038 · P0. ¿La preconsulta es solo un formulario comercial, un cuestionario preoperatorio o parte del expediente clínico?**

*Sondeo:* Resolver la clasificación funcional, acceso y obligaciones aplicables.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q039 · P0. ¿Qué campos son realmente necesarios en el piloto y cuáles cambian según especialidad o procedimiento?**

*Sondeo:* Validar nombres, documento, IMC, antecedentes, fotografías, archivos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q040 · P0. ¿Quién revisa y valida respuestas sensibles y qué decisiones puede tomar a partir de ellas?**

*Sondeo:* Distinguir captura de datos de evaluación clínica.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q041 · P0. ¿Qué autorización debe dar la persona para tratamiento de datos personales, datos sensibles e imágenes?**

*Sondeo:* Validación legal de finalidades, versiones, responsables y evidencia.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q042 · P1. ¿Puede el paciente guardar un avance, corregir datos o enviar el formulario más de una vez?**

*Sondeo:* Definir versión de respuesta, caducidad y edición posterior.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q043 · P1. ¿Qué tamaño, formato, número de imágenes y política de eliminación se necesita?**

*Sondeo:* Concretar límites, almacenamiento privado y retención.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q044 · P1. ¿Cómo se gestiona el enlace si se comparte, expira, se usa desde otro dispositivo o el paciente solicita revocación?**

*Sondeo:* Definir controles de acceso, reemisión y trazabilidad.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 07. Cotizador, precios, condiciones y aprobaciones

**Entrevistar a:** Dirección comercial / especialistas / finanzas.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q045 · P0. ¿Qué se está cotizando exactamente: procedimiento, paquete, consulta, tratamiento o combinación de servicios?**

*Sondeo:* Definir catálogo y unidades comercializables.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q046 · P0. ¿Quién define, aprueba y actualiza honorarios, salas, insumos, descuentos e impuestos?**

*Sondeo:* Definir precios por clínica, sede, profesional, moneda y fecha.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q047 · P0. ¿El IMC modifica automáticamente un precio o solo aporta información que evalúa el especialista?**

*Sondeo:* No suponer automatismos con consecuencias clínicas/económicas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q048 · P0. ¿Qué significa que una cotización fue aceptada y qué operación posterior debe disparar?**

*Sondeo:* Firma, evidencia, pago, reserva de procedimiento o paso manual.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q049 · P1. ¿Cuáles son las reglas de vigencia, versiones, reajustes y descuentos autorizados?**

*Sondeo:* Definir inmutabilidad de cotización enviada y auditoría.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q050 · P1. ¿Cómo debe mostrarse el precio al paciente: desglosado, total, rangos, exclusiones y condiciones?**

*Sondeo:* Solicitar un ejemplo real anonimizado.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q051 · P1. ¿Qué ocurre cuando cambian las tarifas después de enviar una propuesta?**

*Sondeo:* Definir congelación del precio y nueva revisión.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q052 · P1. ¿Quién puede enviar cotizaciones por WhatsApp y quién puede visualizar que fueron abiertas?**

*Sondeo:* Control de rol, registro de eventos y consentimiento.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 08. WhatsApp, EasyChatbot, plantillas y seguimiento

**Entrevistar a:** Comercial / aliado / TI.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q053 · P0. ¿Quién es propietario del número WABA, de la cuenta Meta, de las plantillas y del historial de conversación?**

*Sondeo:* Definir responsabilidades al iniciar y terminar la relación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q054 · P0. ¿EasyChatbot expondrá qué APIs, webhooks, eventos, estados y mecanismos de autenticación?**

*Sondeo:* Solicitar contratos reales y entorno de pruebas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q055 · P0. ¿Quién confirma una cita o una cotización: el chatbot, RayoMed o una persona?**

*Sondeo:* Determinar autorización antes de ejecutar acciones.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q056 · P0. ¿Qué sucede si el mensaje se envía dos veces, si el proveedor no responde o si la ventana de mensajería está cerrada?**

*Sondeo:* Definir deduplicación, políticas de plantillas, reintentos y fallbacks.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q057 · P1. ¿Qué mensajes requiere el piloto: confirmación, recordatorio, encuesta, recontacto y campañas?**

*Sondeo:* Separar transaccionales de promocionales, opt-in y reglas de envío.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q058 · P1. ¿Qué contexto del paciente puede recibir EasyChatbot y qué datos deben permanecer exclusivamente en RayoMed?**

*Sondeo:* Definir campos permitidos y protección de datos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q059 · P1. ¿Se requiere transferencia del bot a agente humano y regreso al bot?**

*Sondeo:* Definir estados, asignación y registro de intervenciones.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q060 · P1. ¿Cuántos recontactos se permiten y en qué horarios?**

*Sondeo:* Definir exclusión, baja de comunicaciones y frecuencia máxima.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 09. Historia clínica e integración con sistemas clínicos

**Entrevistar a:** Dirección médica / legal / TI.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q061 · P0. La V9 excluye historia clínica propia; ¿confirmamos que así seguirá durante el piloto y en la primera versión comercial?**

*Sondeo:* Registrar alcance actual y visión posterior por separado.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q062 · P0. ¿RayoMed almacenará únicamente preconsulta y datos comerciales o registrará valoración, diagnóstico, evolución, fórmulas o documentos clínicos?**

*Sondeo:* Enumerar entidades clínicas que sí/no existirán.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q063 · P0. Si el médico utiliza Dentalink u otro software, ¿RayoMed no se integra, muestra un enlace o intercambia datos con autorización?**

*Sondeo:* La V9 establece no acceso ni sincronización; cualquier cambio requiere nuevo alcance.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q064 · P0. ¿Quién valida clínicamente diagnósticos, antecedentes, alergias y sugerencias de la IA?**

*Sondeo:* Definir responsabilidad profesional y evidencia de revisión.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q065 · P1. Si se incorpora historia clínica en el futuro, ¿qué especialidades y formatos tendrán prioridad?**

*Sondeo:* Medicina general, odontología, estética, fisioterapia, psicología, etc.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q066 · P1. ¿Se necesitan adjuntos, consentimientos específicos, firmas, órdenes o plantillas por especialidad?**

*Sondeo:* Distinguir requisitos de fase futura de piloto.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q067 · P1. ¿Quién puede corregir un registro clínico y cómo conservar la historia de modificaciones?**

*Sondeo:* Definir políticas de integridad y trazabilidad; validar legalmente.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 10. Funciones de IA, riesgos y revisión humana

**Entrevistar a:** Producto / dirección médica / TI.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q068 · P0. ¿Qué tareas específicas de IA deben funcionar en el piloto, y cuál es la entrada y salida esperada de cada una?**

*Sondeo:* Ejemplos de V9: clasificar notas, sugerir CUPS/CIE-10; no asumir diagnóstico autónomo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q069 · P0. ¿Qué decisiones nunca puede tomar la IA sin confirmación explícita del médico?**

*Sondeo:* Ejemplos: códigos finales, conducta clínica, alta, cambios al expediente.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q070 · P0. ¿Qué nivel de precisión se requiere y cómo se probará sobre casos anonimizados revisados por especialistas?**

*Sondeo:* Definir métricas, muestras, tasa tolerable de errores y rechazo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q071 · P0. ¿Qué datos personales o de salud pueden enviarse a proveedores externos de modelos?**

*Sondeo:* Precisar minimización, retención, contratos, región y autorización.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q072 · P1. ¿Quién corrige una sugerencia errónea y dónde se registra lo que propuso la IA frente a lo finalmente aprobado?**

*Sondeo:* Log de propuestas/versiones y responsable humano.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q073 · P1. ¿Cuándo se activa IA y cuándo basta una regla normal?**

*Sondeo:* Diseñar catálogo de automatizaciones deterministas vs LLM.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q074 · P1. ¿Existe presupuesto máximo por cliente, usuario o transacción para el uso de IA?**

*Sondeo:* Solicitar límites de consumo, alertas y fallbacks.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q075 · P1. ¿Se requiere un asistente conversacional dentro de la aplicación además de EasyChatbot en WhatsApp?**

*Sondeo:* Aclarar canales, permisos, herramientas y límites.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 11. Facturación, recibos, RIPS y obligaciones

**Entrevistar a:** Facturación / contador / especialista normativo.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q076 · P0. ¿Qué tipo de prestador y qué operaciones exactas facturará la clínica piloto?**

*Sondeo:* No inferir obligaciones desde “particular” o “convenio” por sí solos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q077 · P0. ¿Qué normativa, anexos, catálogos y reglas tributarias vigentes aplican a esos casos?**

*Sondeo:* Validación escrita por responsable tributario/salud antes de construir reglas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q078 · P0. ¿El piloto debe emitir factura electrónica y reportar RIPS, o basta registrar movimientos sin emitir documentos fiscales?**

*Sondeo:* Decisión explícita de alcance y proveedor.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q079 · P0. ¿Dataico será el proveedor contratado y ofrece todos los endpoints y ambientes necesarios?**

*Sondeo:* Pedir documentación, contrato, restricciones y pruebas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q080 · P1. ¿Cómo se resuelven anulaciones, notas crédito, devoluciones, anticipos y pagos parciales?**

*Sondeo:* Solicitar transacciones reales y controles contables.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q081 · P1. ¿Quién responde cuando un documento es rechazado por el proveedor o por la entidad receptora?**

*Sondeo:* Definir monitoreo, corrección, reenvío e histórico.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q082 · P1. ¿Hay clínicas que no usarán este módulo porque ya tienen software de facturación?**

*Sondeo:* Definir módulo desactivable y grado de interoperabilidad.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 12. Arquitectura de integración y propiedad de datos

**Entrevistar a:** Arquitecto / líderes de desarrollo / proveedores.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q083 · P0. ¿Por qué se eligió una instancia de Vtiger por cliente y qué condiciones harían replantear esa decisión?**

*Sondeo:* Restricciones comerciales, licencias, personalizaciones y costo operativo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q084 · P0. ¿Cuál sistema es fuente de verdad para cada entidad: usuario, organización, lead, paciente, cita, cotización, conversación y documento?**

*Sondeo:* Construir matriz de ownership; no dejar dos fuentes autoritativas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q085 · P0. ¿Qué sucede cuando una operación afecta a Vtiger, Google y WhatsApp, pero uno de los tres falla?**

*Sondeo:* Definir consistencia eventual, reintento, compensación y estado visible.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q086 · P0. ¿Qué eventos/webhooks se consumirán, con qué identificadores se resuelven tenants y cómo se evitan eventos duplicados?**

*Sondeo:* Contrato, autenticación, correlación, idempotencia y mensajes fuera de orden.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q087 · P1. ¿Qué operaciones requerirán respuesta inmediata y cuáles pueden terminar en segundo plano?**

*Sondeo:* Definir tiempos de espera y cola de trabajos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q088 · P1. ¿Cómo se crea automáticamente un cliente nuevo con su instancia, configuración, permisos, catálogos y salud de integración?**

*Sondeo:* Aprovisionamiento y verificación reproducibles.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q089 · P1. ¿Cómo se hará el versionado y despliegue de personalizaciones en decenas o cientos de instancias Vtiger?**

*Sondeo:* Migraciones, compatibilidad, rollback y monitoreo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q090 · P1. ¿Qué datos persistirá el Core además de los que almacene Vtiger?**

*Sondeo:* Autorizaciones, evidencia, eventos, auditoría, configuración e integraciones.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 13. Privacidad, seguridad, acceso y auditoría

**Entrevistar a:** Seguridad / legal / arquitectura.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q091 · P0. ¿Quién es responsable del tratamiento de los datos y quién actúa como encargado para cada integración?**

*Sondeo:* Validación contractual y flujos transfronterizos cuando aplique.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q092 · P0. ¿Qué campos y documentos se consideran sensibles, quién puede verlos y bajo qué contexto?**

*Sondeo:* Matriz de autorización por tenant, rol, sede y paciente.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q093 · P0. ¿Qué debe quedar auditado: acceso, vista de fotos, descarga, exportación, edición, IA y consulta de registros?**

*Sondeo:* Definir eventos de auditoría, retención y acceso a logs.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q094 · P0. ¿Qué debe ocurrir ante una solicitud de revocación, rectificación, eliminación o acceso a datos?**

*Sondeo:* Flujo con responsable y excepciones legales.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q095 · P1. ¿Cómo se gestionarán cifrado, secretos, credenciales API, URLs firmadas y rotación de llaves?**

*Sondeo:* Acordar medidas y responsable de operación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q096 · P1. ¿Qué política de retención aplica a leads, fotos, cotizaciones, conversaciones, consentimientos y backups?**

*Sondeo:* Separar propósito, obligación y período por categoría.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q097 · P1. ¿Qué plan de respuesta ante incidentes, recuperación y notificación existe?**

*Sondeo:* Identificar RTO/RPO y responsables.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 14. Experiencia de usuario, canales y accesibilidad

**Entrevistar a:** Usuarios finales / producto / UX.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q098 · P0. ¿Cuáles son las tres tareas diarias que recepción y médicos deben completar en menos pasos?**

*Sondeo:* Hacer demostración de los flujos reales.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q099 · P0. ¿La primera entrega será web responsive, PWA, app móvil o combinación?**

*Sondeo:* Confirmar dispositivos, navegador y necesidad de trabajo offline.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q100 · P1. ¿Se requiere un panel distinto para administrador, médico, recepción y paciente?**

*Sondeo:* Identificar navegación, densidad de información y permisos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q101 · P1. ¿Qué datos deben aparecer en la vista del día sin exponer información clínica a usuarios no autorizados?**

*Sondeo:* Dibujar una tarjeta de cita y pantallas.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q102 · P1. ¿Qué idiomas, formatos de fecha, accesibilidad y zona horaria deben soportarse desde el comienzo?**

*Sondeo:* Especificar necesidades reales del piloto.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q103 · P1. ¿Con qué criterios se aprobará el diseño: prototipo clickable, tareas de usuario, tiempos, accesibilidad?**

*Sondeo:* Definir validación observable.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 15. Operación, escala, presupuesto y continuidad

**Entrevistar a:** Dirección / operaciones / DevOps.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q104 · P0. ¿Cuántas clínicas, usuarios concurrentes, citas y mensajes por día debemos soportar en piloto y primer año?**

*Sondeo:* Estimaciones para dimensionamiento y costos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q105 · P0. ¿Qué disponibilidad se espera y qué pasa operacionalmente si RayoMed no está disponible durante atención?**

*Sondeo:* Definir estrategia de contingencia.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q106 · P0. ¿Qué presupuesto hay para infraestructura, proveedores, tokens de IA, mensajes y mantenimiento mensual?**

*Sondeo:* Establecer techo de costos y costos por tenant.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q107 · P1. ¿Qué entornos son necesarios: desarrollo, QA, staging y producción?**

*Sondeo:* Definir datos sintéticos, aislamiento y accesos.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q108 · P1. ¿Qué observabilidad requieren: métricas, logs, trazas, alertas y panel de salud de proveedores?**

*Sondeo:* Identificar responsables de incidentes.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q109 · P1. ¿Cómo se verifican backups y restauraciones completas por cliente sin afectar otros clientes?**

*Sondeo:* Pruebas periódicas, RPO y RTO.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q110 · P1. ¿El producto debe seguir operando si EasyChatbot, Meta, Vtiger, Dataico o Google tienen una interrupción?**

*Sondeo:* Definir degradación aceptable por flujo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


### 16. Entrega, criterios de aceptación y gobierno de cambios

**Entrevistar a:** Patrocinador / PO / equipo técnico.  
**Objetivo:** obtener decisiones observables y ejemplos reales.

**Q111 · P0. ¿Cuál es la fecha objetivo y qué compromisos reales existen con el cliente piloto?**

*Sondeo:* Diferenciar fecha deseada, contractual y ventana de validación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q112 · P0. ¿Quién decide cambios de alcance y quién firma la aceptación de cada funcionalidad?**

*Sondeo:* Nombrar Product Owner y responsable clínico cuando corresponda.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q113 · P0. ¿Qué recorrido extremo a extremo debe demostrar el piloto para considerarse aprobado?**

*Sondeo:* Definir demo con datos anonimizados y escenarios de fallo.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q114 · P0. ¿Cuáles son los criterios mínimos de calidad: pruebas, seguridad, rendimiento, documentación y monitoreo?**

*Sondeo:* Establecer Definition of Done.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q115 · P1. ¿Qué acceso al código, entornos, credenciales sandbox y documentación aportarán los aliados?**

*Sondeo:* No aceptar una integración sin medios para verificarla.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q116 · P1. ¿Qué se hace si una decisión bloqueante no se resuelve a tiempo?**

*Sondeo:* Estado pendiente y mecanismo de aplazamiento explícito.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_

**Q117 · P1. ¿Cómo se registrarán cambios de requisitos después de aprobar el SDD?**

*Sondeo:* Versionado, impacto de costo, fecha y aprobación.

**Respuesta:** _Pendiente_  · **Estado:** _Pendiente_  · **Fase:** _Por definir_


---

## Entrevistas basadas en escenarios reales (no sustituibles por respuestas «sí/no»)

### Caso A — Cita creada desde WhatsApp
Una persona nueva escribe para valoración. El bot obtiene datos, detecta posibles duplicados, consulta disponibilidad, reserva, dispara preconsulta y confirma por WhatsApp. **Solicitar:** diagrama de pasos, actor que autoriza, IDs de cada sistema, tiempos, error de proveedor y criterio de éxito.

### Caso B — Cambio de cita en Google Calendar
Recepción mueve manualmente la cita directamente en Google mientras un recordatorio está en cola. **Solicitar:** comportamiento esperado, fuente de verdad, reconciliación, invalidación del mensaje viejo y auditoría.

### Caso C — Cotización aceptada pero precio actualizado
Se envió una propuesta de intervención, la clínica cambió tarifas y el paciente acepta el enlace anterior. **Solicitar:** regla de vigencia, versiones, restricciones y pasos comerciales válidos.

### Caso D — Preconsulta con fotos y datos sensibles
Un paciente completa antecedentes e imágenes, solicita retirar su consentimiento y luego pide copia o supresión. **Solicitar:** responsables, autorizaciones, trazas, retenciones, excepciones normativas y procedimientos operativos.

### Caso E — IA sugiere un código no válido
El modelo devuelve un CUPS/CIE-10 inexistente, desactualizado o incompatible y el médico intenta aprobarlo. **Solicitar:** validación contra catálogo vigente, bloqueo, edición, atribución de responsabilidad, monitoreo y evidencia.

### Caso F — Un cliente falla mientras otro opera
Una instancia Vtiger o credencial WABA presenta un fallo, mientras otros clientes siguen trabajando. **Solicitar:** aislamiento, colas, alertas, estado de servicio, reintentos y recuperación.

### Caso G — Paciente atendido en dos organizaciones
Un médico trabaja en dos clínicas y el paciente tiene contacto con ambas. **Solicitar:** separación de permisos, historia comercial, autorizaciones y condiciones de transferencia o no transferencia de datos.

## Inventario de evidencias que debe pedir el entrevistador

- [ ] Un flujo real de captación, agendamiento, cotización y atención (anonimizado).
- [ ] Pantallas o demo del proceso actual de recepción y médico.
- [ ] Tarifarios, paquete o cotización de ejemplo (anonimizados).
- [ ] Lista de roles y ejemplos de acceso autorizado / prohibido.
- [ ] Políticas y textos aprobados de privacidad, imágenes y consentimiento.
- [ ] Catálogos y reglas de agendamiento por profesional y recurso.
- [ ] Documentación y sandbox de Google, Vtiger, EasyChatbot, Meta y Dataico, según aplique.
- [ ] Lista de campos obligatorios y ejemplos de formularios.
- [ ] Requisitos legales y fiscales revisados por responsable autorizado.
- [ ] Volúmenes previstos, techo mensual de costos y fechas deseadas.
- [ ] Criterios de aceptación escritos por responsable de cada módulo.

## Registro de contradicciones a resolver frente a V9

| Tema | Lo que dice V9 | Pregunta de decisión |
|---|---|---|
| Historia clínica | Fuera de alcance; sin acceso/sincronización a terceros | ¿La visión integral es futura o cambió el piloto? |
| Especialidades | Campos y paquetes centrados en cirugía/estética | ¿Qué parte será común a medicina en general? |
| CRM | Una instancia Vtiger por cliente | ¿Es restricción fija o una opción para evaluar? |
| Agenda | Google Calendar como verdad temporal única | ¿Qué ocurre con recursos y conflictos? |
| IA | Clasificador de texto e inferencia de códigos con confirmación humana | ¿Qué asistencia clínica/operativa adicional se espera? |
| Datos de preconsulta | Datos sensibles tratados como captación/valoración comercial | ¿Qué límites legales y clínicos aplican en la práctica? |
| Facturación | Distinción convenio/particular y RIPS según V9 | ¿Qué obligaciones reales vigentes tiene el piloto? |
| WhatsApp | EasyChatbot atiende; RayoMed aprovisiona WABA | ¿Qué acuerdos técnicos y operativos están disponibles? |

## Productos documentales después de completar las entrevistas

1. **Acta de decisiones** aprobada: visión, MVP, exclusiones y responsables.
2. **PRD / alcance funcional**: objetivos, actores, casos de uso, reglas de negocio, escenarios y flujos.
3. **Glosario y mapa de datos**: pacientes/leads/citas/cotizaciones, propietario, sensibilidad y persistencia.
4. **Matriz de trazabilidad**: `REQ -> decisión -> pantalla/API -> prueba -> evidencia de aceptación`.
5. **SDD arquitectónico**: contextos, componentes, despliegue, tenancy, seguridad, disponibilidad y decisiones ADR.
6. **Diseño detallado por módulo**: secuencias normales/errores, contratos API, entidades, permisos, eventos, idempotencia, migraciones y pruebas.
7. **Plan de entrega**: épicas, historias, dependencias, criterios de aceptación, estimaciones y riesgos.
8. **Paquete de instrucciones para Codex/Claude Code**: tareas acotadas contra SDD aprobado y pruebas obligatorias.

## Condición de salida de discovery

No iniciar desarrollo de un flujo crítico sin **actor, disparador, datos de entrada, resultado verificable, dueño del dato, reglas, permisos, manejo de fallos y responsable de aceptación**. Toda decisión faltante debe quedar como *pendiente*, no convertirse en una suposición de implementación.

---

**Nota de rigor:** este documento incorpora las decisiones y módulos descritos en V9 y añade preguntas de análisis senior. No transforma automáticamente las hipótesis del entrevistador en requisitos aprobados. La conformidad legal y fiscal requiere validación de especialistas competentes.
