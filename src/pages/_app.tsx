import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import '@fortawesome/fontawesome-svg-core/styles.css'
const { library, config } = require('@fortawesome/fontawesome-svg-core');
import { faXmark, faFloppyDisk, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faXmark, faFloppyDisk, faTrash, faEdit)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
