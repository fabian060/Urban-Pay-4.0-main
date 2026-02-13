import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$AuthProtected } from '../chunks/AuthProtected_GzXkQSC9.mjs';
import { $ as $$Layouts } from '../chunks/layouts_DxcNah2t.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Buscar Usuarios" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthProtected", $$AuthProtected, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result3, "Sidebar", $$Sidebar, {})} <main class="flex flex-col gap-8 p-4 max-w-[90rem] mx-auto md:items-center w-full"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Buscar Usuarios</h1> <form id="search-form" class="flex gap-2 items-center"> <input id="house-number" type="text" placeholder="Número de casa" class="border p-2 rounded" required> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Buscar</button> </form> <div id="results-container" class="w-full md:w-[70%] lg:w-[50%] mt-4"></div> <div id="loading" class="hidden text-center py-8"> <p>Cargando usuarios...</p> </div> <div id="error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"> <p>Error al cargar los usuarios</p> </div> <div id="empty" class="hidden text-center py-8"> <p>No se encontraron usuarios para ese número de casa</p> </div> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/search.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
