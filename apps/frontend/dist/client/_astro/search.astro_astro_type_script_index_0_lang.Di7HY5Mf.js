import{k as i,B as c}from"./endpoints.A-j0qYyd.js";const w=document.getElementById("search-form"),h=document.getElementById("house-number"),l=document.getElementById("results-container"),r=document.getElementById("loading"),p=document.getElementById("error"),m=document.getElementById("empty");w.addEventListener("submit",async d=>{d.preventDefault();const n=h.value.trim();if(n){l.innerHTML="",r.classList.remove("hidden"),p.classList.add("hidden"),m.classList.add("hidden");try{const t=await i.get(`${c}/api/users/search?house_number=${encodeURIComponent(n)}`,{credentials:"include"}).json();if(r.classList.add("hidden"),t.length===0)m.classList.remove("hidden");else{const a=t[0];await v(a)}}catch(t){r.classList.add("hidden"),p.classList.remove("hidden"),console.error("Error searching users:",t),(t.response?.status===401||t.response?.status===403)&&location.replace("/login")}}});async function v(d){l.innerHTML="";try{const[n,t]=await Promise.all([i.get(`${c}/api/cuotas`,{credentials:"include"}).json(),i.get(`${c}/api/payment?user_id=${d.id}`,{credentials:"include"}).json()]),a=t.filter(e=>e.status==="accepted"),u=a.map(e=>e.cuota_id),s=n.filter(e=>!u.includes(e.id)),g=`
        <section class="w-full max-w-2xl">
          <h2 class="text-lg font-semibold mb-2">Resumen</h2>
          <table class="w-full border border-gray-300 rounded-lg overflow-hidden">
            <tbody>
              <tr>
                <td class="py-2 px-4 font-medium text-gray-200">Cuotas pendientes</td>
                <td class="py-2 px-4 text-right">${s.length}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-medium text-gray-200">Monto de la última cuota por pagar</td>
                <td class="py-2 px-4 text-right">${s.length>0?s[s.length-1].monto+"$":"-"}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-medium text-gray-200">Total de las cuotas pendientes</td>
                <td class="py-2 px-4 text-right">${s.reduce((e,o)=>e+Number(o.monto),0)+"$"}</td>
              </tr>
            </tbody>
          </table>
        </section>
      `;l.insertAdjacentHTML("beforeend",g);const f=`
        <section class="w-full max-w-2xl mt-8">
          <h2 class="text-lg font-bold mb-2">Cuotas pendientes</h2>
          <div class="flex w-full text-gray-800 dark:text-white mb-2">
            <span class="w-1/3">Mes</span>
            <span class="w-1/3">Fecha</span>
            <span class="w-1/3">Fecha Limite</span>
            <span class="w-1/3">Monto $</span>
          </div>
          <ul class="m-0 p-2 list-none overflow-auto flex flex-col gap-8 rounded-md border border-gray-300 h-full">
            ${s.map(e=>`
              <li class="flex gap-4 justify-between items-center">
                <div class="flex flex-wrap md:flex-nowrap gap-2 flex-grow">
                  <input class="w-full bg-gray-500 rounded-md p-2 outline-none" type="text" value="${e.description}" readonly>
                  <input class="w-full bg-gray-500 rounded-md p-2 outline-none" type="text" value="${e.date.split("T")[0]}" readonly>
                  <input class="w-full bg-gray-500 rounded-md p-2 outline-none" type="text" value="${e.date_limit.split("T")[0]}" readonly>
                  <input class="w-full bg-gray-500 rounded-md p-2 outline-none" type="text" value="${e.monto}" readonly>
                </div>
              </li>
            `).join("")}
          </ul>
        </section>
      `;l.insertAdjacentHTML("beforeend",f);const y=`
        <section class="w-full max-w-2xl mt-8">
          <h2 class="text-lg font-semibold mb-2">Cuotas pagadas</h2>
          <ul class="m-0 p-2 list-none overflow-auto flex flex-col gap-8 rounded-md border border-green-300 h-full">
            ${n.filter(e=>u.includes(e.id)).map(e=>{const o=a.find(b=>b.cuota_id===e.id),x=o?o.status:"";return`
                <li class="flex gap-4 justify-between items-center">
                  <div class="flex flex-wrap md:flex-nowrap gap-2 flex-grow">
                    <input class="w-full bg-green-600 rounded-md p-2 outline-none" type="text" value="${e.description}" readonly>
                    <input class="w-full bg-green-600 rounded-md p-2 outline-none" type="text" value="${e.date.split("T")[0]}" readonly>
                    <input class="w-full bg-green-600 rounded-md p-2 outline-none" type="text" value="${e.date_limit.split("T")[0]}" readonly>
                    <input class="w-full bg-green-600 rounded-md p-2 outline-none" type="text" value="${e.monto}" readonly>
                    <input class="w-full bg-green-600 rounded-md p-2 outline-none font-bold" type="text" value="${x}" readonly>
                  </div>
                </li>
              `}).join("")}
          </ul>
        </section>
      `;l.insertAdjacentHTML("beforeend",y)}catch(n){console.error("Error loading account statement:",n),l.innerHTML="<p>Error al cargar el estado de cuenta</p>"}}
