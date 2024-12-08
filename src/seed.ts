import {
  electionPreferenceTableSeed,
  electionTableSeed,
  representativeTableSeed,
  representativeVotesTableSeed,
  seedPublicTable,
} from "./features";

seedPublicTable()
  .then(() => {
    console.log("public voter table seeded");
    return representativeTableSeed();
  })
  .then(() => {
    console.log("representative table seeded");
    return representativeVotesTableSeed();
  })
  .then(() => {
    console.log("representative votes table seeded");
  })
  .then(() => {
    electionTableSeed();
    console.log("election table seeded");
  })
  .then(() => {
    electionPreferenceTableSeed();
    console.log("election preference table seeded");
  })
  .catch((error) => {
    console.error("Error seeding tables:", error);
  });
