import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import { FileProcessor } from '../src/services/FileProcessor';
import { MatchCalculatorHelper } from '../src/services/MatchCalculatorHelper';
import { MatchSummaryData } from '../src/models/MatchSummaryData';
import { MatchSummaryServices } from '../src/services/MatchSummaryServices';
import { MatchCalculator } from '../src/services/MatchCalculator';

describe('MatchCalculator Integration Test', () => {
  it('should calculate match results and return correct object', () => {
    // Expected output
    const expectedOutput = [
      {
        _matchId: '01',
        _playerOne: 'Person A',
        _playerTwo: 'Person B',
        _winner: 'Person B',
        _opponent: 'Person A',
        _winnerSetTotal: 2,
        _opponentSetTotal: 0,
        _winnerGameTotal: 12,
        _opponentGameTotal: 0,
        _playerOneGameTotal: 0,
        _playerTwoGameTotal: 12
      },
      {
        _matchId: '02',
        _playerOne: 'Person A',
        _playerTwo: 'Person C',
        _winner: 'Person C',
        _opponent: 'Person A',
        _winnerSetTotal: 2,
        _opponentSetTotal: 1,
        _winnerGameTotal: 12,
        _opponentGameTotal: 6,
        _playerOneGameTotal: 6,
        _playerTwoGameTotal: 12
      }
    ];
    // (1) Get data from file
    const fileName = 'full_tournament_int_test_data.txt';
    const filePath = path.join(__dirname, `./test-data/${fileName}`);
    const fileProcessor = new FileProcessor(filePath);
    const matchDataArray = fileProcessor.processFileToArray();

    // (2) Instanciate models and services
    const matchSummaryServices = new MatchSummaryServices();
    const matchSummaryData = new MatchSummaryData();
    const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
    const matchCalculator = new MatchCalculator(matchCalculatorHelper);
    // (3) Execute
    matchCalculator.setAllMatchOutcomes(matchDataArray);
    // Assert
    expect(matchSummaryServices.matchSummary).deep.equal(expectedOutput);
  });
});