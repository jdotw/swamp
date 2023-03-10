export interface Unit {
  type: string; // discriminator
  id: number;
  name: string;
  description?: string;
  formed_date: string;
  disbanded_date?: string;
}

export interface MutateUnit {
  name: string;
  description?: string;
  formed_date: string;
  disbanded_date?: string;
}
