import React, {ReactNode} from 'react';
import {Box, Button, Icon, TableCell, TableRow, Typography} from "@mui/material";
import { Team} from "../../types/Employee";
import githubIcon from '../../assets/icons/github.png'
import jiraIcon from '../../assets/icons/jira.png';
import pagerdutyIcon from '../../assets/icons/pagerduty.png';
import googleCalendarIcon from '../../assets/icons/google-calendar.png';
import farosLogo from '../../assets/icons/faros-logo.svg';
import Chip from "../common/Chip";
import PersonIcon from '@mui/icons-material/Person';
import {useEmployeeTableStore} from "../../hooks/employeeTable/useEmployeeTableStore";

const getAccountIcon = (account: string) => {
  switch (account) {
    case 'GitHub':
      return githubIcon;
    case 'Jira':
      return jiraIcon;
    case 'pagerduty':
      return pagerdutyIcon;
    case 'google-calendar':
      return googleCalendarIcon;
    default:
      return farosLogo;
  }
}

type Column<T> = {
  id: string;
  render: (data: T) => ReactNode;
}

export type EmployeeRowData = {
  uid: string;
  fullName: string;
  primaryEmail: string;
  photoUrl: string;
  trackingStatus: string;
  teams: Team[];
  accountsConnected: string[];
}

type EmployeeRowProps = {
  employeeData: EmployeeRowData;
}

const EmployeeRow = ({employeeData}: EmployeeRowProps) => {
  const {setSelectedEmployee} = useEmployeeTableStore();
  const columns: Column<EmployeeRowData>[] = [
    {
      id: 'name',
      render: (employeeData) =>
        (
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={48} width={48} borderRadius={24} overflow={"hidden"}>
              <img src={employeeData.photoUrl} width={48} />
            </Box>
            <Box flexDirection={"column"}>
              <Typography color={"#03749C"}>
                {employeeData.fullName}
              </Typography>
              <Typography color={"#516B7B"}>
                {employeeData.primaryEmail}
              </Typography>
            </Box>
          </Box>
        ),
    },
    {
      id: 'trackingStatus',
      render: (employeeData) =>
        <Box display={"flex"} gap={1}>
          <PersonIcon color={employeeData.trackingStatus === "Active" ? "success" : "disabled"}/>
          <Typography color={"#105E1D"}>{employeeData.trackingStatus}</Typography>
        </Box>
    },
    {
      id: 'teams',
      render: (employeeData) =>
        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
          {employeeData.teams.map(team => <Chip color={team.color} label={team.name} />)}
        </Box>,
    },
    {
      id: 'accountsConnected',
      render: (employeeData) =>
        <Box display={"flex"} justifyContent={"flex-start"} gap={1} flexDirection={"row"}>{employeeData.accountsConnected.map(account => {
          return (
            <img src={getAccountIcon(account)} alt={account} width={20} height={20} />
          )
        })}</Box>,
    },
    {
      id: 'view',
      render: (employeeData) =>
        <Button onClick={() => setSelectedEmployee(employeeData)} variant={"outlined"}>View</Button>
    },
  ];

  return (
    <TableRow
      key={employeeData.uid}
    >
      {columns.map((column) => (
        <TableCell key={column.id}>
          {column.render(employeeData)}
        </TableCell>))
      }
    </TableRow>
  );
};

export default EmployeeRow;