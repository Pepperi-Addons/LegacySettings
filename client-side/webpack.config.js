const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular-webpack5/lib/webpack').default;
const { merge } = require('webpack-merge');
// const deps = require('./package.json').dependencies;
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = (angularWebpackConfig, options, env) => {
    angularWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_MODE: JSON.stringify(env.configuration),
        })
    )


    if (env.configuration === 'Standalone') {
        return angularWebpackConfig;
    }
    else {
        const mfConfig = {
            output: {
              uniqueName: "settings_iframe"
            },
            optimization: {
              // Only needed to bypass a temporary bug
              runtimeChunk: false,
              minimize: true,
              minimizer: [
              new TerserPlugin({
                extractComments: false,
                terserOptions: {keep_fnames: /^.$/}
              })]
            },
            plugins: [
              new ModuleFederationPlugin({
                // remotes: {},
                name: "settings_iframe",
                filename: "settings_iframe.js",
                exposes: {
                  './SettingsIframeComponent': './src/app/components/settings-iframe/settings-iframe.module.ts',
                  './SettingsIframeModule': './src/app/components/settings-iframe/settings-iframe.module.ts',
                },
                shared: {
                  // ...deps,
                  "@angular/core": { eager:true,  singleton: true,   strictVersion: false  },
                  "@angular/common": { eager:true,  singleton: true,  strictVersion: false   },
                  "@pepperi-addons/ngx-lib": { eager:true,  singleton: true,  strictVersion: false   }


                }
              }),
            ],
          };
        const merged = merge(angularWebpackConfig, mfConfig);
        const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);
        return singleSpaWebpackConfig;
    }


    // Feel free to modify this webpack config however you'd like to
};
