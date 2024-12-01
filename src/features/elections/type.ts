export type Election = {
  title: string;
  createdTimeStamp?: Date;
  status?: "ongoing" | "concluded";
};

export type ElectionChoice = {
  choice: string;
};
