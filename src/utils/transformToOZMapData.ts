import {
  UpdateFTTHClientDTO,
  UpdateCableDTO,
  UpdateBoxDTO,
  UpdateConnectorTypeDTO,
} from "@ozmap/ozmap-sdk";

import { Cable, DropCable, Box, Customer } from "@models/isp.model";

export const transformDropCables = (
  dropCables: DropCable[]
): UpdateConnectorTypeDTO[] => {
  return dropCables.map((dropCable) => ({
    id: dropCable.id.toString(),
    code: dropCable.name,
    isDrop: true,
    external_id: dropCable.id,
  }));
};

export const transformBoxes = (boxes: Box[]): UpdateBoxDTO[] => {
  return boxes.map((box) => ({
    external_id: box.id,
    name: box.name,
    coords: [box.lng, box.lat],
    boxType: box.type,
  }));
};

export const transformCables = (cables: Cable[]): UpdateCableDTO[] => {
  return cables.map((cable) => ({
    external_id: cable.id,
    name: cable.name,
    cableType: cable.capacity.toString(),
    boxA: cable.boxes_connected[0]?.toString() ?? null,
    boxB: cable.boxes_connected[1]?.toString() ?? null,
    poles: cable.path.map((p) => ({ lat: p.lat, lng: p.lng })),
  }));
};

export const transformCustomers = (
  customers: Customer[]
): UpdateFTTHClientDTO[] => {
  return customers.map((customer) => ({
    code: customer.code,
    name: customer.name,
    observation: `Address: ${customer.address}`,
    external_id: customer.id,
  }));
};
