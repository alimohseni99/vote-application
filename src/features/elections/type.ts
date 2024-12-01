export type Election = {
  title: string;
  optionText: string[];
  active: boolean;
  createdTimeStamp?: Date;
  deactivatedTimeStamp?: Date;
};
