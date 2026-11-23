const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

// Sonido sin necesidad de hacer clic primero (AudioContext) y voces de radio
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Una sola instancia del juego
if (!app.requestSingleInstanceLock()) app.quit();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 500,
    backgroundColor: '#000000',
    title: 'Trincheras de Sangre',
    icon: path.join(__dirname, 'build', 'icon.png'),
    fullscreen: true,          // pantalla completa al abrir (F11 para alternar)
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'game', 'index.html'));
  win.once('ready-to-show', () => win.show());

  // F11 = pantalla completa / ventana. (F3 y F4 los usa el propio juego)
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      e.preventDefault();
    }
    // Ctrl+Shift+I abre las herramientas de desarrollo (para depurar)
    if (input.type === 'keyDown' && input.control && input.shift && input.key.toLowerCase() === 'i') {
      win.webContents.toggleDevTools();
    }
  });

  // Que ningún enlace abra otra ventana
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.on('closed', () => { win = null; });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
