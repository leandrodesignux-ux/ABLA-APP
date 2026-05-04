export const anonimoBotFlows = {
  initial: {
    botMessage: 'Hola, estoy aquí para escucharte. ¿Qué está pasando?',
    quickReplies: [
      { label: 'Me están acosando', next: 'acoso' },
      { label: 'Vi algo que me preocupa', next: 'testigo' },
      { label: 'Solo quiero hablar', next: 'libre' },
      { label: 'Tengo miedo', next: 'miedo' },
    ],
  },
  acoso: {
    botMessage: '¿Qué tipo de acoso estás viviendo?',
    quickReplies: [
      { label: 'Me agreden físicamente', next: 'fisico' },
      { label: 'Me insultan o humillan', next: 'verbal' },
      { label: 'Me acosan por redes sociales', next: 'cyber' },
      { label: 'Me excluyen del grupo', next: 'exclusion' },
    ],
  },
  fisico: {
    botMessage: 'Eso es muy serio y quiero que sepas que no es tu culpa. ¿Estás en un lugar seguro ahora mismo?',
    quickReplies: [
      { label: 'Sí, estoy bien', next: 'fisico_seguro' },
      { label: 'No, necesito ayuda ahora', next: 'urgente' },
    ],
  },
  urgente: {
    botMessage: '⚠️ Llama al 147 ahora (gratuito, 24/7). También puedes escribir al WhatsApp de OPD: +56 9 XXXX XXXX. ¿Quieres que te ayude a reportarlo aquí?',
    quickReplies: [
      { label: 'Reportar aquí', next: 'derivar_reporte' },
      { label: 'Pedir cita con psicólogo', next: 'derivar_cita' },
    ],
  },
  fisico_seguro: {
    botMessage: '¿Con qué frecuencia ocurre esto?',
    quickReplies: [
      { label: 'Pasó una vez', next: 'libre' },
      { label: 'Pasa seguido', next: 'derivar_reporte' },
    ],
  },
  verbal: {
    botMessage: 'Nadie merece ser insultado. ¿Ocurre en el colegio o también fuera?',
    quickReplies: [
      { label: 'Solo en el colegio', next: 'derivar_reporte' },
      { label: 'En todos lados', next: 'cyber' },
    ],
  },
  cyber: {
    botMessage: 'El cyberbullying es tan serio como el físico. ¿Guardaste capturas de pantalla?',
    quickReplies: [
      { label: 'Sí tengo capturas', next: 'derivar_reporte' },
      { label: 'No, ¿qué hago?', next: 'cyber_guia' },
    ],
  },
  cyber_guia: {
    botMessage: 'Toma capturas ahora. Bloquea al agresor. No respondas a las provocaciones. ¿Quieres reportarlo?',
    quickReplies: [
      { label: 'Sí, reportar ahora', next: 'derivar_reporte' },
      { label: 'Quiero hablar más', next: 'libre' },
    ],
  },
  exclusion: {
    botMessage: 'Sentirse excluido duele mucho. ¿Hay algún adulto en el colegio que te genere confianza?',
    quickReplies: [
      { label: 'Sí, mi tutor', next: 'derivar_tutor' },
      { label: 'No confío en nadie', next: 'derivar_cita' },
    ],
  },
  testigo: {
    botMessage: 'Está muy bien que lo cuentes. ¿Qué fue lo que viste?',
    quickReplies: [
      { label: 'Vi una pelea', next: 'fisico' },
      { label: 'Alguien está siendo excluido', next: 'exclusion' },
      { label: 'Vi acoso en redes', next: 'cyber' },
    ],
  },
  miedo: {
    botMessage: 'Entiendo. Tu seguridad es lo primero. ¿El miedo es por algo que te está pasando a ti?',
    quickReplies: [
      { label: 'Sí, me amenazaron', next: 'urgente' },
      { label: 'Es un miedo general', next: 'libre' },
    ],
  },
  derivar_reporte: {
    botMessage: 'Te voy a ayudar a documentar esto. ¿Quieres hacer un reporte ahora? Tu identidad puede ser anónima.',
    quickReplies: [
      { label: 'Sí, hacer reporte', next: 'END_REPORTE' },
      { label: 'Primero hablar más', next: 'libre' },
    ],
  },
  derivar_cita: {
    botMessage: 'Hablar con un profesional puede ayudarte mucho. ¿Quieres que te muestre quiénes están disponibles?',
    quickReplies: [
      { label: 'Ver psicólogos', next: 'END_CITA' },
      { label: 'Primero hablar más', next: 'libre' },
    ],
  },
  derivar_tutor: {
    botMessage: 'Tu tutor puede ayudarte. ¿Quieres chatear directamente con él/ella?',
    quickReplies: [
      { label: 'Ir al chat con tutor', next: 'END_TUTOR' },
      { label: 'Mejor anónimo', next: 'libre' },
    ],
  },
  libre: {
    botMessage: 'Cuéntame más. Estoy escuchando.',
    quickReplies: [],
  },
}

export const tutorBotFlows = {
  initial: {
    botMessage: 'Hola, soy tu tutor/a. ¿En qué puedo ayudarte?',
    quickReplies: [
      { label: 'Tengo un problema con alguien', next: 'conflicto' },
      { label: 'Quiero hablar en privado', next: 'privado' },
      { label: 'Necesito consejo', next: 'consejo' },
      { label: 'Quiero agendar cita', next: 'END_CITA' },
    ],
  },
  conflicto: {
    botMessage: '¿Quieres contarme qué pasó?',
    quickReplies: [
      { label: 'Es con un compañero', next: 'libre' },
      { label: 'Es con un profesor', next: 'libre' },
      { label: 'Prefiero no decir quién', next: 'libre' },
    ],
  },
  privado: {
    botMessage: 'Todo lo que me cuentes aquí es confidencial. ¿Qué quieres contarme?',
    quickReplies: [],
  },
  consejo: {
    botMessage: '¿Sobre qué tema necesitas consejo?',
    quickReplies: [
      { label: 'Cómo hablar con mis padres', next: 'libre' },
      { label: 'Cómo manejar el estrés', next: 'derivar_consejos' },
      { label: 'Un conflicto con alguien', next: 'conflicto' },
    ],
  },
  derivar_consejos: {
    botMessage: 'Tenemos recursos que pueden ayudarte. ¿Los revisamos juntos?',
    quickReplies: [
      { label: 'Ver consejos', next: 'END_CONSEJOS' },
      { label: 'Seguir hablando', next: 'libre' },
    ],
  },
  libre: {
    botMessage: 'Entiendo. ¿Hay algo más que quieras contarme?',
    quickReplies: [],
  },
}

export const apoderadoBotFlows = {
  initial: {
    botMessage: 'Hola. Estoy aquí para ayudarte a proteger a tu hijo/a. ¿Qué situación quieres reportar o consultar?',
    quickReplies: [
      { label: 'Quiero reportar acoso', next: 'reporte_apoderado' },
      { label: 'Noto cambios en mi hijo/a', next: 'red_flags' },
      { label: 'Ya hice un reporte, quiero seguimiento', next: 'seguimiento' },
      { label: 'Necesito hablar con el tutor', next: 'derivar_tutor' },
    ],
  },
  reporte_apoderado: {
    botMessage: '¿Qué tipo de situación está viviendo tu hijo/a?',
    quickReplies: [
      { label: 'Agresión física o material', next: 'reporte_fisico' },
      { label: 'Insultos o humillaciones verbales', next: 'reporte_verbal' },
      { label: 'Acoso en redes sociales', next: 'reporte_cyber' },
      { label: 'Lo excluyen del grupo', next: 'reporte_exclusion' },
    ],
  },
  reporte_fisico: {
    botMessage: 'Es importante documentar esto. ¿Tienes fotos de las lesiones o del daño material? Puedes adjuntarlas al reporte formal.',
    quickReplies: [
      { label: 'Sí, hacer reporte ahora', next: 'END_REPORTE' },
      { label: 'Primero hablar con el tutor', next: 'derivar_tutor' },
    ],
  },
  reporte_verbal: {
    botMessage: 'Los insultos repetidos son acoso. ¿Tu hijo/a te contó quién o quiénes son los que lo hacen?',
    quickReplies: [
      { label: 'Sí, sé quién es', next: 'END_REPORTE' },
      { label: 'No sabe/no quiso decir', next: 'reporte_sin_agresor' },
    ],
  },
  reporte_sin_agresor: {
    botMessage: 'No es necesario saber el nombre del agresor para reportar. Podemos hacer un reporte basado en lo que observaste.',
    quickReplies: [
      { label: 'Hacer reporte igual', next: 'END_REPORTE' },
      { label: 'Pedir cita para hablar', next: 'END_CITA' },
    ],
  },
  reporte_cyber: {
    botMessage: 'El ciberacoso deja evidencia. Te recomiendo: (1) Tomar capturas de pantalla con fecha visible, (2) NO borrar los mensajes, (3) Reportar en la plataforma y en el colegio. ¿Quieres hacer el reporte formal?',
    quickReplies: [
      { label: 'Sí, reportar ahora', next: 'END_REPORTE' },
      { label: 'Quiero más consejos', next: 'END_CONSEJOS' },
    ],
  },
  reporte_exclusion: {
    botMessage: 'La exclusión social sostenida es una forma de acoso. ¿Con qué frecuencia ocurre?',
    quickReplies: [
      { label: 'Pasa todos los días', next: 'END_REPORTE' },
      { label: 'Es intermitente', next: 'derivar_tutor' },
    ],
  },
  red_flags: {
    botMessage: 'Los cambios de comportamiento son señales importantes. ¿Qué cambios has notado?',
    quickReplies: [
      { label: 'No quiere ir al colegio', next: 'red_flag_escuela' },
      { label: 'Cambios de humor o llanto', next: 'red_flag_emocional' },
      { label: 'Heridas o ropa dañada', next: 'red_flag_fisico' },
      { label: 'Ansiedad con el celular', next: 'red_flag_digital' },
    ],
  },
  red_flag_escuela: {
    botMessage: 'La fobia escolar es una señal seria. Puede indicar miedo a encontrarse con el agresor. ¿Hace cuánto tiempo ocurre esto?',
    quickReplies: [
      { label: 'Más de 2 semanas', next: 'END_REPORTE' },
      { label: 'Empezó esta semana', next: 'derivar_tutor' },
    ],
  },
  red_flag_emocional: {
    botMessage: 'Los cambios emocionales bruscos son uno de los indicadores más claros de bullying. Te recomiendo agendar una cita con el equipo psicosocial.',
    quickReplies: [
      { label: 'Agendar cita', next: 'END_CITA' },
      { label: 'Reportar primero', next: 'END_REPORTE' },
    ],
  },
  red_flag_fisico: {
    botMessage: '⚠️ Las lesiones físicas deben documentarse y reportarse de inmediato. Si son graves, llama al 147 (SENAME) o acude a urgencias.',
    quickReplies: [
      { label: 'Hacer reporte urgente', next: 'END_REPORTE' },
      { label: 'Llamar al 147', next: 'info_147' },
    ],
  },
  red_flag_digital: {
    botMessage: 'La ansiedad ante el celular suele indicar ciberacoso activo. ¿Tu hijo/a ha cambiado contraseñas o borrado apps recientemente?',
    quickReplies: [
      { label: 'Sí, actuar ahora', next: 'reporte_cyber' },
      { label: 'No sé cómo abordarlo', next: 'END_CONSEJOS' },
    ],
  },
  info_147: {
    botMessage: 'SENAME Fono Niños: 147 (gratuito, 24 horas). Línea de la Vida: 600 360 7777 (crisis emocional). OPD de tu comuna puede orientarte sobre protección. ¿Quieres que registremos el incidente aquí también?',
    quickReplies: [
      { label: 'Sí, registrar aquí', next: 'END_REPORTE' },
      { label: 'Solo necesitaba los números', next: 'libre' },
    ],
  },
  seguimiento: {
    botMessage: 'Puedes ver el estado de tu reporte en la sección "Reportar". Si no has recibido respuesta en 48 horas, tienes derecho a solicitarla al equipo de convivencia.',
    quickReplies: [
      { label: 'Ver mis reportes', next: 'END_REPORTE' },
      { label: 'Hablar con tutor', next: 'derivar_tutor' },
    ],
  },
  derivar_tutor: {
    botMessage: 'Te conecto con el tutor de tu hijo/a. Puedes también enviar un mensaje estructurado directamente.',
    quickReplies: [
      { label: 'Ir al chat con tutor', next: 'END_TUTOR' },
      { label: 'Prefiero hacer un reporte formal', next: 'END_REPORTE' },
    ],
  },
  libre: {
    botMessage: 'Entiendo. Cuéntame más, estoy aquí para orientarte.',
    quickReplies: [],
  },
}

export const profesionalBotFlows = {
  initial: {
    botMessage: 'Hola. ¿Qué necesitas gestionar hoy?',
    quickReplies: [
      { label: 'Ver casos pendientes', next: 'casos_pendientes' },
      { label: 'Consultar protocolos', next: 'protocolos' },
      { label: 'Derivar un caso', next: 'derivacion' },
      { label: 'Recursos de intervención', next: 'recursos' },
    ],
  },
  casos_pendientes: {
    botMessage: 'Puedes revisar todos los casos activos en tu panel de inicio. ¿Necesitas información sobre algún protocolo específico?',
    quickReplies: [
      { label: 'Ver panel de casos', next: 'END_HOME_PROF' },
      { label: 'Protocolo de acoso físico', next: 'proto_fisico' },
      { label: 'Protocolo de ciberacoso', next: 'proto_cyber' },
    ],
  },
  protocolos: {
    botMessage: '¿Sobre qué tipo de intervención necesitas información?',
    quickReplies: [
      { label: 'Acoso físico', next: 'proto_fisico' },
      { label: 'Ciberacoso / IA', next: 'proto_cyber' },
      { label: 'Exclusión relacional', next: 'proto_exclusion' },
      { label: 'Autolesiones / ideación', next: 'proto_urgente' },
    ],
  },
  proto_fisico: {
    botMessage: 'Protocolo Acoso Físico: (1) Resguardo inmediato del estudiante, (2) Registro en bitácora con fecha/lugar/testigos, (3) Notificación a familia en 24h, (4) Derivación a OPD si reiterado. ¿Necesitas el protocolo completo?',
    quickReplies: [
      { label: 'Ver protocolo completo', next: 'END_PROTOCOLOS' },
      { label: 'Registrar caso nuevo', next: 'END_REPORTE' },
    ],
  },
  proto_cyber: {
    botMessage: 'Protocolo Ciberacoso: (1) Preservar evidencia digital, (2) No eliminar contenido hasta peritaje, (3) Activar resguardo de identidad del afectado, (4) Coordinar con plataforma digital si corresponde. ¿Abrir caso?',
    quickReplies: [
      { label: 'Abrir caso', next: 'END_REPORTE' },
      { label: 'Ver protocolo completo', next: 'END_PROTOCOLOS' },
    ],
  },
  proto_exclusion: {
    botMessage: 'La exclusión relacional requiere intervención de grupo. Considera: (1) Entrevistas individuales, (2) Dinámicas de cohesión grupal, (3) Trabajo con apoderados. ¿Registrar caso?',
    quickReplies: [
      { label: 'Registrar', next: 'END_REPORTE' },
      { label: 'Agendar cita grupal', next: 'END_CITA' },
    ],
  },
  proto_urgente: {
    botMessage: '⚠️ PROTOCOLO DE CRISIS: (1) No dejar al estudiante solo, (2) Llamar a SENAME 147 o Línea de la Vida 600 360 7777, (3) Notificar a dirección de inmediato, (4) Contactar familia. ¿Activar protocolo?',
    quickReplies: [
      { label: 'Activar protocolo ahora', next: 'END_REPORTE' },
      { label: 'Ya está contenido', next: 'derivacion' },
    ],
  },
  derivacion: {
    botMessage: '¿A qué instancia necesitas derivar?',
    quickReplies: [
      { label: 'OPD / Servicios sociales', next: 'derivar_opd' },
      { label: 'Salud mental externa', next: 'derivar_salud' },
      { label: 'Otro profesional interno', next: 'libre' },
    ],
  },
  derivar_opd: {
    botMessage: 'OPD (Oficina de Protección de Derechos): Contacta a la OPD de la comuna. Requiere informe técnico con: antecedentes, frecuencia, impacto observado y medidas tomadas.',
    quickReplies: [
      { label: 'Generar informe', next: 'END_REPORTE' },
      { label: 'Ver contactos OPD', next: 'END_CONSEJOS' },
    ],
  },
  derivar_salud: {
    botMessage: 'Para derivación a salud mental: COSAM de la comuna (gratuito), hospitales con unidad infanto-juvenil, o psicólogos de la red JUNAEB si el colegio está adscrito.',
    quickReplies: [
      { label: 'Registrar derivación', next: 'END_REPORTE' },
      { label: 'Ver más recursos', next: 'END_CONSEJOS' },
    ],
  },
  recursos: {
    botMessage: '¿Qué tipo de recurso necesitas?',
    quickReplies: [
      { label: 'Frases de validación emocional', next: 'frases_validacion' },
      { label: 'Indicadores de alerta (red flags)', next: 'END_CONSEJOS' },
      { label: 'Marco legal vigente', next: 'END_PROTOCOLOS' },
    ],
  },
  frases_validacion: {
    botMessage: 'Frases validadoras clave: "Te creo, gracias por contarme." — "No es tu culpa." — "Estamos juntos en esto." — "¿Cómo te gustaría que te ayude?" Evitar: "No les hagas caso" o "¿Qué hiciste para provocarlos?"',
    quickReplies: [
      { label: 'Ver más recursos', next: 'END_CONSEJOS' },
      { label: 'Volver al inicio', next: 'initial' },
    ],
  },
  libre: {
    botMessage: 'Entendido. ¿En qué más puedo ayudarte?',
    quickReplies: [],
  },
}

export const CHAT_END_ACTIONS = {
  END_REPORTE: '/reportar',
  END_CITA: '/ayuda/cita',
  END_TUTOR: '/chat/tutor',
  END_CONSEJOS: '/ayuda/consejos',
  END_PROTOCOLOS: '/protocolos',
  END_HOME_PROF: '/home/profesional',
}
