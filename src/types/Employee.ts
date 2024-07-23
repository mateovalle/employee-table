import {CalUser, ImsUser, TmsUser, VcsUser} from "./User";

export type Employee = {
  id:       string;
  uid:      string;
  inactive: null;
  identity: EmployeeIdentity;
  teams:    TeamResponse[];
}

export type EmployeeIdentity = {
  id:           string;
  uid:          string;
  fullName:     string;
  primaryEmail: string;
  photoUrl:     string;
  vcsUsers:     VcsUser[];
  tmsUsers:     TmsUser[];
  imsUsers:     ImsUser[];
  calUsers:     CalUser[];
}

export interface TeamResponse {
  id:   string;
  team: Team;
}

export interface Team {
  id:    string;
  uid:   string;
  name:  string;
  color?: string | null;
}