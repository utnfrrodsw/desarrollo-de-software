import { Request, Response, NextFunction } from 'express';
import { AgenteInmobiliario } from './agenteinmobiliario.entity.js';
import { orm } from '../shared/db/orm.js';
import { Inmobiliaria } from '../inmobiliaria/inmobiliaria.entity.js';

const em = orm.em;

export async function sanitizeAgenteInput(req: Request, res: Response, next: NextFunction) {
  const { nombre, inmobiliariaCuit } = req.body;

  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ message: 'Nombre es requerido y debe ser string' });
  }
  if (!inmobiliariaCuit) {
    return res.status(400).json({ message: 'CUIT de la inmobiliaria es requerido' });
  }

  try {
    const inmobiliaria = await em.findOneOrFail(Inmobiliaria, { cuit: inmobiliariaCuit });
    req.body.sanitizedInput = { nombre, inmobiliaria };
    next();
  } catch {
    return res.status(404).json({ message: 'Inmobiliaria no encontrada' });
  }
}

export async function findAll(req: Request, res: Response) {
  try {
    const agentes = await em.find(AgenteInmobiliario, {}, { populate: ['inmobiliaria'] });
    res.status(200).json({ message: 'Found all agentes', data: agentes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agente = await em.findOne(AgenteInmobiliario, { id }, { populate: ['inmobiliaria'] });
    if (!agente) return res.status(404).json({ message: 'AgenteInmobiliario not found' });
    res.status(200).json({ message: 'Found agente', data: agente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function add(req: Request, res: Response) {
  try {
    const agente = em.create(AgenteInmobiliario, req.body.sanitizedInput);
    await em.persistAndFlush(agente);
    res.status(201).json({ message: 'AgenteInmobiliario created', data: agente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agenteToUpdate = await em.findOne(AgenteInmobiliario, { id });
    if (!agenteToUpdate) return res.status(404).json({ message: 'AgenteInmobiliario not found' });

    em.assign(agenteToUpdate, req.body.sanitizedInput);
    await em.flush();

    res.status(200).json({ message: 'AgenteInmobiliario updated', data: agenteToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agente = await em.findOne(AgenteInmobiliario, { id });
    if (!agente) return res.status(404).json({ message: 'AgenteInmobiliario not found' });

    await em.removeAndFlush(agente);
    res.status(200).json({ message: 'AgenteInmobiliario deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
