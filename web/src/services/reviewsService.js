/**
 * Reviews service — ready for real API integration.
 * Replace the implementation below with fetch(yourApiUrl) when backend is available.
 * Review content (text, authorName, authorRole) is not translated; display as returned.
 * @returns {Promise<Array<{ id: string, rating: number, text: string, authorName: string, authorRole: string }>>}
 */
export async function getReviews() {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch('/api/reviews')
  // if (!res.ok) throw new Error('Failed to load reviews')
  // return res.json()

  return Promise.resolve(STATIC_REVIEWS)
}

const STATIC_REVIEWS = [
  {
    id: '1',
    rating: 5,
    text: '"Em 6 meses, minha filha passou a se comunicar fluentemente. Ela aprendeu de forma natural, sem pressão. Hoje assiste filmes em inglês sem legendas!"',
    authorName: 'Ana Paula Silva',
    authorRole: 'Mãe da Sofia, 7 anos',
  },
  {
    id: '2',
    rating: 5,
    text: '"Como executivo em empresa internacional, sei o valor do inglês fluente. Ver meu filho desenvolvendo pronúncia perfeita aos 5 anos é extraordinário. Melhor investimento que já fiz."',
    authorName: 'Ricardo Mendes',
    authorRole: 'Pai do Lucas, 5 anos',
  },
  {
    id: '3',
    rating: 5,
    text: '"Meus dois filhos adoram! O método é tão envolvente que eles nem percebem que estão estudando. A plataforma respeita o ritmo individual de cada um."',
    authorName: 'Camila Rodrigues',
    authorRole: 'Mãe de Pedro e da Laura, 8 e 6 anos',
  },
]

export default getReviews
