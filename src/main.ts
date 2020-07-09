import path from 'path';
import readline from 'readline';
import { MatchSummaryData } from './models/MatchSummaryData';
import { FileProcessor } from './services/FileProcessor';
import { MatchCalculator } from './services/MatchCalculator';
import { MatchCalculatorHelper } from './services/MatchCalculatorHelper';
import { MatchSummaryServices } from './services/MatchSummaryServices';

// Setting up console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter query for match (e.g. Score Match 02): ', (matchQuery: string) => {
  rl.question('Enter query for player game (e.g. Game Player Person A): ', (playerQuery: string) => {
    // Preparation
    // (1) Process File
    let fileName;
    if (process.argv.length > 3) {
      fileName = process.argv[3];
    } else {
      fileName = process.argv[2];
    }
    const filePath = path.join(__dirname, `../data/${fileName}`);
    const fileProcessor = new FileProcessor(filePath);
    const matchDataArray = fileProcessor.processFileToArray();

    // (2) Instanciate models and services
    const matchSummaryServices = new MatchSummaryServices();
    const matchSummaryData = new MatchSummaryData();

    const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
    const matchCalculator = new MatchCalculator(matchCalculatorHelper);

    // Execution
    // (1) Aggregate Match Results
    matchCalculator.setAllMatchOutcomes(matchDataArray);
    // (2) Executing query
    const matchResult = matchSummaryServices.queryMatchResult(matchQuery);
    console.log(matchResult);
    console.log('');
    const playerResult = matchSummaryServices.queryPlayerGames(playerQuery);
    console.log(playerResult);
    rl.close();
  });
});
