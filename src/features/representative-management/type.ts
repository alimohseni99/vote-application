export type Representative = {
  name: string;
  email: string;
  votes: number;
};

export type Election = {
  title: string;
  optionText: string[];
  active: boolean;
  createdTimeStamp?: Date;
  deactivatedTimeStamp?: Date;
};
