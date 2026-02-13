import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_CsuFGHyV.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CTg5UsKz.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/","cacheDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/dist/","srcDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/src/","publicDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/public/","buildClientDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/fabia/Desktop/Fabian%20Proyectos/Urban-Pay-4.0-main/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"account_statement/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/account_statement","isIndex":false,"type":"page","pattern":"^\\/account_statement\\/?$","segments":[[{"content":"account_statement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account_statement.astro","pathname":"/account_statement","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cuotas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cuotas","isIndex":false,"type":"page","pattern":"^\\/cuotas\\/?$","segments":[[{"content":"cuotas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cuotas.astro","pathname":"/cuotas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cuotas_status/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cuotas_status","isIndex":false,"type":"page","pattern":"^\\/cuotas_status\\/?$","segments":[[{"content":"cuotas_status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cuotas_status.astro","pathname":"/cuotas_status","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"inicio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/inicio","isIndex":false,"type":"page","pattern":"^\\/inicio\\/?$","segments":[[{"content":"inicio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/inicio.astro","pathname":"/inicio","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"payment/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/payment","isIndex":false,"type":"page","pattern":"^\\/payment\\/?$","segments":[[{"content":"payment","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/payment.astro","pathname":"/payment","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"search/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/account_statement.CvkI6C00.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/account_statement.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas_status.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/inicio.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/payment.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/search.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/account_statement@_@astro":"pages/account_statement.astro.mjs","\u0000@astro-page:src/pages/cuotas@_@astro":"pages/cuotas.astro.mjs","\u0000@astro-page:src/pages/cuotas_status@_@astro":"pages/cuotas_status.astro.mjs","\u0000@astro-page:src/pages/inicio@_@astro":"pages/inicio.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/payment@_@astro":"pages/payment.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B3iTfSf3.mjs","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_U5KC0Qa5.mjs","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/account_statement.astro?astro&type=script&index=0&lang.ts":"_astro/account_statement.astro_astro_type_script_index_0_lang.Cb9YIV98.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas_status.astro?astro&type=script&index=0&lang.ts":"_astro/cuotas_status.astro_astro_type_script_index_0_lang.BsRA_iVx.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.D-s8tEB_.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/payment.astro?astro&type=script&index=0&lang.ts":"_astro/payment.astro_astro_type_script_index_0_lang.gSmY65aW.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/search.astro?astro&type=script&index=0&lang.ts":"_astro/search.astro_astro_type_script_index_0_lang.Di7HY5Mf.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.CnDIMe9x.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.CpOMCOKS.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthProtected.astro_astro_type_script_index_0_lang.Hfj5zOBN.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.CzNh5vhk.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/Cuotas/CuotasList.astro?astro&type=script&index=0&lang.ts":"_astro/CuotasList.astro_astro_type_script_index_0_lang.D_Wa9j1W.js","C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/Cuotas/CreateCuotaForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateCuotaForm.astro_astro_type_script_index_0_lang.CSZ3zFNb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"nav-home-link\");e&&fetch(\"/api/auth/user\",{credentials:\"include\"}).then(n=>{n.ok&&(e.style.display=\"none\")}).catch(()=>{});"]],"assets":["/_astro/account_statement.CvkI6C00.css","/favicon.svg","/Garita Urb.jpg","/_astro/account_statement.astro_astro_type_script_index_0_lang.Cb9YIV98.js","/_astro/auth.module.3LFXSmfU.js","/_astro/AuthProtected.astro_astro_type_script_index_0_lang.Hfj5zOBN.js","/_astro/CreateCuotaForm.astro_astro_type_script_index_0_lang.CSZ3zFNb.js","/_astro/cuotas.module.CEqowzwp.js","/_astro/CuotasList.astro_astro_type_script_index_0_lang.D_Wa9j1W.js","/_astro/cuotas_status.astro_astro_type_script_index_0_lang.BsRA_iVx.js","/_astro/endpoints.A-j0qYyd.js","/_astro/index.CViUNx8d.js","/_astro/login.astro_astro_type_script_index_0_lang.D-s8tEB_.js","/_astro/notificiation.DyHDLNjw.js","/_astro/payment.astro_astro_type_script_index_0_lang.gSmY65aW.js","/_astro/search.astro_astro_type_script_index_0_lang.Di7HY5Mf.js","/_astro/signup.astro_astro_type_script_index_0_lang.CpOMCOKS.js","/_astro/_token_.astro_astro_type_script_index_0_lang.CnDIMe9x.js","/account_statement/index.html","/cuotas/index.html","/cuotas_status/index.html","/inicio/index.html","/login/index.html","/payment/index.html","/search/index.html","/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"36n2gYY04cQKrj/og4v+8IOVwwC2P2Cv8XC4kaeqw3I=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\fabia\\Desktop\\Fabian Proyectos\\Urban-Pay-4.0-main\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
