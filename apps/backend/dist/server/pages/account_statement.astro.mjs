import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$AuthProtected } from '../chunks/AuthProtected_GzXkQSC9.mjs';
import { $ as $$Layouts } from '../chunks/layouts_Cu8iWPAf.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$AccountStatement = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Estado de Cuotas" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthProtected", $$AuthProtected, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result3, "Sidebar", $$Sidebar, {})} <main class="flex-1 p-4 lg:ml-48 flex flex-col gap-8 max-w-[90rem] mx-auto md:items-center"> <div class="flex flex-col gap-4 p-4 max-w-[90rem] mx-auto md:items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-500 shadow-md"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Estado de cuenta</h1> <!-- Tabla de mensualidades pendientes --> <section class="w-full max-w-2xl"> <h2 class="text-lg font-semibold mb-2 px-4">Resumen</h2> <div class="w-full border border-gray-300 dark:border-gray-500 rounded-md overflow-hidden "> <table class="w-full text-gray-800 dark:text-white"> <tbody id="resumen-tbody"> <tr> <td class="py-2 px-4 font-medium text-gray-900 dark:text-white">Cuotas pendientes</td> <td class="py-2 px-4 text-right" id="resumen-cantidad">-</td> </tr> <tr> <td class="py-2 px-4 font-medium text-gray-900 dark:text-white">Monto de la última cuota por pagar</td> <td class="py-2 px-4 text-right" id="resumen-ultima">-</td> </tr> <tr> <td class="py-2 px-4 font-medium text-gray-900 dark:text-white">Total de las cuotas pendientes</td> <td class="py-2 px-4 text-right" id="resumen-total">-</td> </tr> </tbody> </table> </div> </section> <!-- Cuotas pendientes --> <section class="w-full max-w-2xl mt-8"> <h2 class="text-lg font-bold mb-2">Cuotas pendientes</h2> <div class="flex w-full text-gray-800 dark:text-white mb-2"> <span class="w-1/3 ">Mes</span> <span class="w-1/3">Fecha</span> <span class="w-1/3">Fecha Limite</span> <span class="w-1/3">Monto $</span> </div> <ul id="cuotas-pendientes-list" class="m-0 p-2 list-none overflow-auto flex flex-col gap-8 rounded-md border border-gray-300 dark:border-gray-500"> <!-- Aquí se mostrarán las cuotas pendientes --> </ul> <div id="pendientes-loading" class="text-center py-4 hidden">Cargando cuotas...</div> <div id="pendientes-error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error al cargar las cuotas</div> <div id="pendientes-empty" class="hidden text-center py-4 mb-5">No hay cuotas pendientes por pagar</div> </section> <!-- Cuotas pagadas --> <section class="w-full max-w-2xl mt-8"> <h2 class="text-lg font-semibold mb-2">Cuotas pagadas</h2> <ul id="cuotas-pagadas-list" class="m-0 p-2 list-none overflow-auto flex flex-col gap-8 rounded-md border border-green-300"> <!-- Aquí se mostrarán las cuotas pagadas --> </ul> <div id="pagadas-loading" class="text-center py-4 hidden">Cargando cuotas...</div> <div id="pagadas-error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error al cargar las cuotas</div> <div id="pagadas-empty" class="hidden text-center py-4">No hay cuotas pagadas</div> </section> </div> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/account_statement.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/account_statement.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/account_statement.astro";
const $$url = "/account_statement";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AccountStatement,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
