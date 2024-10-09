
# mfe-catalogo
MFE encargado de la visualización y gestión del catálogo de productos, permitiendo al usuario explorar y filtrar productos disponibles.

## Documentation
For the creation of this Angular project with Module Federation was needed the next:
- angular-cli:18.2.7
- angular-architects/module-federation:18.0.6

Find the full documentation for the project below:

- [Getting Started](#)
- [Architecture](#)
- [API Reference](#)

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [npm](https://www.npmjs.com/get-npm).

### Setting Up a Project

1. Clone the repository:
   ```bash
   git clone https://github.com/software2uis/mfe-catalogo.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application using Angular 17, module federation, and Webpack 5:
   ```bash
   npm start
   ```

### Module Federation and Webpack 5

This project uses module federation in Webpack 5 to enable microfrontend architecture. To ensure correct setup, follow these additional steps:

1. **Configure Module Federation:**
   Ensure that the `webpack.config.js` contains the proper configuration for exposing and consuming remote modules. For example:

   ```javascript
   const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

   module.exports = {
     output: {
       publicPath: "auto",
     },
     optimization: {
       runtimeChunk: false,
     },
     plugins: [
       new ModuleFederationPlugin({
         name: "mfe_catalogo",
         filename: "remoteEntry.js",
         exposes: {
           './ProductCatalog': './src/app/catalog/catalog.module.ts',
         },
         shared: {
           "@angular/core": { singleton: true },
           "@angular/common": { singleton: true },
           "@angular/router": { singleton: true },
         },
       }),
     ],
   };
   ```

2. **Running the Application:**
   The application can be run in standalone mode or as part of a host container with other microfrontends. Use `npm start` to serve it in development mode.

### Contributing

Please follow our [Contributing Guidelines](https://github.com/software2uis/.github/blob/main/CONTRIBUTING.md) to learn about the submission process and coding rules.

