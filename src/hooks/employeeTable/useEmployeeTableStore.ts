import { create } from 'zustand'
import {Employee} from "../../types/Employee";
import {EmployeeRowData} from "../../components/EmployeeTable/EmployeeRow";

export enum EmployeeTableFiltersEnum {
  ACCOUNTS = 'accounts',
  TEAMS = 'teams',
  STATUS = 'status',
}

type EmployeeTableStore = {
  selectedEmployee: EmployeeRowData | null,
  setSelectedEmployee: (selectedEmployee: EmployeeRowData | null) => void
  searchValue: string
  setSearchValue: (searchValue: string) => void
  activeFilters: EmployeeTableFiltersEnum[]
  setActiveFilters: (activeFilters: EmployeeTableFiltersEnum[]) => void
  filters: Record<EmployeeTableFiltersEnum, string[]>
  setFilters: (filters: {accounts: string[], teams: string[], status: string[]}) => void
}

const initialPaymentStoreState: EmployeeTableStore = {
  selectedEmployee: null,
  setSelectedEmployee: () => {},
  searchValue: "",
  setSearchValue: () => {},
  activeFilters: [],
  setActiveFilters: () => {},
  filters: {
    accounts: [],
    teams: [],
    status: [],
  },
  setFilters: () => {},
};

export const useEmployeeTableStore = create<EmployeeTableStore>((set) => ({
  ...initialPaymentStoreState,
  setSearchValue: (searchValue) => set((state) => ({...state, searchValue: searchValue })),
  setActiveFilters: (activeFilters) => set((state) => ({...state, activeFilters: activeFilters })),
  setFilters: (filters) => set((state) => ({...state, filters: filters })),
  setSelectedEmployee: (selectedEmployee) => set((state) => ({...state, selectedEmployee: selectedEmployee })),
}))
