import { Metadata } from "next"

export const GAME_VERSION = '1.1.1'

const TITLE = 'Math! Yay!'
const DESCRIPTION = 'Test your math knowledge'
const IMAGE = {
  url: process.env.NEXT_PUBLIC_BASE_URL + '/banner.png',
  alt: 'Math! Yay! logo',
  height: 300,
  width: 530
}

export const OPEN_GRAPH_METADATA: Metadata['openGraph'] = {
  type: 'website',
  title: TITLE,
  description: DESCRIPTION,
  url: process.env.NEXT_PUBLIC_BASE_URL,
  images: [IMAGE]
}

export const TWITTER_METADATA: Metadata['twitter'] = {
  card: 'summary_large_image',
  title: TITLE,
  description: DESCRIPTION,
  images: [IMAGE]
}