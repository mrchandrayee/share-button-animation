# Share Button Animation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/share-button-animation/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A responsive runnable recreation of the uploaded 5.03-second screen recording (720 × 1280, 30 fps).

## Run
Extract the ZIP and open `index.html` in a modern browser. No build tools, dependencies or server are required.

## What the video shows
- Black page with heading **Share Button Animation**.
- Warm beige rounded demo canvas.
- White pill-shaped **SHARE** control.
- Clicking it fans out five circular share channels: LinkedIn, WhatsApp, Email, X and Copy Link.
- Each channel has a white icon disc and a coloured flood layer that fills from the pointer/touch location.
- Central control changes to a close (×) while the menu is open.
- Copy Link transitions through “Copying…” to a dark blue link icon and **Link copied ✓** confirmation.
- Creator credit `_code_and_chill_`.
- Three code panels: `index.html`, `app.css`, `app.js`.

## Interactions
- Click SHARE to open/close the radial menu.
- Click LinkedIn, WhatsApp, Email or X to open the corresponding share destination with the current page URL.
- Click the chain-link icon to copy the current page URL. On secure browser contexts it uses `navigator.clipboard.writeText`; a document-selection fallback is used otherwise.
- Click the central confirmation button to reopen the menu and share again.
- Press Escape to close the channel menu.

## Visible source extraction
The code panels are legible enough to transcribe several original fragments into `src/video-visible-snippets.txt`:
- HTML anchor `.ch`, `data-ch="whatsapp"`, `style="--i: 2"`, nested `.ch__body`, `.ch__face`, `.ch__icon`, `.ch__flood`, `.ch__lit`, `.ch__tick`, `.ch__burst`.
- CSS `.splay` values `--pitch: 46deg`, `--gap: 1.5`, and the chord/radius formula for `--r`.
- CSS `.ch` angular position `--a` and `translate(sin(...), cos(...)) scale(...)`.
- JavaScript reads computed `--r` with `parseFloat(getComputedStyle(items[0]).getPropertyValue('--r'))`.
- Click-origin fill calculation from `ev.clientX`, `getBoundingClientRect()`, and `--fx`.
- Clipboard write `navigator.clipboard.writeText(url)`.

The video shows partial code panels rather than the full original source project. These visible fragments are transcribed; the remaining working HTML, CSS and JavaScript are an independent implementation of the observed radial share interaction. The video also describes a registered `@property` for resolved pixel values; this recreation registers `--r` so the computed value can be read as pixels.

## Notes
Social sharing opens external share destinations. Copy Link copies the current page URL. For best clipboard support, serve the folder over HTTPS or localhost; the fallback is included for local-file use.
## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
