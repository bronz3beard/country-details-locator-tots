import { ClassValue, clsx } from 'clsx';
import { JSXElementConstructor } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createNamespacedComponent<T extends JSXElementConstructor<any>, U>(
  getComponent: () => T,
  namespaceMembers: U
): T & U {
  const NamespaceComponent = getComponent();
  return Object.assign(NamespaceComponent, namespaceMembers);
}
