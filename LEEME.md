# Trincheras de Sangre — versión de escritorio (Electron)

## Requisitos
- Node.js 18 o superior (https://nodejs.org)

## Probar el juego
```
npm install
npm start
```
`npm install` también descarga three.js r128 y lo deja en `game/vendor/`, así el juego no necesita internet.

## Crear el instalador / .exe
```
npm run dist:win      # Windows: instalador + versión portable en dist/
npm run dist:mac      # macOS (hay que ejecutarlo en una Mac)
npm run dist:linux    # Linux (AppImage)
```
(Opcional) Poné tu ícono en `build/icon.ico` (Windows, 256x256) y `build/icon.png` (512x512). Si no hay ícono, usa el de Electron.

## Teclas
- F11: pantalla completa / ventana
- Ctrl+Shift+I: herramientas de desarrollo
- El resto (F3, F4, ESC, etc.) funciona igual que en el navegador.

## Para actualizar el juego
Reemplazá `game/index.html` por la nueva versión. Ojo: la nueva versión debe cargar three.js con
`<script src="vendor/three.min.js">` (como ya está en este index.html) para seguir funcionando sin internet.

## Notas
- El progreso (campaña, logros, configuración) se guarda solo en el perfil de la app (localStorage), separado del que usabas en el navegador.
- Las voces (radio, cinemáticas, insultos en alemán) usan las voces del sistema. En Windows andan bien; en Linux hace falta tener speech-dispatcher instalado.

## Sin escribir comandos (Windows)
- `Jugar.bat`: instala lo necesario la primera vez y abre el juego en su propia ventana.
- `Crear_EXE.bat`: genera el .exe en la carpeta `dist` (instalador y versión portable). Después el juego se abre con doble clic, sin navegador.
