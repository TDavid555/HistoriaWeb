import Tortenet from "@/models/tortenet.model";
import { useSyncExternalStore } from 'react';
import API from "./api.service";

let itemsCache: Tortenet[] = [];
let tortenetekbytelepules:Tortenet[]=[];
const listeners = new Set<() => void>();
const PORT=3000;
const Offline=`localhost:${PORT}`;

function emit() {
  listeners.forEach(l => l());
}

export default function useTortenetek(): Tortenet[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => itemsCache
  );
}

export function useTortenetekByTelepules(): Tortenet[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => tortenetekbytelepules
  );
}

export async function refreshAllTortenet(): Promise<void> {
  try{
    const res = await fetch(`${API}/api/osszes`);
    const data = await res.json();
    itemsCache = data;
    emit();
  }
  catch{
    const res=await fetch(`${Offline}/api/osszes`);
    const data = await res.json();
    itemsCache = data;
    emit();
  }
}

export async function getAllTortenetByTelepules(telepules:string|null):Promise<void> {
    try{
        const res=await fetch(`${API}/api/tortenet/${telepules}`);
        const data=await res.json();
        tortenetekbytelepules=data;
        emit();
    }
    catch{
        const res=await fetch(`${Offline}/api/tortenet/${telepules}`);
        const data=await res.json();
        tortenetekbytelepules=data;
        emit();
    }
}