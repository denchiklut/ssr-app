import { type FC, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type AppProps, getENV } from 'src/common'
import { Layout } from '@shared/layout'
import { Html } from '@shared/html'

const Home = lazy(() => import('pages/home'))
const About = lazy(() => import('pages/about'))
const NotFound = lazy(() => import('pages/not-found'))

export const App: FC<AppProps> = ({ nonce }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

	return (
		<Html nonce={nonce}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Html>
	)
}