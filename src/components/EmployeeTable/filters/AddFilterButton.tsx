import React, {useState} from 'react';
import {Box, Button, Menu, MenuItem, Typography, Checkbox, Chip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EmployeeTableFiltersEnum, useEmployeeTableStore} from "../../../hooks/employeeTable/useEmployeeTableStore";
import FilterChip from "./FilterChip";

const filters: {key: EmployeeTableFiltersEnum, label: string, options: string[]}[] = [
  {
    key: EmployeeTableFiltersEnum.ACCOUNTS,
    label: 'Accounts Connected',
    options: ['GitHub', 'google-calendar', 'Mock', 'Jira', 'pagerduty']
  },
  {
    key: EmployeeTableFiltersEnum.TEAMS,
    label: 'Team',
    options: ['Collaboration', 'Spreadsheets', 'all_teams', 'Financial Services', 'Games', 'Sales', 'Tooling', 'Marketing', 'Word Processing', 'Browser', 'CRM', 'Productivity', 'Chat', 'Email', 'Consumer Goods', 'Industries', 'Consumer', 'Slideshow', 'Products', 'Enterprise', 'Desktop', 'Cloud']
  },
  {
    key: EmployeeTableFiltersEnum.STATUS,
    label: 'Tracking Status',
    options: ['Active', 'Inactive']
  },
]

const AddFilterButton = () => {
  const [anchorElFiltersMenu, setAnchorElFiltersMenu] = useState<null | HTMLElement>(null);

  const {activeFilters, setActiveFilters} = useEmployeeTableStore();

  const toggleFilter = (filter: EmployeeTableFiltersEnum) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  }

  return (
    <Box display={"flex"} gap={3}>
      <Button
        startIcon={<AddIcon />}
        variant={"outlined"}
        onClick={(e) => setAnchorElFiltersMenu(e.currentTarget)}
      >
        Add Filter
      </Button>
      <Menu open={!!anchorElFiltersMenu} onClose={() => {setAnchorElFiltersMenu(null)}} anchorEl={anchorElFiltersMenu}>
        {filters.map(filter => (
          <MenuItem
            onClick={(prev) => toggleFilter(filter.key)}
            selected={activeFilters.includes(filter.key)}
          >
            <Checkbox checked={activeFilters.includes(filter.key)} />
            {filter.label}
          </MenuItem>
        ))}
      </Menu>
      {
        filters.map((filter) => {
          return activeFilters.includes(filter.key) && (
          <FilterChip filterType={filter.key} label={filter.label} options={filter.options}/>
        )})
      }
    </Box>
  );
};

export default AddFilterButton;