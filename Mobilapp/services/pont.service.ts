import Pont from "@/models/pont.model";
import { useSyncExternalStore } from 'react';
import API from "./api.service";

let itemsCache: Pont[] = [];
const listeners = new Set<() => void>();
const PORT=3000;
const Offline=`localhost:${PORT}`;

function emit() {
  listeners.forEach(l => l());
}

export default function usePontok(): Pont[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => itemsCache
  );
}

export async function refreshAllPont(): Promise<void> {
  try{
    const res = await fetch(`${API}/api/terkep`);
    const data = await res.json();
    itemsCache = data;
    emit();
  }
  catch{
    const res=await fetch(`${Offline}/api/terkep`);
    const data = await res.json();
    itemsCache = data;
    emit();
  }
}

export async function getAllPont(): Promise<Pont[]> {
  try{
    const res = await fetch(`${API}/api/terkep`);
    return await res.json();
  }
  catch{
    const res=await fetch(`${Offline}/api/terkep`); 
    return await res.json();
  }
}