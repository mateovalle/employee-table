import {EmployeeRowData} from "../../components/EmployeeTable/EmployeeRow";
import {EmployeeTableFiltersEnum} from "../../hooks/employeeTable/useEmployeeTableStore";
import {Filter} from "../filters/applyFilters";

export const filterByTeams = (teams: string[]) => (employee: EmployeeRowData) => {
  return teams.length === 0 || employee.teams.some(team => teams.includes(team.name));
}

export const filterByAccounts = (accounts: string[]) => (employee: EmployeeRowData) => {
  return accounts.length === 0 || employee.accountsConnected.some(account => accounts.includes(account));
}

export const filterByTrackingStatus = (trackingStatus: string[]) => (employee: EmployeeRowData) => {
  return trackingStatus.length === 0 || trackingStatus.includes(employee.trackingStatus);}

export const nameFilter = (searchValue: string) => (employee: EmployeeRowData) => {
  return employee.fullName.toLowerCase().includes(searchValue.toLowerCase());
}

export const employeeTableFilters: Record<EmployeeTableFiltersEnum, (values: string[]) => Filter<EmployeeRowData>> = {
  [EmployeeTableFiltersEnum.TEAMS]: filterByTeams,
  [EmployeeTableFiltersEnum.ACCOUNTS]: filterByAccounts,
  [EmployeeTableFiltersEnum.STATUS]: filterByTrackingStatus,
}