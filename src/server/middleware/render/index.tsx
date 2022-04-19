import { NextFunction, Request, Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from '@shared/app'
import { getHtml } from './render.util'
import { resolve } from 'path'

export const render = (req: Request, res: Response, next: NextFunction) => {
  const statsFile = resolve('./dist/loadable-stats.json')
  const chunkExtractor = new ChunkExtractor({ statsFile })

  res.renderApp = () => {
    const location = req.url
    const jsx = chunkExtractor.collectChunks(
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    )
    const reactHtml = renderToString(jsx)

    res.status(200).send(getHtml(reactHtml, chunkExtractor))
  }

  next()
}