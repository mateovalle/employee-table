import {Employee} from "../../types/Employee";
import {EmployeeRowData} from "../../components/EmployeeTable/EmployeeRow";

const accountKeys = [
  'vcsUsers',
  'tmsUsers',
  'imsUsers',
  'calUsers',
] as const;

const getConnectedAccounts = (employee: Employee): string[] => {
  const sources: string[] = [];
  accountKeys.forEach(accountType => {
    employee.identity[accountType].forEach((account: any) => {
      sources.push(account[accountType.slice(0, -1) as keyof typeof account].source);
    });
  });
  return sources;
};

export const employeeRow = (employee: Employee): EmployeeRowData => {
  const fullName = employee.identity.fullName
  const primaryEmail = employee.identity.primaryEmail
  const photoUrl = employee.identity.photoUrl
  const trackingStatus = !employee.inactive ? "Active" : "Inactive";
  const teams = employee.teams.map(team => team.team)

  const accountsConnected = getConnectedAccounts(employee);

  return {
    fullName,
    primaryEmail,
    photoUrl,
    trackingStatus,
    teams,
    accountsConnected,
    uid: employee.uid,
  }
}