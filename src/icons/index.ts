import { addCollection } from '@iconify/vue'
import type { IconifyJSON } from '@iconify/vue'

export function setupIcons() {
  addCollection({
    prefix: 'xr',
    icons: {
      hamburger: {
        body: '<g stroke="currentColor"><path d="M3.97485 5.97461H19.9748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.97485 11.9746H19.9748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.97485 17.9746H19.9748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>',
        width: 24,
        height: 24
      }
    }
  } satisfies IconifyJSON)
}
