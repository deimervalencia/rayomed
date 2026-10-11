import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createState, readEntry, progress, normalizeImport, markdownReport, DECISIONS, SCENARIOS } from '../lib.js'
const questions=JSON.parse(fs.readFileSync(new URL('../public/questions.json',import.meta.url),'utf8'))
test('se incluyen las 20 preguntas ejecutivas y 117 técnicas originales',()=>{assert.equal(questions.executive.length,20);assert.equal(questions.detailed.length,117);assert.equal(new Set(questions.detailed.map(q=>q.id)).size,117)})
test('cada pregunta técnica incluye identificador y prioridad válida',()=>{for(const q of questions.detailed){assert.match(q.id,/^Q\d{3}$/);assert.ok(['P0','P1'].includes(q.priority));assert.ok(q.text.length>12);assert.ok(q.section);assert.ok(q.hint)}})
test('cuenta progreso correctamente sin inventar respuestas',()=>{const state=createState();const empty=progress(questions.executive,state);assert.equal(empty.answered,0);state.responses.E01={answer:'Debe centralizar citas.',status:'Confirmado'};const after=progress(questions.executive,state);assert.equal(after.answered,1);assert.equal(after.confirmed,1)})
test('preserva contenido al importar un respaldo válido',()=>{const state=createState();state.responses.Q002={answer:'Evolutivo con fases',status:'Confirmado',phase:'MVP'};state.decisions.D01={answer:'Evolutivo',status:'Confirmado'};state.scenarios.A='Confirmado el día anterior';const other=normalizeImport(JSON.parse(JSON.stringify(state)),questions.detailed.concat(questions.executive).map(q=>q.id));assert.equal(readEntry(other,'Q002').answer,'Evolutivo con fases');assert.equal(other.decisions.D01.answer,'Evolutivo');assert.equal(other.scenarios.A,'Confirmado el día anterior')})
test('rechaza formatos desconocidos de importación',()=>assert.throws(()=>normalizeImport({hi:1},[]),/formato/))
test('rechaza estados inventados y registros ajenos',()=>{const x=createState();x.responses.Q001={status:'No permitido',answer:'hola'};x.responses.INTRUSO={answer:'No'};const clean=normalizeImport(x,['Q001']);assert.equal(clean.responses.Q001.status,'Pendiente');assert.equal(clean.responses.INTRUSO,undefined)})
test('el markdown exporta respuestas y asuntos no definidos',()=>{const x=createState();x.responses.E01={answer:'Centralizar el recorrido del paciente',status:'Confirmado'};const md=markdownReport(questions,x);assert.ok(md.includes('Centralizar el recorrido del paciente'));assert.ok(md.includes('Preguntas críticas P0 pendientes'));assert.ok(md.includes('No inventar respuestas'));assert.ok(md.includes('## Registro de decisiones'))})
test('se conservan 12 decisiones arquitectónicas y 7 escenarios',()=>{assert.equal(DECISIONS.length,12);assert.equal(SCENARIOS.length,7)})

test('todas las 137 preguntas incluyen aclaración, ejemplo y resultado esperado, sin perder el texto original',()=>{
  const all=[...questions.executive,...questions.detailed]
  assert.equal(all.length,137)
  for(const q of all){
    for(const key of ['clarification','example','expected']){
      assert.equal(typeof q[key],'string',`${q.id}: ${key}`)
      assert.ok(q[key].trim().length>=60,`${q.id}: guía ${key} incompleta`)
    }
    assert.ok(q.text && q.hint && q.stakeholder)
  }
})
test('el Markdown incluye las aclaraciones de la entrevista y mantiene las respuestas',()=>{
  const state=createState();state.responses.Q029={answer:'Google es el maestro de la agenda.',status:'Confirmado'}
  const report=markdownReport(questions,state)
  assert.ok(report.includes(questions.detailed[28].clarification))
  assert.ok(report.includes('Ejemplo ilustrativo (no es requisito aprobado)'))
  assert.ok(report.includes(questions.executive[0].expected))
  assert.ok(report.includes('Google es el maestro de la agenda.'))
})
