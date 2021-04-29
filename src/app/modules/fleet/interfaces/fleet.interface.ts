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

export interface VehicleDto {
  rowId?: number;
  plate?: string;
  carframe?: string;
  modelId?: number;
  manufacturerId?: number;
  financingTypeId?: number;
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
  contractNumber?: number;
  maxMileage?: number;
  monthlyFee?: number;
  active?: boolean;
  environmentLabelId?: number;
  fuelConsumption?: number;
  observations?: string;
}
