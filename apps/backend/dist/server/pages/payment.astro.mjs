import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$AuthProtected } from '../chunks/AuthProtected_GzXkQSC9.mjs';
import { $ as $$Layouts } from '../chunks/layouts_Cu8iWPAf.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_Da6skxKW.mjs';
export { renderers } from '../renderers.mjs';

const $$Payment = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Reportar Pago" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthProtected", $$AuthProtected, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result3, "Sidebar", $$Sidebar, {})} <main class="flex flex-col md:flex-row gap-8 p-4 max-w-[90rem] mx-auto items-center"> <div class="w-full max-w-md p-4 space-y-4 bg-white dark:bg-gray-600/40 rounded-lg border border-gray-300 dark:border-gray-500"> <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">DATOS</h2> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Pago movil</h3> <ul class="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-2"> <li>Banco: Venezuela</li> <li>Telefono: 0424-1989711</li> <li>CI: 31.448.916</li> </ul> <p class="text-sm text-gray-600 dark:text-gray-300">Realiza el pago usando los datos anteriores y reporta tu pago usando el formulario.</p> </div> <div class="w-full max-w-md p-4 md:px-8 space-y-3 bg-white dark:bg-gray-600/40 rounded-lg border border-gray-300 dark:border-gray-500"> <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Reportar pago</h1> <form id="signup-form" class="space-y-6" novalidate> <div> <label for="payment_method" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de pago</label> <select id="payment_method" name="payment_method" class="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-200 cursor-pointer"> <option value="">Elige una opción</option> <option value="1">Pago Móvil</option> </select> <p id="payment-method-helper" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
Selecciona el tipo de método de pago.
</p> </div> <div> <label for="verify-password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label> <input type="date" id="date" name="date" placeholder="fecha" class="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-200 cursor-pointer
                "> <p id="email-helper" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
La fecha en la realizaste el pago.
</p> </div> <div> <label for="verify-password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Numero de referencia</label> <input type="text" id="payment_reference" name="payment_reference" placeholder="Numero de referencia" class="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-200"> <p id="email-helper" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
los ultimos cuatro numeros del numero de referencia.
</p> </div> <div> <label for="verify-password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Monto</label> <input type="number" id="monto" name="monto" placeholder="Monto" class="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-200"> <p id="email-helper" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
Monto del pago realizado.
</p> </div> <button type="submit" id="submit-button" disabled class="w-full px-5 py-3 text-base font-medium text-center text-white bg-[#2563EB] rounded-lg hover:bg-[#4077ED]focus:ring-4 focus:ring-green-300 disabled:bg-gray-600 disabled:cursor-not-allowed dark:bg-[#2563EB] dark:hover:bg-[#4077ED] dark:focus:ring-blue-800 dark:disabled:bg-gray-600 transition-colors duration-200">
Reportar pago
</button> </form> </div> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/payment.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/payment.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/payment.astro";
const $$url = "/payment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Payment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
