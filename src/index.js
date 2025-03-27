export default (options = {}) => {
    const {
        filter = /\.(svg|gif|png|jpe?g|webp|ttf|woff2?|otf|eot)$/,
        importer = /\.(s[ac]ss|css)$/,
        kind = /^url\-token$/
     } = options
    return {
        name: 'cssExternals',
        setup(build) {
            build.onResolve({ filter }, args => {
                const external = kind.test(args.kind) && importer.test(args.importer)
                return external ? { path: args.path, external } : undefined
            })
        }
    }
}
