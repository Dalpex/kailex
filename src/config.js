// Contact data shared by every page.
export const WHATSAPP_NUMBER = '5491163581678'
export const WHATSAPP_DISPLAY = '+54 9 11 6358 1678'
export const INSTAGRAM = 'kailexwebs'
export const CONTACT_EMAIL = 'dalpex@kailex.site'

export const waLink = (text = 'Hola Kailex! Quiero mi página web') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
export const igLink = `https://instagram.com/${INSTAGRAM}`
