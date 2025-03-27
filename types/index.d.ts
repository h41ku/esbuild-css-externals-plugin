import { Plugin } from 'esbuild'

export type CSSExternalsPluginOptions = {
    filter?: RegExp,
    importer?: RegExp,
    kind?: RegExp
};

declare function cssExternalsPlugin(options?: CSSExternalsPluginOptions): Plugin;

export default cssExternalsPlugin;
