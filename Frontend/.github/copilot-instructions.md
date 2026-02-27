**Purpose**: Short guide to help AI coding agents get immediately productive in this repository.

**Big picture**:
- **Framework**: Angular 21 application with server-side rendering (SSR) via `@angular/ssr`.
- **Runtime pieces**: browser bundle (client) + server bundle (SSR). The Express-based request handler is in [src/server.ts](src/server.ts).
- **How SSR is wired**: `src/main.server.ts` re-exports the server module implemented in [src/app/app.module.server.ts](src/app/app.module.server.ts), which imports the client `AppModule` and provides server rendering routes from [src/app/app.routes.server.ts](src/app/app.routes.server.ts).

**How to run / build / test** (explicit commands found in `package.json`):
- Development server (client hot-reload): `npm start` (runs `ng serve`).
- Build production: `npm run build` (runs `ng build`).
- Watch build (dev): `npm run watch` (`ng build --watch --configuration development`).
- Run tests: `npm test` (`ng test`, configured to use Vitest via Angular builder).
- Serve the SSR build: after building, run the server bundle: `node dist/Frontend/server/server.mjs` (script `serve:ssr:Frontend` exists in `package.json`).

**Key architectural/convention notes (project-specific)**:
- Assets: static site assets (CSS, fonts, vendor JS) are served from the `public/` folder — see the `assets` entry in [angular.json](angular.json).
- Non-standalone components: this workspace config forces schematics to generate non-standalone components (see `projects.Frontend.schematics` in [angular.json](angular.json)). Expect traditional NgModule usage (`AppModule` in [src/app/app-module.ts](src/app/app-module.ts)).
- Hydration: the app enables client hydration with `provideClientHydration(withEventReplay())` in `AppModule` — changes to client hydration should be made there.
- Global legacy scripts: the code calls global functions / libraries from legacy static scripts (example: `App` calls `HOMEINIT($)` in [src/app/app.ts](src/app/app.ts)). Global jQuery-like globals and other vendor scripts are expected to be provided via `public/` assets; avoid refactoring these into Angular without verifying intent.
- Server API integration: example Express endpoints can be added to [src/server.ts](src/server.ts) — the file already exposes the pattern and exports `reqHandler` for CLI/build usage.

**Where to make common changes**:
- Add new routes for SSR prerendering or server-only routes: update [src/app/app.routes.server.ts](src/app/app.routes.server.ts).
- Add server-side endpoints or middleware: modify [src/server.ts](src/server.ts).
- Add global frontend scripts/CSS: place them under `public/` and ensure `index.html` references them or the asset path is covered by the Angular build.

**Tests & CI considerations**:
- Unit tests are run via the Angular test builder (`ng test`) which in this repo is configured to use Vitest per `devDependencies`. If adding CI, run `npm ci` then `npm test`.

**Quick examples**:
- App bootstrap (client): [src/main.ts](src/main.ts) calls `platformBrowser().bootstrapModule(AppModule)`.
- Server entry and example Express usage: [src/server.ts](src/server.ts) — static files served from the `browser` dist folder and all other routes are handled by the AngularNodeAppEngine handler.

If anything important is missing or you want the instructions expanded (examples for adding a route, test template, or a recommended PR checklist), tell me which area to expand. 