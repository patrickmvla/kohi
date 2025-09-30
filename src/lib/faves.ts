// src/lib/faves.ts
export type FaveItem = {
  slug: string
  title: string
  year?: number | string
  cover?: string // put images in public/images/faves/...
  href?: string
}

export const topFilms: FaveItem[] = [
  {
    slug: 'the-batman',
    title: 'The Batman',
    year: 2022,
    cover: '/images/faves/films/the-batman.jpg',
  },
  {
    slug: 'killers-of-the-flower-moon',
    title: 'Killers of the Flower Moon',
    year: 2023,
    cover: '/images/faves/films/killers-of-the-flower-moon.jpg',
  },
  {
    slug: 'the-taste-of-things',
    title: 'The Taste of Things',
    year: 2023,
    cover: '/images/faves/films/the-taste-of-things.jpg',
  },
  {
    slug: 'wall-e',
    title: 'WALL·E',
    year: 2008,
    cover: '/images/faves/films/walle.jpg',
  },
  {
    slug: 'black-swan',
    title: 'Black Swan',
    year: 2010,
    cover: '/images/faves/films/black-swan.jpg',
  },
]

export const topShows: FaveItem[] = [
  {
    slug: 'breaking-bad',
    title: 'Breaking Bad',
    year: '2008–2013',
    cover: '/images/faves/shows/breaking-bad.jpg',
  },
  {
    slug: 'better-call-saul',
    title: 'Better Call Saul',
    year: '2015–2022',
    cover: '/images/faves/shows/better-call-saul.jpg',
  },
  {
    slug: 'chernobyl',
    title: 'Chernobyl',
    year: 2019,
    cover: '/images/faves/shows/chernobyl.jpg',
  },
  {
    slug: 'true-detective-s1',
    title: 'True Detective (S1)',
    year: 2014,
    cover: '/images/faves/shows/true-detective-s1.jpg',
  },
  {
    slug: 'blue-eye-samurai',
    title: 'Blue Eye Samurai',
    year: 2023,
    cover: '/images/faves/shows/blue-eye-samurai.jpg',
  },
]