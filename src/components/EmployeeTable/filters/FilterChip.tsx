import React, {useState} from 'react';
import {EmployeeTableFiltersEnum, useEmployeeTableStore} from "../../../hooks/employeeTable/useEmployeeTableStore";
import {Checkbox, Chip, Menu, MenuItem} from "@mui/material";

type ActiveFilterProps = {
  filterType: EmployeeTableFiltersEnum
  label: string
  options: string[]
}
const FilterChip = ({filterType, options, label}: ActiveFilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {setActiveFilters, activeFilters, setFilters, filters } = useEmployeeTableStore();

  const toggleOption = (option: string) => {
    if (filters[filterType].includes(option)) {
      setFilters({...filters, [filterType]: filters[filterType].filter((f) => f !== option)});
    } else {
      setFilters({...filters, [filterType]: [...filters[filterType], option]});
    }
  }

  const chipLabel = filters[filterType].length === 0 ? `${label} (All)` :
    filters[filterType].length === 1 ? `${label} (${filters[filterType][0]})` :
      `${label} (${filters[filterType].length} selected)`;
  return (
    <>
      <Chip
        label={chipLabel}
        onDelete={() => setActiveFilters(activeFilters.filter(activeFilter => activeFilter !== filterType))}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Menu sx={{maxHeight: 400}} open={!!anchorEl} onClose={() =>setAnchorEl(null)} anchorEl={anchorEl}>
        {options.map(option => (
          <MenuItem
            onClick={() => toggleOption(option)}
            selected={filters[filterType].includes(option)}
          >
            <Checkbox checked={filters[filterType].includes(option)} />
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default FilterChip;