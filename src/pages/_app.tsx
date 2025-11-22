import type { AppProps } from 'next/app'
import '../app/globals.css'
import 'artplayer/dist/artplayer.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

