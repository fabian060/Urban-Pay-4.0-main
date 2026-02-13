import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsuFGHyV.mjs';
import 'piccolore';
import { $ as $$Layouts } from '../chunks/layouts_Cu8iWPAf.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layouts, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<img src="/Garita Urb.jpg" alt="" class="fixed inset-0 w-full h-full object-cover -z-10"> <div class="fixed inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-transparent lg:bg-gradient-to-l"></div> <main class="min-h-screen flex flex-col justify-center gap-4 px-2 max-w-7xl mx-auto w-full md:items-start lg:flex-row lg:items-center lg:justify-end"> <main class="h-screen overflow-hidden flex flex-col justify-center gap-4 px-2 max-w-7xl mx-auto w-full md:items-start lg:flex-row lg:items-center lg:justify-end"> <div class="flex flex-col gap-4 max-w-xl"> <h1 class="text-white text-5xl md:text-6xl lg:text-7xl">Urba Pago</h1> <p class="text-justify md:text-base lg:text-xl text-white dark:white">Bienvenido al portal de gestión de Urba Pago. Administra tus pagos, consulta tu estado de cuenta de forma rápida y segura en un solo lugar</p> <a class="bg-[#2563EB] py-4 px-8 text-white no-underline text-center uppercase font-medium text-xl rounded-md hover:bg-[#4077ED] transition-all duration-200 ease-in" href="/login">Iniciar Sesion</a> <a class="bg-[#2563EB] py-4 px-8 text-white no-underline text-center uppercase font-medium text-xl rounded-md hover:bg-[#4077ED] transition-all duration-200 ease-in" href="/signup">Registrarse</a> </div> </main> </main>` })}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
