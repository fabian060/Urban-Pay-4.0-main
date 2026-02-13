import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$AuthProtected } from '../chunks/AuthProtected_GzXkQSC9.mjs';
import { $ as $$Layouts } from '../chunks/layouts_DxcNah2t.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$PressReleases = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Agregar Comunicados" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthProtected", $$AuthProtected, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result3, "Sidebar", $$Sidebar, {})} <main class="flex flex-col gap-8 p-4 max-w-[90rem] mx-auto md:items-center w-full"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Agregar Comunicados</h1> <form id="main-form" class="flex gap-2 items-center"> <input id="title_press_releases" type="text" placeholder="Título del comunicado" class="border p-2 rounded" required> <input id="press_releases" type="text" placeholder="Comunicado" class="border p-2 rounded" required> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button> </form> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/press_releases.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/press_releases.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/press_releases.astro";
const $$url = "/press_releases";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PressReleases,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
