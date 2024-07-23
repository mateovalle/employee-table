import {Employee} from "./Employee";

export type EmployeeListResponse = {
  data: EmployeeResponseData;
}

export interface EmployeeResponseData {
  org_Employee_aggregate: OrgEmployeeAggregate;
  employees:              Employee[];
}

export type OrgEmployeeAggregate = {
  aggregate: Aggregate;
}

export type Aggregate = {
  count: number;
}