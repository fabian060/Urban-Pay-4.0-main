import express from 'express';
import cuotasRepository from './cuotas.repository.js';
import {
  createCuotaRouteSchema,
  deleteCuotaRouteSchema,
  updateCuotaRouteSchema,
} from './cuotas.routes.schemas.js';
const cuotasRouter = express.Router();

cuotasRouter.get('/', async (req, res) => {
  // Global cuotas — anyone can see all cuotas unless a house_number filter is explicitly provided
  const { house_number } = req.query;
  const cuotas = await cuotasRepository.getAll(house_number);
  res.json(cuotas);
});

cuotasRouter.post('/', async (req, res) => {
  const body = createCuotaRouteSchema.body.parse(req.body);
  // Global cuota: do not attach a house_number by default
  const newCuota = await cuotasRepository.addOne(body);
  res.json(newCuota);
});

cuotasRouter.delete('/:id', async (req, res) => {
  const params = deleteCuotaRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const cuotaDeleted = await cuotasRepository.deleteOneById({
    cuotaId: params.id,
  });
  console.log('CUOTA ELIMINADO', cuotaDeleted);

  res.json(cuotaDeleted);
});

cuotasRouter.put('/:id', async (req, res) => {
  const body = updateCuotaRouteSchema.body.parse(req.body);
  const params = updateCuotaRouteSchema.params.parse(req.params);
  const cuotaUpdated = await cuotasRepository.updateOneById(params.id, body);
  res.json(cuotaUpdated);
});

export default cuotasRouter;
