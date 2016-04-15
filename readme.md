# Likely

The social sharing buttons that aren’t shabby.
Fork was made for using on [TJournal](https://tjournal.ru) and [VC](https://vc.ru)

## Install

Download this repository and move files `release/likely.js` and 
`release/likely.css` to desired directory.

## Setup

After you've installed Likely, you need to setup it.

Just include files named `likely.css` and `likely.js`.

Then you'll need to create HTML container with `likely` class and list desired 
social networks in child divs:

```html
<div class="likely">
    <div class="twitter">Твитнуть</div>
    <div class="facebook">Поделиться</div>
    <div class="vkontakte">Поделиться</div>
    <div class="gplus"></div>
    <div class="odnoklassniki"></div>
    <div class="pocket"></div>
    <div class="telegram"></div>
    <div class="whatsapp"></div>
    <div class="viber"></div>
    <div class="more"></div>
</div>
```

Likely supports following social networks and mobile messengers:

* `twitter` – Twitter
* `facebook` – Facebook
* `vkontakte` – VK
* `gplus` - Google+
* `odnoklassniki` – Odnoklassniki
* `pocket` – Pocket
* `telegram` – Telegram
* `whatsapp` – WhatsApp
* `viber` – Viber

### Styling

For custom styles add class `.likely--custom` to `.likely` container and then write your own css.
Add `.likely--desktop` if buttons set should not be visible on small screens.

## Options

You can set some options on Likely button set via `data-*` attributes:

* `data-url` – URL to share and load counters for
* `data-title` – Page title

There's also social network specific options.

### Twitter

You can set `data-via` attribute on Twitter button to insert username mention 
of this user:

```html
<div class="twitter" data-via="tjournal">Tweet</div>
```

## Demo

You can see Likely in action on this [page](http://valerypatorius.github.io/Likely/).
