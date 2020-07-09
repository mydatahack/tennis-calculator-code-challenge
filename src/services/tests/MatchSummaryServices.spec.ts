import { expect } from 'chai';
import sinon from 'sinon';
import { MatchSummaryServices } from '../MatchSummaryServices';
import {
  noMatchQueryResultMsg,
  noPlayerQueryResultMsg
} from '../../constants/constantValues';

const mockMatchSummaryData1 = {
  _matchId: '01',
  _playerOne: 'Person A',
  _playerTwo: 'Person C',
  _winner: 'Person C',
  _opponent: 'Person A',
  _winnerSetTotal: 2,
  _opponentSetTotal: 1,
  _winnerGameTotal: 1,
  _opponentGameTotal: 1,
  _playerOneGameTotal: 1,
  _playerTwoGameTotal: 1
};

const mockMatchSummaryData2 = {
  _matchId: '02',
  _playerOne: 'Person C',
  _playerTwo: 'Person A',
  _winner: 'Person A',
  _opponent: 'Person C',
  _winnerSetTotal: 2,
  _opponentSetTotal: 1,
  _winnerGameTotal: 1,
  _opponentGameTotal: 1,
  _playerOneGameTotal: 1,
  _playerTwoGameTotal: 1
};

describe('MatchSummaryServices', () => {
  describe('addMatchData()', () => {

    it('should add matchSummaryData to an array', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      const matchSummary = matchSummaryServices.matchSummary;
      expect(matchSummary.length).to.equal(1);
    });
  });

  describe('queryMatchResult', () => {
    it('should return correct matchResult', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryMatchResult('Score Match 02');
      const expectedString = 'Person A defeated Person C\n2 sets to 1';
      expect(queryResult).to.equal(expectedString);
    });

    it('should display no result message with non existing match id', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryMatchResult('Score Match 03');
      expect(queryResult).to.equal(noMatchQueryResultMsg);
    });

    it('should display no result message with empty string', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryMatchResult('');
      expect(queryResult).to.equal(noMatchQueryResultMsg);
    });
  });

  describe('queryPlayerGames', () => {
    it('should return correct player game total', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryPlayerGames('Games Player Person A');
      const expectedString = '2 2';
      expect(queryResult).to.equal(expectedString);
    });

    it('should display no result message with non existing player', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryPlayerGames('Games Player Person D');
      expect(queryResult).to.equal(noPlayerQueryResultMsg);
    });

    it('should display no result message with empty string', () => {
      const matchSummaryServices = new MatchSummaryServices();
      matchSummaryServices.addMatchData(mockMatchSummaryData1);
      matchSummaryServices.addMatchData(mockMatchSummaryData2);
      const queryResult = matchSummaryServices.queryPlayerGames('');
      expect(queryResult).to.equal(noPlayerQueryResultMsg);
    });
  });
});