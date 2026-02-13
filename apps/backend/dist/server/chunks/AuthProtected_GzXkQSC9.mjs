import { e as createComponent, m as maybeRenderHead, o as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_CsuFGHyV.mjs';
import 'piccolore';
import 'clsx';

const $$AuthProtected = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="auth-div" class="bg-gray-100 dark:bg-gray-900"> <div id="loading-text" class="flex flex-row gap-2 h-screen w-full justify-center items-center"> <div class="w-4 h-4 rounded-full bg-[#2563EB] animate-bounce [animation-delay:.7s]"></div> <div class="w-4 h-4 rounded-full bg-[#2563EB] animate-bounce [animation-delay:.3s]"></div> <div class="w-4 h-4 rounded-full bg-[#2563EB] animate-bounce [animation-delay:.7s]"></div> </div> <div id="auth-content" class="hidden"> ${renderSlot($$result, $$slots["default"])}</div> </div> ${renderScript($$result, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/features/auth/AuthProtected.astro", void 0);

export { $$AuthProtected as $ };
