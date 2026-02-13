import { e as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_CsuFGHyV.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es"> ', `<body class="bg-gray-100"> <nav class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-45 bg-[#2563EB] text-white z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 sidebar"> <div class="flex flex-col h-full"> <h2 id="user-greeting" class="px-6 py-4 font-medium text-xl border-b border-blue-700"></h2> <ul class="flex-1 px-6 py-4 space-y-4"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/inicio">Inicio</a></li> <li> <button id="usuario-toggle" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1 font-semibold">Usuario \u25BC</button> <ul id="usuario-submenu" class="pl-4 space-y-2 overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-in-out"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/account_statement">Estado de Cuenta</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/payment">Reportar Pago</a></li> </ul> </li> <li id="admin-section"> <button id="admin-toggle" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1 font-semibold">Administrador \u25BC</button> <ul id="admin-submenu" class="pl-4 space-y-2 overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-in-out"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/cuotas_status">Reportes</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/search">Buscar Usuario</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/cuotas">Agregar Cuota</a></li> <!-- <li><a class="block no-underline hover:underline" href="/press_releases">Agregar Comunicados</a></li> --> </ul> </li> <li> <button id="logout-button" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1">Salir</button> </li> </ul> </div> </nav> <script>
      if (typeof window !== 'undefined') {
        // Definimos la l\xF3gica como una funci\xF3n as\xEDncrona para poder usar 'await'
        const initializeSidebar = async () => {
          const sidebar = document.querySelector('.sidebar');
          const toggle = document.querySelector('.sidebar-toggle');
          if (sidebar && toggle) {
            toggle.addEventListener('click', () => {
              sidebar.classList.toggle('-translate-x-full');
              sidebar.classList.toggle('translate-x-0');
            });
          }

          // L\xF3gica para mostrar/ocultar el men\xFA de administrador
          const adminSection = document.getElementById('admin-section');
          const greetingElement = document.getElementById('user-greeting');
          
          try {
            // El navegador env\xEDa autom\xE1ticamente la cookie httpOnly con esta petici\xF3n
            const response = await fetch('/api/auth/user', {
              credentials: 'include', // Env\xEDa las cookies incluso en peticiones cross-origin
            });
            
            if (response.ok) {
              const user = await response.json();

              if (greetingElement && user.email) {
                const username = user.email.split('@')[0];
                greetingElement.textContent = \`Bienvenido, \${username}\`;
              }
              
              // Ocultar la secci\xF3n si el usuario no es admin
              if (adminSection && !user.is_admin) {
                adminSection.style.display = 'none';
              }
            } else {
              // Si la petici\xF3n falla (ej. 401 Unauthorized), el usuario no tiene sesi\xF3n
              console.log('No hay sesi\xF3n de usuario activa.');
              if (adminSection) {
                adminSection.style.display = 'none';
              }
            }
          } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            if (adminSection) {
              adminSection.style.display = 'none';
            }
          }
          
          // Submen\xFA Usuario
          const usuarioToggle = document.getElementById('usuario-toggle');
          const usuarioSubmenu = document.getElementById('usuario-submenu');
          if (usuarioToggle && usuarioSubmenu) {
            usuarioToggle.addEventListener('click', () => {
              usuarioSubmenu.classList.toggle('max-h-0');
              usuarioSubmenu.classList.toggle('opacity-0');
              usuarioSubmenu.classList.toggle('max-h-96');
              usuarioSubmenu.classList.toggle('opacity-100');
              usuarioSubmenu.classList.toggle('mt-2');
            });
          }
          
          // Submen\xFA Administrador
          const adminToggle = document.getElementById('admin-toggle');
          const adminSubmenu = document.getElementById('admin-submenu');
          if (adminToggle && adminSubmenu) {
            adminToggle.addEventListener('click', () => {
              adminSubmenu.classList.toggle('max-h-0');
              adminSubmenu.classList.toggle('opacity-0');
              adminSubmenu.classList.toggle('max-h-96');
              adminSubmenu.classList.toggle('opacity-100');
              adminSubmenu.classList.toggle('mt-2');
            });
          }

          // L\xF3gica para el bot\xF3n de logout
          const logoutButton = document.getElementById('logout-button');
          if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
              await fetch('/api/auth/logout', { credentials: 'include' });
              // Redirigir al home despu\xE9s de cerrar sesi\xF3n
              window.location.href = '/';
            });
          }
        };

        window.addEventListener('DOMContentLoaded', initializeSidebar);
      }
    <\/script> </body> </html>`], ['<html lang="es"> ', `<body class="bg-gray-100"> <nav class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-45 bg-[#2563EB] text-white z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 sidebar"> <div class="flex flex-col h-full"> <h2 id="user-greeting" class="px-6 py-4 font-medium text-xl border-b border-blue-700"></h2> <ul class="flex-1 px-6 py-4 space-y-4"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/inicio">Inicio</a></li> <li> <button id="usuario-toggle" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1 font-semibold">Usuario \u25BC</button> <ul id="usuario-submenu" class="pl-4 space-y-2 overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-in-out"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/account_statement">Estado de Cuenta</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/payment">Reportar Pago</a></li> </ul> </li> <li id="admin-section"> <button id="admin-toggle" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1 font-semibold">Administrador \u25BC</button> <ul id="admin-submenu" class="pl-4 space-y-2 overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-in-out"> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/cuotas_status">Reportes</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/search">Buscar Usuario</a></li> <li><a class="block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1" href="/cuotas">Agregar Cuota</a></li> <!-- <li><a class="block no-underline hover:underline" href="/press_releases">Agregar Comunicados</a></li> --> </ul> </li> <li> <button id="logout-button" class="w-full text-left block no-underline hover:bg-blue-700 dark:bg-[#2563EB] dark:hover:bg-blue-500 rounded-lg p-1">Salir</button> </li> </ul> </div> </nav> <script>
      if (typeof window !== 'undefined') {
        // Definimos la l\xF3gica como una funci\xF3n as\xEDncrona para poder usar 'await'
        const initializeSidebar = async () => {
          const sidebar = document.querySelector('.sidebar');
          const toggle = document.querySelector('.sidebar-toggle');
          if (sidebar && toggle) {
            toggle.addEventListener('click', () => {
              sidebar.classList.toggle('-translate-x-full');
              sidebar.classList.toggle('translate-x-0');
            });
          }

          // L\xF3gica para mostrar/ocultar el men\xFA de administrador
          const adminSection = document.getElementById('admin-section');
          const greetingElement = document.getElementById('user-greeting');
          
          try {
            // El navegador env\xEDa autom\xE1ticamente la cookie httpOnly con esta petici\xF3n
            const response = await fetch('/api/auth/user', {
              credentials: 'include', // Env\xEDa las cookies incluso en peticiones cross-origin
            });
            
            if (response.ok) {
              const user = await response.json();

              if (greetingElement && user.email) {
                const username = user.email.split('@')[0];
                greetingElement.textContent = \\\`Bienvenido, \\\${username}\\\`;
              }
              
              // Ocultar la secci\xF3n si el usuario no es admin
              if (adminSection && !user.is_admin) {
                adminSection.style.display = 'none';
              }
            } else {
              // Si la petici\xF3n falla (ej. 401 Unauthorized), el usuario no tiene sesi\xF3n
              console.log('No hay sesi\xF3n de usuario activa.');
              if (adminSection) {
                adminSection.style.display = 'none';
              }
            }
          } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            if (adminSection) {
              adminSection.style.display = 'none';
            }
          }
          
          // Submen\xFA Usuario
          const usuarioToggle = document.getElementById('usuario-toggle');
          const usuarioSubmenu = document.getElementById('usuario-submenu');
          if (usuarioToggle && usuarioSubmenu) {
            usuarioToggle.addEventListener('click', () => {
              usuarioSubmenu.classList.toggle('max-h-0');
              usuarioSubmenu.classList.toggle('opacity-0');
              usuarioSubmenu.classList.toggle('max-h-96');
              usuarioSubmenu.classList.toggle('opacity-100');
              usuarioSubmenu.classList.toggle('mt-2');
            });
          }
          
          // Submen\xFA Administrador
          const adminToggle = document.getElementById('admin-toggle');
          const adminSubmenu = document.getElementById('admin-submenu');
          if (adminToggle && adminSubmenu) {
            adminToggle.addEventListener('click', () => {
              adminSubmenu.classList.toggle('max-h-0');
              adminSubmenu.classList.toggle('opacity-0');
              adminSubmenu.classList.toggle('max-h-96');
              adminSubmenu.classList.toggle('opacity-100');
              adminSubmenu.classList.toggle('mt-2');
            });
          }

          // L\xF3gica para el bot\xF3n de logout
          const logoutButton = document.getElementById('logout-button');
          if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
              await fetch('/api/auth/logout', { credentials: 'include' });
              // Redirigir al home despu\xE9s de cerrar sesi\xF3n
              window.location.href = '/';
            });
          }
        };

        window.addEventListener('DOMContentLoaded', initializeSidebar);
      }
    <\/script> </body> </html>`])), maybeRenderHead());
}, "C:/Users/fabia/Desktop/Fabian Proyectos/Urban-Pay-4.0-main/apps/frontend/src/components/Sidebar.astro", void 0);

export { $$Sidebar as $ };
