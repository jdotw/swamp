export interface Unit {
  id: string;
  name: string;
  description?: string;
  functions: Function[];
  formed_date: string;
  disbanded_date?: string;
}

export interface MutateUnit {
  name: string;
  description?: string;
  formed_date: string;
  disbanded_date?: string;
}
