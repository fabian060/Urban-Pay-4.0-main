import { atom } from "nanostores";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

// Estado global para pagos
export const pagos = atom([]);

// Obtener pagos del backend
export const getPagos = async () => {
  try {
    const pagosData = await ky.get(`${BACK_ENDPOINT}/api/payment`, {
      credentials: 'include'
    }).json();
    pagos.set(pagosData);
  } catch (error) {
    console.error(error);
  }
};
