import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://kailex.site'
const DEFAULT_IMAGE = `${BASE_URL}/logokailexlight-v3.png`

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title
    ? `${title} | Kailex Agencia Web`
    : 'Kailex | Agencia de Desarrollo Web en Argentina'

  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
