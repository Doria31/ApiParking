import { Router } from 'express';
const router = Router();
import { crearCelda, obtenerCelda, obtenerCeldas, obtenerCeldasPorEstado, actualizarCelda, eliminarCelda, parquear, calcularPago, salir } from '../controllers/celdaController.mjs';

router.post('/celdas', crearCelda);
router.get('/celdas/:id', obtenerCelda);
router.get('/celdas', obtenerCeldas);
router.get('/celdas/estado/:estado', obtenerCeldasPorEstado);
router.put('/celdas/:id', actualizarCelda);
router.delete('/celdas/:id', eliminarCelda);
router.post('/parquear', parquear);
router.get('/calcularPago/:id', calcularPago);
router.post('/salir/:id', salir);

export default router;
