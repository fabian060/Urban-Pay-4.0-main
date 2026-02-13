import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/cuotas`;


/** 
  * @typedef Cuotas
  * @type {object}
  * @property {string} id El id la cuota
  * @property {string} date La fecha de la cuota
  * @property {string} description La descripcion de la cuota
  * @property {string} date_limit La fecha limite de la cuota
  * @property {string} monto El monto de la cuota
*/

/** @type {Cuota[]} */
let cuotasArray = [];
export const cuotas = atom(cuotasArray);


/** 
  * Agrega una cuota.
  * @param {object} cuotaToCreate La nueva cuota
  * @param {string} cuotaToCreate.date La fecha de la cuota 
  * @param {string} cuotaToCreate.description La descripcion de la cuota
  * @param {string} cuotaToCreate.date_limit La fecha limite de la cuota 
*/

const getCuotas = async () => {
  try {
    const cuotasData = await ky.get(`${BACK_ENDPOINT}/api/cuotas`, {
      credentials: 'include'
    }).json()
    cuotas.set(cuotasData);
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace('/login');
    }
    console.log(error);
  }
}

const addCuota = async (cuotaToCreate) => {
  try {
    const cuotaCreated = await ky.post(BASE_URL, {json: cuotaToCreate, credentials: 'include'}).json();
    cuotas.set(cuotas.get().concat(cuotaCreated));
    createNotification({title: 'Cuota creada!',type: 'success'});
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};


/**
  * Elimina un cuota
  * @param {string} id El id de la cuota a eliminar
*/
const removeCuota = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const cuotaDeleted = await ky.delete(url, { credentials: 'include'}).json();
    cuotas.set(cuotas.get().filter(cuota => cuota.id !== cuotaDeleted.id));
    createNotification({
      title: 'Cuota eliminada',
      description: `${cuotaDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
}

export default {
  addCuota,
  removeCuota,
  getCuotas
}