export enum SpecialCharEnum {
  Any = '*',    // Every value in the range
  Range = '-',  // Range of values
  Step = '/',   // Step values
  List = ',',   // List of values
}

export interface CronField {
  name: string;
  min: number;
  max: number;
  specials: Set<SpecialCharEnum>;
}

export interface ParsedCron {
  [key: string]: number[] | string;
}
