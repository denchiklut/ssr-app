import { Workbox } from 'workbox-window'

export function registerSW() {
	if ('serviceWorker' in navigator) {
		const wb = new Workbox('/service-worker.js', { scope: '/' })

		wb.addEventListener('waiting', _ => {
			console.info(
				"A new service worker has installed, but it can't activate until all tabs running the current version have fully unloaded."
			)
		})

		wb.addEventListener('message', event => {
			if (event.data.type === 'CACHE_UPDATED') {
				const { updatedURL } = event.data.payload

				console.info(`A newer version of ${updatedURL} is available!`)
			}
		})

		wb.register()
	}
}
