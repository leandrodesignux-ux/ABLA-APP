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
    botMessage: 'Llama al 147 ahora (gratuito, 24h). También puedes ir con un adulto de confianza en este momento.',
    quickReplies: [
      { label: 'Quiero reportarlo aquí', next: 'derivar_reporte' },
      { label: 'Pedir cita con psicólogo', next: 'derivar_cita' },
    ],
    action: null,
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

// Acciones finales — cuando next empieza con "END_", el chat hace navigate
export const CHAT_END_ACTIONS = {
  END_REPORTE: '/reportar',
  END_CITA: '/ayuda/cita',
  END_TUTOR: '/chat/tutor',
  END_CONSEJOS: '/ayuda/consejos',
}
