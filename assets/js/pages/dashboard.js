
import { isAuthed, logout } from '../core/store.js';
import { loadServices, saveServices } from '../core/api.js';
import { isAdminPage } from '../core/dom.js';

function resolveImg(p){
  if(/^https?:/i.test(p)) return p;
  return isAdminPage() ? ('../' + p) : p;
}

export async function initDashboard(){
  const guard = document.querySelector('#dashboard');
  if(!guard) return;
  if(!isAuthed()) { location.href = 'login.html'; return; }

  let services = await loadServices();

  const tbody = document.querySelector('#tbody');
  const form = document.querySelector('#form-servicio');
  const btnSalir = document.querySelector('#btn-salir');
  const btnNuevo = document.querySelector('#btn-nuevo');

  function render(){
    tbody.innerHTML = '';
    services.forEach(s => {
      const tr = document.createElement('tr');
      const imgSrc = resolveImg(s.imagen);
      tr.innerHTML = `
        <td>${s.id}</td>
        <td><img src="${imgSrc}" alt="${s.nombre}" style="width:80px;height:50px;object-fit:cover;border-radius:6px"></td>
        <td>${s.nombre}</td>
        <td>${s.categoria}</td>
        <td>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(s.precio)}</td>
        <td>${s.cantidad}</td>
        <td>${s.promo ? 'Sí' : 'No'}</td>
        <td>
          <button class="btn btn-secondary" data-edit="${s.id}">Editar</button>
          <button class="btn btn-danger" data-del="${s.id}">Eliminar</button>
        </td>`;
      tbody.appendChild(tr);
    });
    saveServices(services);
  }

  function clearForm(){ form.reset(); form.id.value=''; }

  tbody.addEventListener('click', (e)=>{
    const editId = e.target.getAttribute('data-edit');
    const delId = e.target.getAttribute('data-del');
    if(editId){
      const s = services.find(x=> String(x.id)===String(editId));
      if(!s) return;
      form.id.value = s.id;
      form.nombre.value = s.nombre;
      form.categoria.value = s.categoria;
      form.precio.value = s.precio;
      form.cantidad.value = s.cantidad;
      form.promo.checked = !!s.promo;
      form.imagen.value = s.imagen;
      form.descripcion.value = s.descripcion;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if(delId){
      if(confirm('¿Eliminar este servicio?')){
        services = services.filter(x => String(x.id) !== String(delId));
        render();
      }
    }
  });

  btnNuevo?.addEventListener('click', ()=> clearForm());

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = {
      id: form.id.value ? Number(form.id.value) : (services.length ? Math.max(...services.map(s=>Number(s.id)))+1 : 1),
      nombre: form.nombre.value.trim(),
      categoria: form.categoria.value.trim(),
      precio: Number(form.precio.value||0),
      cantidad: Number(form.cantidad.value||0),
      promo: !!form.promo.checked,
      imagen: form.imagen.value.trim() || 'assets/img/services/desarrollo-web.svg',
      descripcion: form.descripcion.value.trim() || 'Descripción del servicio.'
    };
    const idx = services.findIndex(x => Number(x.id)===Number(data.id));
    if(idx >= 0){ services[idx] = data; } else { services.push(data); }
    clearForm();
    render();
  });

  btnSalir?.addEventListener('click', ()=>{ logout(); location.href = 'login.html'; });

  render();
}
