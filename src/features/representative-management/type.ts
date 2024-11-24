export type Representative = {
  name: string;
  email: string;
  votes: number;
};

export type Election = {
  title: string;
  createdTimeStamp: Date;
  active: boolean;
  deactivatedTimeStamp: Date;
};

export type ElectionOptions = {
  electionId: string;
  optionText: string;
};
