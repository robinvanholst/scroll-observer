# Scroll Observer (Native JS)

Lichtgewicht scroll-observer script in pure JavaScript.

Dit script detecteert wanneer elementen in de viewport komen en zet automatisch een attribute:

`in-viewport="false | true | passed"`

Daarnaast wordt tekst binnen `article p` automatisch opgesplitst in spans per zin, zonder inline HTML te slopen.

## Live demo

https://lidly.nl/opensource-share/scroll-observer/

## Features

- 100% native JavaScript
- Geen dependencies
- Scroll listeners op `window`, `html` en `body`
- Automatische viewport state detectie
- Splitst zinnen in spans zonder markup te breken (TreeWalker)

## Gebruik

Plaats het script onderaan je pagina of laad via je bundler.

```html
<script type="text/javascript" src="/scroll-observer.js"></script>
```

Het script initialiseert automatisch op `DOMContentLoaded`.

## Wat gebeurt er

1) `article p` tekstnodes worden opgesplitst in `<span>` per zin.  
2) Een set elementen krijgt een `in-viewport` attribute gebaseerd op positie in de viewport.

Standaard selectors die gevolgd worden:

`div, ul, li, p, h1, h2, h3, h4, form, article p span`

States:

- `false` → nog nooit zichtbaar geweest
- `true` → momenteel in viewport
- `passed` → was zichtbaar maar nu erbuiten

## Demo lokaal draaien

Open `demo/index.html` direct in je browser.

## Licentie

MIT
