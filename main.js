const http = require('http')
const { platform } = require('os');
const { Nuxt, Builder } = require('nuxt')
const { resolve: resolvePath } = require('app-root-path');
const { getWindow, toggleWindow } = require('./main/window');
let config = require('./nuxt.config.js')
// Check if Windows or Mac
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
  builder.build().catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
}
// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null // Current window
const electron = require('electron')
const path = require('path')
const app = electron.app
let tray = null
app.on('ready', async () => {
  console.log('ready')
  try {
    const iconName =
      process.platform === 'win32'
        ? 'iconWhite'
        : process.platform === 'linux'
        ? 'iconWhite'
        : 'iconTemplate'
    tray = new electron.Tray(resolvePath(`./static/${iconName}.png`))
  } catch (error) {
    console.log('error', error)
    return
  }

  // Opening the context menu after login should work
  global.tray = tray

  // Generate the browser window
  const win = getWindow(tray)
  const toggleActivity = () => toggleWindow(tray, win);

  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS.id).then(name => {
      console.log(`Added Extension:  ${name}`)
      win.webContents.openDevTools()
    }).catch(err => console.log('An error occurred: ', err))
    // Wait for nuxt to build
    const pollServer = () => {
      http.get(_NUXT_URL_, (res) => {
        if (res.statusCode === 200) { win.loadURL(_NUXT_URL_) } else { setTimeout(pollServer, 300) }
      }).on('error', pollServer)
    }
    pollServer()
  } else { return win.loadURL(_NUXT_URL_) }

  tray.on('click', toggleActivity);
  tray.on('double-click', toggleActivity);

  tray.on('right-click', async event => {
    if (win.isVisible()) {
      win.hide();
      return;
    }
    event.preventDefault();
  })
})

process.on('uncaughtException', error => console.log(error))
