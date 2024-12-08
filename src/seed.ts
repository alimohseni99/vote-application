import {
  seedDefaultRepresentative,
  seedElectionPreferenceTable,
  seedElectionTable,
  seedElectionVoteTable,
  seedPublicTable,
  seedPublicTableWithDefaultId,
  seedRepresentativeTable,
  seedRepresentativeVotesTable,
} from "./features";

seedPublicTable()
  .then(() => {
    console.log("public voter table seeded");
    return seedRepresentativeTable();
  })
  .then(() => {
    console.log("representative table seeded");
    return seedRepresentativeVotesTable();
  })
  .then(async () => {
    await seedElectionTable();
    console.log("election table seeded");
  })
  .then(async () => {
    await seedElectionPreferenceTable();
    console.log("election preference table seeded");
  })
  .then(async () => {
    await seedPublicTableWithDefaultId();
    console.log("Default public voter seeded");
  })
  .then(async () => {
    await seedDefaultRepresentative();
    console.log("Default representative seeded");
  })
  .then(() => {
    seedElectionVoteTable();
    console.log("election vote table seeded");
  })
  .catch((error) => {
    console.error("Error seeding tables:", error);
  });
