import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$Layouts } from '../chunks/layouts_Cu8iWPAf.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$Inicio = createComponent(async ($$result, $$props, $$slots) => {
  const resumen = {
    estado: "Cargando...",
    proximoVencimiento: "...",
    monto: "...",
    totalPagadoAnio: "..."};
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Inicio - Urban Pay" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result2, "Sidebar", $$Sidebar, {})} <main class="flex-1 p-6 lg:ml-48"> <header class="mb-8"> <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Panel de Inicio</h1> <p class="mt-1 text-gray-600 dark:text-gray-400">Bienvenido al sistema de gestión de Urba Pago</p> </header> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"> <!-- Tarjeta de Estado --> <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-500"> <h2 class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Estado de Cuenta</h2> <p id="estado-cuenta" class="text-2xl font-bold text-gray-500 dark:text-gray-400">${resumen.estado}</p> <p id="mensaje-estado" class="mt-1 text-sm text-gray-500 dark:text-gray-400">Verificando...</p> </div> <!-- Tarjeta de Próximo Pago --> <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-500"> <h2 class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Cuentas Pendientes</h2> <div class="mt-4 flex items-baseline justify-between"> <span id="total-pendientes" class="text-2xl font-bold text-gray-900 dark:text-white">${resumen.monto}</span> <span id="proximo-vencimiento" class="text-sm text-gray-500 dark:text-gray-400">${resumen.proximoVencimiento}</span> </div> </div> <!-- Tarjeta de Total Pagado (Nuevo) --> <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-500"> <h2 class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">Pagado este Año</h2> <div class="mt-4 flex items-baseline justify-between"> <span id="total-pagado-anio" class="text-2xl font-bold text-blue-600 dark:text-blue-400">${resumen.totalPagadoAnio}</span> <span id="cantidad-pagos-anio" class="text-sm text-gray-500 dark:text-gray-400">...</span> </div> </div> </div> <!-- <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
         Sección de Comunicados --> <!-- <div class="lg:col-span-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-500">
          <h2 class="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Comunicados</h2>
          <div class="space-y-4">
            {resumen.comunicados.map((item) => (
              <div class="border-l-4 border-blue-500 pl-4">
                <h3 class="font-medium text-gray-900 dark:text-white">{item.titulo} <span class="text-xs text-gray-500 font-normal ml-2">{item.fecha}</span></h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{item.contenido}</p>
              </div>
            ))}
          </div>
        </div>
      </div> --> <div class="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-500"> <h2 class="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Actividad Reciente</h2> <div id="actividad-reciente-container" class="space-y-2"> <p class="italic text-gray-500 dark:text-gray-400">No hay movimientos recientes para mostrar.</p> </div> </div> </main> </div> ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/inicio.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/inicio.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/inicio.astro";
const $$url = "/inicio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inicio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
