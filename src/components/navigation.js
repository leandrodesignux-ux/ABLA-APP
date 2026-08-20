import {
  AlertTriangle, BookMarked, ClipboardList, Heart, HeartHandshake,
  Home, MessageCircle, Shield, User,
} from 'lucide-react'

export const navigationByProfile = {
  estudiante: [
    { to: '/home', label: 'Inicio', icon: Home, match: (p) => p === '/home' || p === '/' },
    { to: '/chat', label: 'Chat', icon: MessageCircle, match: (p) => p.startsWith('/chat') },
    { to: '/ayuda', label: 'Ayuda', icon: HeartHandshake, match: (p) => p.startsWith('/ayuda') },
    { to: '/reportar', label: 'Reportar', icon: AlertTriangle, match: (p) => p.startsWith('/reportar') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ],
  apoderado: [
    { to: '/home/apoderado', label: 'Inicio', icon: Home, match: (p) => p === '/home/apoderado' },
    { to: '/bitacora', label: 'Bitácora', icon: BookMarked, match: (p) => p.startsWith('/bitacora') },
    { to: '/protocolos', label: 'Protocolos', icon: Shield, match: (p) => p.startsWith('/protocolos') },
    { to: '/apoderado/nee', label: 'Mi hijo/a', icon: Heart, match: (p) => p.startsWith('/apoderado') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ],
  profesional: [
    { to: '/home/profesional', label: 'Casos', icon: ClipboardList, match: (p) => p === '/home/profesional' },
    { to: '/chat', label: 'Chat', icon: MessageCircle, match: (p) => p.startsWith('/chat') },
    { to: '/protocolos', label: 'Protocolos', icon: Shield, match: (p) => p.startsWith('/protocolos') },
    { to: '/bitacora', label: 'Bitácora', icon: BookMarked, match: (p) => p.startsWith('/bitacora') },
    { to: '/perfil', label: 'Perfil', icon: User, match: (p) => p.startsWith('/perfil') },
  ],
}

export function getNavigation(perfil) {
  return navigationByProfile[perfil] || navigationByProfile.estudiante
}
