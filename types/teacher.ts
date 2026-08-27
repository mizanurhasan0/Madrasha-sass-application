import type { Status } from "./common";

export type Teacher = {
  id: string;
  name: string;
  nameBn?: string;
  avatar?: string;
  email: string;
  phone: string;
  designation: string;
  subjects: string[];
  classIds: string[];
  joiningDate: string;
  address: string;
  bio?: string;
  status: Status;
  madrasaId: string;
};

export type Staff = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: string;
  status: Status;
  madrasaId: string;
};
