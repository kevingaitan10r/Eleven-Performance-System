# Información de Eleven Performance

(Los planes y precios de membresía están en catalogo.json y en esta guía.)

## Sobre nosotros
- **Eleven Performance** es un centro especializado en alto rendimiento deportivo, ciencias del deporte y preparación física de élite.
- **Lema oficial:** *ADAPT · PERFORM · WIN*
- Ofrecemos entrenamiento de fuerza e hipertrofia, acondicionamiento funcional, readaptación biomecánica y seguimiento personalizado para atletas y personas comprometidas con su salud y rendimiento físico.
- Este asistente de WhatsApp atiende las 24 horas del día para agendar entrenamientos por cupos, gestionar cancelaciones, consultar el estado de tu membresía y coordinar renovaciones y pagos.

## Horarios del Gimnasio
- **Horarios de entrenamiento en sede:**
  - Lunes a viernes: 6:00 a.m. a 10:00 p.m.
  - Sábados: 7:00 a.m. a 4:00 p.m.
  - Domingos y festivos: 8:00 a.m. a 1:00 p.m.
- **Horario de atención con asesor humano / administración:**
  - Lunes a viernes: 8:00 a.m. a 8:00 p.m.
  - Sábados: 8:00 a.m. a 2:00 p.m.
  - Domingos: Asistencia automatizada por este chat.

## Planes y Membresías
1. **Plan Mensual Ilimitado (Fuerza & Gym Libre):**
   - **Valor:** $120.000 COP / mes.
   - Acceso libre a la sala de musculación, pesas libres y máquinas en cualquier turno disponible.
2. **Plan Funcional & Fuerza Grupal:**
   - **Valor:** $95.000 COP / mes.
   - Sesiones grupales guiadas de potencia, core, movilidad y capacidad cardiovascular.
3. **Plan Personalizado 1 a 1 (Alto Rendimiento):**
   - **Valor:** $280.000 COP / mes.
   - Acompañamiento exclusivo con preparador físico / científico del deporte, periodización individualizada y control de cargas.
4. **Plan Trimestral All-Access:**
   - **Valor:** $320.000 COP / 3 meses.
   - Acceso completo por 90 días con ahorro preferencial.

## Sistema de Cupos y Agendamiento de Turnos
- Para garantizar espacio, seguridad, higiene y disponibilidad total de máquinas y racks, cada turno por hora cuenta con un **máximo estricto de 8 cupos simultáneos**.
- **Cómo agendar por este chat:**
  - El alumno simplemente indica la fecha, hora y modalidad que desea (ejemplo: *"Quiero entrenar mañana a las 7:00 a.m. en Fuerza"*).
  - El asistente valida la disponibilidad con la herramienta `consultar_cupos_entrenamiento` y reserva el turno con `agendar_sesion_entrenamiento`.
- **Turnos disponibles:** Cada hora en punto desde las 6:00 a.m. hasta las 9:00 p.m. (último ingreso a las 9:00 p.m., cierre a las 10:00 p.m.).

## Política de Cancelación de Sesiones
- Si un alumno no puede asistir a su entrenamiento agendado, debe cancelar con **al menos 2 horas de anticipación** mediante este chat (`cancelar_sesion_entrenamiento`).
- De esta manera el cupo se libera automáticamente en el sistema y queda disponible para que otro compañero pueda entrenar.
- Si no cancela con anticipación, el turno se cuenta como tomado.

## Estado de Mensualidad y Recordatorios de Cobro
- El alumno puede consultar en cualquier momento el estado de su plan escribiendo:
  - *"¿Cuándo vence mi mensualidad?"*
  - *"¿Cuánto debo pagar?"*
- El asistente verifica su registro con `consultar_estado_mensualidad` y le indica los días restantes, fecha límite y valor.
- 5 días antes del vencimiento de la mensualidad, el sistema emite un recordatorio amigable con los datos oficiales de recaudo para asegurar la continuidad del acceso.

## Formas de Pago y Cuentas Oficiales
- Para renovar o pagar la mensualidad, se reciben transferencias en las siguientes cuentas oficiales:
  - **Nequi:** 320 605 1319
  - **Daviplata:** 320 605 1319
  - **Bancolombia:** Cuenta de Ahorros 245-891234-01
  - **Titular:** Eleven Performance SAS
- **Confirmación:** Una vez realizada la transferencia, el alumno debe enviar el comprobante o captura por este mismo chat para registrar el pago y renovar su vigencia en el sistema.

## Evaluaciones de Rendimiento Deportivo (Eleven Performance Hub)
- Contamos con tecnología de evaluación de nivel profesional integrada a nuestro software interno:
  - **Antropometría y Composición Corporal:** Control de pliegues, masa grasa y masa muscular.
  - **GPS & Cinemática:** Distancia total, velocidad máxima (Vmax), HSR (+19.8 km/h), sprint y Player Load.
  - **Perfil Neuromuscular:** Salto contramovimiento (CMJ), reactividad elástica (RSI), stiffness y asimetrías bilaterales.
- Si el deportista desea programar una valoración física completa, puede solicitarla a través de este chat con su preparador físico.
