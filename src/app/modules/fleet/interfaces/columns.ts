import { Subscribable } from 'rxjs';

export interface Columns {
  field: string;
  header: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Subscribable<any[]>;
  optionLabel?: string;
  optionValue?: any;
  width?: string;
  value?: any;
}
