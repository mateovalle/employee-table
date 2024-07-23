export type User = {
  __typename: string;
  id:         string;
  uid:        string;
  source:     string;
}

export interface UserIdentity {
  uid: string;
}


export type CalUser = {
  calUser:  User;
  identity: UserIdentity;
}

export type TmsUser = {
  tmsUser:  User;
  identity: UserIdentity;
}


export type ImsUser = {
  imsUser:  User;
  identity: UserIdentity;
}


export interface VcsUser {
  vcsUser:  User;
  identity: UserIdentity;
}
