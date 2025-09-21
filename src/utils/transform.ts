import { Box, Cable, Customer, DropCable } from "../models/isp.model";

export function transformCable(cable: Cable) {
  return {
    externalId: cable.id,
    name: cable.name,
    capacity: cable.capacity,
    geometry: cable.path.map((p: any) => [p.lng, p.lat]),
  };
}

export function transformBox(box: Box) {
  return {
    externalId: box.id,
    name: box.name,
    type: box.type,
    location: [box.lng, box.lat],
  };
}

export function transformCustomer(customer: Customer) {
  return {
    externalId: customer.id,
    code: customer.code,
    name: customer.name,
    address: customer.address,
    boxExternalId: customer.box_id,
  };
}

export function transformDrop(drop: DropCable) {
  return {
    externalId: drop.id,
    name: drop.name,
    boxExternalId: drop.box_id,
    customerExternalId: drop.customer_id,
  };
}
