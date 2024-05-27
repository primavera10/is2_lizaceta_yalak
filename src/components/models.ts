export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Item {
  id : number,
  name: string
}

export type Items = Item[]
