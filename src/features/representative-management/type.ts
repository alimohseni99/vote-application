export type Representative = {
  name: string;
  email: string;
  votes: number;
};

export type Election = {
  title: string;
  active: boolean;
  createdTimeStamp?: Date;
  deactivatedTimeStamp?: Date;
};

export type ElectionOptions = {
  optionText: string[];
};
