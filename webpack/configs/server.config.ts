import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { DIST_DIR, ROOT_DIR } from '../env'

const config = {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    entry: './src/client/components/@shared/app',
    context: ROOT_DIR,
    output: {
        filename: '[name].server.js',
        libraryTarget: 'commonjs2',
        path: DIST_DIR,
        publicPath: '/'
    },
    module: {
        rules: [
            rules.javascriptRule,
            rules.typescriptRule,
            rules.htmlRule,
            rules.mediasRule,
            rules.fontsRule,
            rules.cssRule,
            ...rules.svgRules
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
        plugins: [plugins.tsPaths]
    },
    plugins: [plugins.miniCssExtractPlugin, plugins.definePlugin({ server: true })],
    externals: [nodeExternals()]
}

export default config
