# Tennis Calculator Code Challenge

This is the output for tennis calculator code challenge. The details of code challenge is [here](reference/README.md).

# Get Started

Need Node.js (above v.10) and latest npm installed.

```bash
# install dependencies
npm i

# Run application with default data file
npm start

# Run application with new data file (make sure to add the file to the data folder) 
npm start -- <new file name> # e.g. npm start -- full_tournament_2.txt

# Run test (using Mocha)
npm run test

# Run Integration test
npm run test:int

# watch test
npm run test:watch

# watch Integration test
npm run test:int:watch
```

# Solution Summary

Used TypeScript with the OOP style. First, FileProcessor read file and create an array of data. MatchCalculator iterates the array. Then, MatchCalculaterHelper populate the MatchSummaryData model with match results per match. Each MatchSummaryData is pushed to an array as the property of MatchSummaryServices. Then, MatchSummaryServices uses the array of match data to produce required output.

![Solution Diagram](./reference/diagram.PNG)

# Folder structure

```bash
- data # where match data files are
- integration # For integration tests
- reference # instruction & img for documentation
- src # source folder
  - constants # constant values
  - models # for data models
  - services # service logics
  - main.ts # Entry file
```
