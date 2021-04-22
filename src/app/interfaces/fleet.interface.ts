export interface Vehicle {
  rowId?: number;
  plate?: string;
  carframe?: string;
  manufacturerId?: number;
  modelId?: number;
  entryDate?: Date;
  leavingDate?: Date;
  employeeId?: number;
  assignedAtCompanyId?: number;
  mileage?: number;
  vehicleTypeId?: number;
  fuelTypeId?: number;
  pollutingEmissions?: number;
  transmissionTypeId?: number;
  financialCompanyId?: number;
  financingTypeId?: number;
  contractNumber?: number;
  maxMileage?: number;
  monthlyFee?: number;
  active?: boolean;
  environmentLabelId?: number;
  fuelConsumption?: number;
  observations?: string;
}

export interface FuelType {
  rowId?: number;
  fuel?: string;
}

export interface FinancialCompany {
  rowId?: number;
  employeeId?: number;
  assignedAt?: Date;
  deallocatedAt?: Date;
}

export interface FinancingType {
  rowId?: number;
  financing: string;
}

export interface EnvironmentLabelType {
  rowId?: number;
  labelType?: string;
}

export interface Manufacturer {
  rowId?: number;
  manufacturer?: string;
}

export interface ManufacturerModel {
  rowId?: number;
  manufacturerId?: number;
  model?: string;
}
