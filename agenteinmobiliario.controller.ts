import { Request, Response } from 'express';
import { AgenteInmobiliarioRepository } from './agenteinmobiliario.repository.js';

const repo = new AgenteInmobiliarioRepository();

export async function findAll(req: Request, res: Response) {
  try {
    const agentes = await repo.findAll();
    res.status(200).json(agentes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agente = await repo.findOne(id);
    if (!agente) return res.status(404).json({ message: 'Agente no encontrado' });
    res.status(200).json(agente);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function add(req: Request, res: Response) {
  try {
    const { nombre, inmobiliariaCuit } = req.body;
    const agente = await repo.add(nombre, inmobiliariaCuit);
    res.status(201).json(agente);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agente = await repo.update(id, req.body);
    if (!agente) return res.status(404).json({ message: 'Agente no encontrado' });
    res.status(200).json(agente);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const agente = await repo.delete(id);
    if (!agente) return res.status(404).json({ message: 'Agente no encontrado' });
    res.status(200).json({ message: 'Agente eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
