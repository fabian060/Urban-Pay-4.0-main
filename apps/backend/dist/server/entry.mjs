import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_RktCo1Gu.mjs';
import { manifest } from './manifest_DxC0qzEw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/account_statement.astro.mjs');
const _page2 = () => import('./pages/cuotas.astro.mjs');
const _page3 = () => import('./pages/cuotas_status.astro.mjs');
const _page4 = () => import('./pages/inicio.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/payment.astro.mjs');
const _page7 = () => import('./pages/press_releases.astro.mjs');
const _page8 = () => import('./pages/search.astro.mjs');
const _page9 = () => import('./pages/signup.astro.mjs');
const _page10 = () => import('./pages/verify/_token_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/account_statement.astro", _page1],
    ["src/pages/cuotas.astro", _page2],
    ["src/pages/cuotas_status.astro", _page3],
    ["src/pages/inicio.astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/payment.astro", _page6],
    ["src/pages/press_releases.astro", _page7],
    ["src/pages/search.astro", _page8],
    ["src/pages/signup.astro", _page9],
    ["src/pages/verify/[token].astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/backend/dist/client/",
    "server": "file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/backend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
