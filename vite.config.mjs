// import { defineConfig } from 'vite'
// import babel from 'vite-plugin-babel'

// import { ectPlugin } from './plugins/vite-plugin-ect.mjs'
// import { roadrollerPlugin } from './plugins/vite-plugin-roadroller.mjs'

// import { resolve } from 'node:path'

// /**
//  * Environment flags:
//  *
//  * USE_RR_CONFIG=1 - use existing roadroller config ('readroller-config.json').
//  */

// const babelConfig = {
//   babelrc: false,
//   configFile: false,
//   plugins: ['babel-plugin-syntax-hermes-parser'],
// }

// export default defineConfig((props) => {
//   switch (props.command) {
//     case 'build':
//       return {
//         build: {
//           assetsDir: '',
//           assetsInlineLimit: 800,
//           minify: true,
//           modulePreload: { polyfill: false },
//           outDir: resolve(__dirname, 'dist'),
//           target: 'es2020',
//           emptyOutDir: true,
//           rollupOptions: {
//             output: {
//               assetFileNames: '[name][extname]',
//               inlineDynamicImports: true
//             }
//           }
//         },
//         esbuild: true,
//         plugins: [
//           babel({ babelConfig, filter: /\.m?js$/ }),
//           roadrollerPlugin(),
//           ectPlugin()
//         ]
//       }

//     default:
//       return {
//         plugins: [babel({ babelConfig, filter: /\.m?js$/ })],
//         server: { port: 1234 }
//       }
//   }
// })
import { defineConfig } from 'vite';
// import babel from 'vite-plugin-babel'

// import { ectPlugin } from './plugins/vite-plugin-ect.mjs'
// import { roadrollerPlugin } from './plugins/vite-plugin-roadroller.mjs'

// import { resolve } from 'node:path'

// /**
//  * Environment flags:
//  *
//  * USE_RR_CONFIG=1 - use existing roadroller config ('readroller-config.json').
//  */

// const babelConfig = {
//   babelrc: false,
//   configFile: false,
//   plugins: ['babel-plugin-syntax-hermes-parser'],
//   presets: ['@babel/preset-flow']
// }

// export default defineConfig((props) => {
//   switch (props.command) {
//     case 'build':
//       return {
//         build: {
//           assetsDir: '',
//           assetsInlineLimit: 800,
//           minify: true,
//           modulePreload: { polyfill: false },
//           outDir: resolve(__dirname, 'dist'),
//           target: 'es2020',
//           emptyOutDir: true,
//           rollupOptions: {
//             output: {
//               assetFileNames: '[name][extname]',
//               inlineDynamicImports: true
//             }
//           }
//         },
//         esbuild: true,
//         plugins: [
//           babel({ babelConfig, filter: /\.m?js$/ }),
//           roadrollerPlugin(),
//           ectPlugin()
//         ]
//       }

//     default:
//       return {
//         plugins: [babel({ babelConfig, filter: /\.m?js$/ })],
//         server: { port: 1234 }
//       }
//   }
// });

export default defineConfig({
    build: {
        modulePreload: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                arrows: true,
                arguments: true,
                booleans_as_integers: true,
                collapse_vars: true,
                comparisons: true,
                expression: true,
                unsafe: true,
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_Function: true,
                unsafe_math: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_symbols: true,
                unsafe_undefined: true,
                unused: true,
                reduce_funcs: true,
                reduce_vars: true,
                join_vars: true,
                passes: 4,
                pure_new: true,
                toplevel: true
            },
            mangle: {
                toplevel: true
            }
        }
    },  
})