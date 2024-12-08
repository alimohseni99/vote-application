import { representativeTableSeed, seedPublicTable } from "./features";

seedPublicTable().then(() => console.log("public voter table seeded"));
representativeTableSeed().then(() =>
  console.log("representative table seeded")
);
