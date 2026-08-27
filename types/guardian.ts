import type { Status } from "./common";

export type Guardian = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  occupation?: string;
  relation: string;
  studentIds: string[];
  status: Status;
  madrasaId: string;
};
