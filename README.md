
# mfe-catalogo
MFE responsible for the visualization and management of the product catalog, allowing the user to browse and filter available products.

## VPN Connection
To connect to the backend hosted on the school's server, you need to install:
- [Zerotier-one](https://www.zerotier.com/download/)

Once Zerotier is installed, you need to join the private network:
#### Windows
By right-clicking on the program logo running in the background, you should see something like this.
<img style="width: 300px" src="https://docs.zerotier.com/assets/images/mac-menubar-01-1eeb6a47c344307a6b4126dc7c376960.png" />
## 
This is the network code:
```
e4da7455b234aa14
```
#### Linux
For Linux users, run the following command in the terminal and you should see 200 OK
```
zerotier-cli join e4da7455b234aa14
```

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

3. Run the application using Angular 18, module federation, and Webpack 5:
   ```bash
   npm start
   ```

### Module Federation and Webpack 5

This project uses module federation in Webpack 5 to enable microfrontend architecture. To ensure correct setup, follow these additional steps:

1. **Configure Module Federation:**
   Ensure that the `webpack.config.js` contains the proper configuration for exposing and consuming remote modules. For example:

   ```javascript
   const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
   const mf = require("@angular-architects/module-federation/webpack");
   const path = require("path");
   const share = mf.share;

   const sharedMappings = new mf.SharedMappings();
   sharedMappings.register(
    path.join(__dirname, 'tsconfig.json'),
    [/* mapped paths to share */]);

   module.exports = {
    output: {
      uniqueName: "mfeCatalogo",
      publicPath: "auto",
      scriptType: "text/javascript",
    },
    optimization: {
      runtimeChunk: false,
    },
    resolve: {
      alias: {
      ...sharedMappings.getAliases(),
      }
    },
    experiments: {
      outputModule: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "mfe_catalogo",
        filename: "remoteEntry.js",
        exposes: {
          './ProductCatalog': './src/app/catalog/catalog.module.ts',
        },
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
      }),
      sharedMappings.getPlugin()
    ],
   };

   
   ```

2. **Running the Application:**
   The application can be run in standalone mode or as part of a host container with other microfrontends. Use `npm start` to serve it in development mode.

### Contributing

Please follow our [Contributing Guidelines](https://github.com/software2uis/.github/blob/main/CONTRIBUTING.md) to learn about the submission process and coding rules.

