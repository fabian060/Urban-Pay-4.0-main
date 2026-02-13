import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, p as renderHead, k as renderComponent, o as renderSlot } from './astro/server_CsuFGHyV.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                     */

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- TODO: Menu movil -->${maybeRenderHead()}<nav class="bg-[#2563EB] text-white fixed top-0 left-0 right-0 z-50"> <div class="max-w-7xl mx-auto h-16 flex items-center justify-between px-4"> <div class="flex items-center gap-2 h-full min-w-0"> <button id="sidebar-toggle-button" class="p-2 rounded-md bg-white text-blue-600 shadow-md sidebar-toggle lg:hidden mr-2 hidden" aria-label="Abrir menú"> <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> <!-- <img class="w-8 h-8" src={logoPng.src} alt="logo"> --> <h2 class="font-medium text-xl truncate">Urb. Country Club Buenaventura</h2> </div> <div class="hidden md:flex items-center gap-4"> <a id="nav-home-link" href="/" class="font-medium hover:underline">Inicio</a> </div> </div> </nav> ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/components/Navigation.astro", void 0);

const $$Notification = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="notification" class="fixed p-4 top-4 right-4 rounded-2xl z-[60] hidden"> <p id="notification-title" class="font-bold text-lg">Error</p> <p id="notification-description">Hubo un error obteniendo las cuotas</p> </div>`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/notifications/Notification.astro", void 0);

const $$Astro = createAstro();
const $$Layouts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layouts;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-dvz75727> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="pt-16" data-astro-cid-dvz75727> ${renderComponent($$result, "Notification", $$Notification, { "data-astro-cid-dvz75727": true })} ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-dvz75727": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/layouts/layouts.astro", void 0);

export { $$Layouts as $ };
