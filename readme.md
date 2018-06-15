# Likely

The social sharing buttons that aren’t shabby.
Fork was made for using on [TJ](https://tjournal.ru), [vc.ru](https://vc.ru) and [DTF](https://dtf.ru) sites.

## Install

```
npm i cmtt-likely
```

Or include files `likely.css` and `likely.js` from `./release` folder.

## Setup

Library looks for containers with `likely` classname, so pick social services you need and put them in the container.

Default setup:

```html
<div class="likely">
    <div class="vkontakte">Share</div>
    <div class="facebook">Like</div>
    <div class="twitter">Tweet</div>
    <div class="gplus"></div>
    <div class="odnoklassniki"></div>
    <div class="pocket"></div>
    <div class="telegram"></div>
    <div class="whatsapp"></div>
    <div class="viber"></div>
    <div class="email"></div>
    <div class="more"></div>
</div>
```

Supported social services:

* `vkontakte` – VK
* `facebook` – Facebook
* `twitter` – Twitter
* `gplus` - Google+
* `odnoklassniki` – Odnoklassniki
* `pocket` – Pocket
* `telegram` – Telegram
* `whatsapp` – WhatsApp
* `viber` – Viber

* `email` – sends link and page title via default email client

* `more` — include this to show extra buttons in mobile view.

### Styling

Before using custom styles add class `.likely--custom` to `.likely` container.

Add `.likely--desktop` to hide container in mobile view.

Add `.likely--no-counters` to hide share counters.

## Options

You can change some options via `data-*` attributes:

* `data-url` – page url
* `data-title` – page title
* `data-twitter` – optional page title for twitter
* `data-smart` – enables smart buttons order in mobile view. Last clicked button will go first

### Twitter

You can set `data-via` attribute on Twitter button to add username mention:

```html
<div class="twitter" data-via="tjournal">Tweet</div>
```

## Demo

[https://valerypatorius.github.io/Likely/](https://valerypatorius.github.io/Likely/)
