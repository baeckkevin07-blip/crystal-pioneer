export const campaignTemplates = [
  {
    id: 'diabete',
    name: 'Campagne Diabète',
    description: 'Sensibilisation et dépistage du diabète en officine. Kit communication fourni.',
    icon: '🩺',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-11` // Novembre
    }
  },
  {
    id: 'grippe',
    name: 'Vaccination Grippe',
    description: 'Campagne de vaccination contre la grippe saisonnière. Affiches et flyers inclus.',
    icon: '💉',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-10` // Octobre
    }
  },
  {
    id: 'hypertension',
    name: 'Hypertension Artérielle',
    description: 'Dépistage et prévention de l\'hypertension. Matériel de mesure disponible.',
    icon: '❤️',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-02` // Février
    }
  },
  {
    id: 'osteoporose',
    name: 'Ostéoporose',
    description: 'Sensibilisation à l\'ostéoporose et prévention des fractures.',
    icon: '🦴',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-03` // Mars
    }
  },
  {
    id: 'allergies',
    name: 'Allergies Saisonnières',
    description: 'Conseil et prévention des allergies printanières.',
    icon: '🌸',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-04` // Avril
    }
  },
  {
    id: 'custom',
    name: 'Campagne Personnalisée',
    description: '',
    icon: '✏️',
    defaultMonth: () => {
      const now = new Date()
      return `${now.getFullYear()}-${String(now.getMonth() + 2).padStart(2, '0')}`
    }
  }
]
