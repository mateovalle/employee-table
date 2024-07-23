import { filterByTrackingStatus } from '../employeeTableFilters';
import {EmployeeRowData} from "../../../components/EmployeeTable/EmployeeRow";

describe('filterByTrackingStatus', () => {
  const employees: EmployeeRowData[] = [
    {
      uid: "1",
      fullName: "Harry Potter",
      primaryEmail: "harry@mail.com",
      photoUrl: "sampleUrl.com",
      trackingStatus: "Active",
      teams: [],
      accountsConnected: [],
    },
    {
      uid: "2",
      fullName: "Ron Wisley",
      primaryEmail: "ron@mail.com",
      photoUrl: "sampleUrl.com",
      trackingStatus: "Active",
      teams: [],
      accountsConnected: [],
    },
    {
      uid: "3",
      fullName: "Hermione Granger",
      primaryEmail: "hermione@mail.com",
      photoUrl: "sampleUrl.com",
      trackingStatus: "Inactive",
      teams: [],
      accountsConnected: [],
    },
  ];

  it('filters employees by a single tracking status', () => {
    const result = employees.filter(filterByTrackingStatus(['Active']));
    expect(result).toEqual([employees[0], employees[1]]);
  });

  it('filters employees by multiple tracking statuses', () => {
    const result = employees.filter(filterByTrackingStatus(['Active', 'Inactive']));
    expect(result).toEqual([employees[0], employees[1], employees[2]]);
  });

  it('returns all employees if no tracking status is specified', () => {
    const result = employees.filter(filterByTrackingStatus([]));
    expect(result).toHaveLength(3);
  });
});