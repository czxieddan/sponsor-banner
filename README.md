# Sponsor Banner

Generate customizable sponsor banner images for README files, profiles, and project pages.

## Install

```bash
corepack enable
pnpm install
pnpm dev
```

## Docker

```bash
docker compose up -d
```

## Configuration

Create a `.env` file from `.env.example` and adjust these values:

```text
PORT=43173
PUBLIC_BASE_URL=
SITE_TITLE=Sponsor Banner
SITE_FOOTER=Sponsor banner images for README files and project pages
SITE_FAVICON_URL=sponsor-banner-logo.svg
```

`PUBLIC_BASE_URL` is optional. Leave it empty to make the preview page use the URL users actually opened in the browser, which works for ordinary reverse proxy deployments. Do not set it to `http://localhost:43173` on a public server. Set it only when the app is mounted under a fixed public base path, such as `https://example.com/sponsor-banner`.

`SITE_FAVICON_URL` supports either a public URL, such as `https://example.com/favicon.ico`, or a relative file path inside the container, such as `sponsor-banner-logo.svg`.

## API

```text
/:platform/:name
/:platform/:name.svg
/:platform/:name.png
```

Example:

```text
http://localhost:43173/patreon/RHoiScribe
http://localhost:43173/patreon/RHoiScribe.png?scale=2
```

![](https://sb.aperip.com/patreon/RHoiScribe)

```text
w=1200
h=400
radius=48
padding=48
theme=dark
bg=000000
fg=ffffff
title=Sponsor
footer=by Patreon
format=svg
format=png
scale=2
```

Unknown platforms return `404 Unknown Platform`.

## Themes

Platforms are registered through `platformRegistry`. Add a new platform by adding a theme file and an SVG logo, then registering the theme in the platform list.

Built in:

```text
patreon
github
kofi
buymeacoffee
afdian
opencollective
liberapay
fanbox
boosty
```
