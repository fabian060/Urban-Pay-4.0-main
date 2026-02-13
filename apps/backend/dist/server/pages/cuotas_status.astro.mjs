import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$AuthProtected } from '../chunks/AuthProtected_GzXkQSC9.mjs';
import { $ as $$Layouts } from '../chunks/layouts_DxcNah2t.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$CuotasStatus = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Estado de Cuotas" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthProtected", $$AuthProtected, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result3, "Sidebar", $$Sidebar, {})} <main class="flex flex-col gap-8 p-4 max-w-[90rem] mx-auto md:items-center w-full"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reportes de Pago</h1> <div id="payments-container" class="w-full md:w-[70%] lg:w-[50%]"> <div class="flex gap-4 mb-4"> <button id="btn-por-revisar" class="px-4 py-2 rounded bg-blue-500 text-white font-bold">Por revisar</button> <button id="btn-revisado" class="px-4 py-2 rounded bg-green-500 text-white font-bold">Revisado</button> <button id="btn-todos" class="px-4 py-2 rounded bg-gray-500 text-white font-bold">Todos</button> </div> <div id="payments-list" class="m-0 p-2 list-none overflow-auto flex flex-col gap-4 rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600/40"> <template id="payment-item-template"> <div class="p-4 border border-gray-300 dark:border-gray-500 text-gray-900 bg-white rounded-lg dark:bg-gray-600/40"> <h3 class="font-semibold text-lg text-gray-600 dark:text-gray-300">Reporte #<span class="payment-id">0</span></h3> <p class="my-1 text-gray-600 dark:text-gray-300"><strong>Casa:</strong> <span class="user-house-number">Q-000</span></p> <p class="my-1 text-gray-600 dark:text-gray-300"><strong>Fecha:</strong> <span class="payment-date">01-01-2023</span></p> <p class="my-1 text-gray-600 dark:text-gray-300"><strong>Referencia:</strong> <span class="payment-reference">1234</span></p> <p class="my-1 text-gray-600 dark:text-gray-300"><strong>Monto:</strong> <span class="my-1 text-gray-600 dark:text-gray-300">0.00</span> </p> <p class="my-1 text-gray-600 dark:text-gray-300"><strong>Estado:</strong> <span class="status pending bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
Pendiente
</span> </p> <div class="mt-3 flex gap-2"> <button class="btn-accept bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
Aceptar
</button> <button class="btn-reject bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
Rechazar
</button> </div> </div> </template> </div> <div id="loading" class="text-center py-8"> <p>Cargando reportes...</p> </div> <div id="error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"> <p>Error al cargar los reportes</p> </div> <div id="empty" class="hidden text-center py-8"> <p>No hay reportes de pago pendientes</p> </div> </div> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas_status.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas_status.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/cuotas_status.astro";
const $$url = "/cuotas_status";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CuotasStatus,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
