# esbuild-css-externals-plugin

esbuild plugin which helps to mark some files references from stylesheet (e.g. images or fonts) as external resources

## Use case

The plugin is useful when images or/and fonts which defined in css file are already located
in a public storage for static files. For example, the source code of stylesheet `style.css`
references to image:

```css
.logo {
    background-image: url(/assets/images/logo.svg)
    /* ... omit other styles ... */
}
```

By default, esbuild does not resolves this path. We need to setup one of available loader.
If we use loader `file` or `copy` the image file will copied into output directory.

For example if images directory is `public/assets/images/` and output directory is `public/dist/`
we get a copy of file `public/assets/images/logo.svg` in `public/dist/logo.svg`.
But what if we won't to do this?

This plugin solves this problem. It can marks this image as `external` and esbuild does not
copy this file from source location into output directory.

## Install

```sh
npm install --save-dev esbuild-css-externals-plugin
```

## Usage

Add a plugin to your `esbuild.mjs`:

```js
import * as esbuild from 'esbuild'
import cssExternalsPlugin from 'esbuild-css-externals-plugin'

await esbuild.build({
    // ...
    plugins: [
        // ...
        cssExternalsPlugin({
            // options...
        }),
        // ...
    ],
    // ...
})
```

Using with sass/scss:

```js
import * as esbuild from 'esbuild'
import cssExternalsPlugin from 'esbuild-css-externals-plugin'
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin'

await esbuild.build({
    // ...
    plugins: [
        // ...
        cssExternalsPlugin({
            // options...
        }),
        sassPlugin({
            filter: /\.module\.(s[ac]ss|css)$/,
            type: 'css',
            transform: postcssModules({
                generateScopedName: '[name]__[local]__[hash:base64safe:5]'
            })
        }),
        sassPlugin({
            filter: /global\.(s[ac]ss|css)$/,
            type: 'css'
        })
        // ...
    ],
    // ...
})
```

### Options

#### `filter`

This is a regular expression (keep in mind that this is in [Go syntax](https://pkg.go.dev/regexp/syntax)) to filter resources referenced by `path`.

Default value is `/\.(svg|gif|png|jpe?g|webp|ttf|woff2?|otf|eot)$/`.

#### `importer`

This is a regular expression to filter `importer` which reference to resource.

Default value is `/\.(s[ac]ss|css)$/`.

#### `kind`

This is a regular expression to filter a `kind` which says how the `path` to be resolved is being imported.

Default value is `/^url\-token$/`.

## License

MIT
