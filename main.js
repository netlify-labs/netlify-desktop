const http = require('http');
const path = require('path');
const { shell } = require('electron');
const { Nuxt, Builder } = require('nuxt');
const { menubar } = require('menubar');

let config = require('./nuxt.config.js');
config.rootDir = __dirname; // for electron-builder

// Init Nuxt.js
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);
const server = http.createServer(nuxt.render);

// Build only in dev mode
if (config.dev) {
  builder.build().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
}
// Listen the server
server.listen();
const _NUXT_URL_ = `http://localhost:${server.address().port}`;
console.log(`Nuxt working on ${_NUXT_URL_}`);

const mb = menubar({
  index: _NUXT_URL_,
  icon: path.join(__dirname, 'static/iconTemplate.png'),
  browserWindow: {
    width: 330,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  },
});

mb.on('after-create-window', () => {
  mb.window.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS.id)
      .then(name => {
        console.log(`Added Extension:  ${name}`);
        mb.window.webContents.openDevTools();
      })
      .catch(err => console.log('An error occurred: ', err));
    // Wait for nuxt to build
    const pollServer = () => {
      http
        .get(_NUXT_URL_, res => {
          if (res.statusCode === 200) {
            mb.window.loadURL(_NUXT_URL_);
          } else {
            setTimeout(pollServer, 300);
          }
        })
        .on('error', pollServer);
    };
    pollServer();
  } else {
    mb.window.loadURL(_NUXT_URL_);
  }
});

mb.app.on('window-all-closed', () => mb.app.quit());
