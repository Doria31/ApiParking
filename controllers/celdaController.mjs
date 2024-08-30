import Celda from '../models/celdaModel.mjs';

export async function crearCelda(req, res) {
  const { numeroCelda, estado } = req.body;
  try {
    const nuevaCelda = new Celda({ numeroCelda, estado });
    await nuevaCelda.save();
    res.status(201).send(nuevaCelda);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function obtenerCelda(req, res) {
  try {
    const celda = await Celda.findById(req.params.id);
    if (!celda) {
      return res.status(404).send();
    }
    res.send(celda);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function obtenerCeldas(req, res) {
  try {
    const celdas = await Celda.find({});
    res.send(celdas);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function obtenerCeldasPorEstado(req, res) {
  try {
    const celdas = await Celda.find({ estado: req.params.estado });
    res.send(celdas);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function actualizarCelda(req, res) {
  try {
    const celda = await Celda.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!celda) {
      return res.status(404).send();
    }
    res.send(celda);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function eliminarCelda(req, res) {
  try {
    const celda = await Celda.findByIdAndDelete(req.params.id);
    if (!celda) {
      return res.status(404).send();
    }
    res.send(celda);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function parquear(req, res) {
  const { placaVehiculo } = req.body;
  try {
    const celda = await Celda.findOneAndUpdate(
      { estado: 'disponible' },
      { estado: 'no disponible', placaVehiculo, fechaIngreso: new Date(), pin: `${Math.random().toString(36).substr(2, 9)}` },
      { new: true }
    );
    if (!celda) {
      return res.status(404).send({ error: 'No hay celdas disponibles' });
    }
    res.send(celda);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function calcularPago(req, res) {
  try {
    const celda = await Celda.findById(req.params.id);
    if (!celda || !celda.fechaIngreso) {
      return res.status(404).send({ error: 'Celda no encontrada o sin fecha de ingreso' });
    }
    const horas = Math.ceil((new Date() - celda.fechaIngreso) / (1000 * 60 * 60));
    const valor = horas * 5000;
    res.send({ valor });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function salir(req, res) {
  try {
    const celda = await Celda.findByIdAndUpdate(
      req.params.id,
      { estado: 'disponible', placaVehiculo: '', fechaIngreso: null, fechaSalida: new Date(), pin: '' },
      { new: true }
    );
    if (!celda) {
      return res.status(404).send();
    }
    res.send(celda);
  } catch (error) {
    res.status(500).send(error);
  }
}
