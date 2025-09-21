export interface Path {
  lat: number;
  lng: number;
}

export interface Cable {
  id: number;
  name: string;
  capacity: number;
  boxes_connected: number[];
  path: Path[];
}

export interface DropCable {
  id: number;
  name: string;
  box_id: number;
  customer_id: number;
}

export interface Box {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
}

export interface Customer {
  id: number;
  code: string;
  name: string;
  address: string;
  box_id: number;
}

export interface IspData {
  cables: Cable[];
  dropCables: DropCable[];
  boxes: Box[];
  customers: Customer[];
}
