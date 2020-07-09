import { expect } from 'chai';
import sinon from 'sinon';
import { MatchCalculatorHelper } from '../MatchCalculatorHelper';
import { MatchSummaryData } from '../../models/MatchSummaryData';
import { MatchSummaryServices } from '../MatchSummaryServices';

describe('MatchCalculatorHelper', () => {

  describe('setMatchId()', () => {
    it('should assing match Id to the model according to the input string', () => {
      const matchSummaryData = new MatchSummaryData();
      const matchSummaryServices = new MatchSummaryServices();
      const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
      matchCalculatorHelper.setMatchId('Match Score: 01');
      expect(matchSummaryData.matchId).to.equal('01');
    });
  });

  describe('setPlayers()', () => {
    it('should assign players to the model according to the input string', () => {
      const matchSummaryData = new MatchSummaryData();
      const matchSummaryServices = new MatchSummaryServices();
      const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
      matchCalculatorHelper.setPlayers('Person A vs Person B');
      expect(matchSummaryData.playerOne).to.equal('Person A');
      expect(matchSummaryData.playerTwo).to.equal('Person B');
    });
  });

  describe('setMatchOutcome()', () => {
    let matchSummaryData;
    let matchSummaryServices;
    let matchCalculatorHelper;
    let setGameFuncSpy;
    beforeEach(() => {
      matchSummaryData = new MatchSummaryData();
      matchSummaryServices = new MatchSummaryServices();
      matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
      setGameFuncSpy = sinon.spy();
    });
    afterEach(() => {
      matchSummaryData = null;
      matchSummaryServices = null;
      matchCalculatorHelper = null;
      setGameFuncSpy = null;
    });

    it('should increment playerOneScore when score value is 0 and call setGameFunc', () => {
      matchCalculatorHelper.setMatchOutcome('0', setGameFuncSpy);
      expect(setGameFuncSpy.withArgs(1, 0).calledOnce).to.be.true;
    });

    it('should increment playerOneScore when score value is 1 and call setGameFunc', () => {
      matchCalculatorHelper.setMatchOutcome('1', setGameFuncSpy);
      expect(setGameFuncSpy.withArgs(0, 1).calledOnce).to.be.true;
    });

    it('should not call setGameFunc if the score value is neither 1 or 0', () => {
      matchCalculatorHelper.setMatchOutcome('', setGameFuncSpy);
      expect(setGameFuncSpy.called).to.be.false;
    });
  });

  describe('setGame()', () => {
    let matchSummaryData;
    let matchSummaryServices;
    let matchCalculatorHelper;
    let setCountFuncSpy;
    beforeEach(() => {
      matchSummaryData = new MatchSummaryData();
      matchSummaryServices = new MatchSummaryServices();
      matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
      setCountFuncSpy = sinon.spy();
    });
    afterEach(() => {
      matchSummaryData = null;
      matchSummaryServices = null;
      matchCalculatorHelper = null;
      setCountFuncSpy = null;
    });

    it ('should not set game if the game has not finished', () => {
      const inputScore = [
        [1, 1], // set in progress
        [4 ,3], // duece with player one set point
        [5, 6], // duece with player two set point
      ];

      inputScore.forEach((score) => {
        matchCalculatorHelper.setGame(score[0], score[1], setCountFuncSpy);
        expect(setCountFuncSpy.called).to.be.false;
      });
    });

    it('should set game according to players score correctly', () => {
      const inputScore = [
        [4, 1], // player one gets set
        [5, 3], // player one gets set after duece
        [1, 4], // player two gets set
        [4, 6], // player two gets set after duece
      ];
      const expectedSet = [
        [1, 0], // player one gets set (1-0)
        [2, 0], // player one gets set after duece (2-0)
        [2, 1], // player two gets set (2-1)
        [2, 2], // player two gets set after duece (2-2)
      ];

      inputScore.forEach((score, index) => {
        matchCalculatorHelper.setGame(score[0], score[1], setCountFuncSpy);
        expect(setCountFuncSpy.withArgs(expectedSet[index][0], expectedSet[index][1]).calledOnce).to.be.true;
      });
    });
  });

  describe('setCount()', () => {
    let matchSummaryData;
    let matchSummaryServices;
    let matchCalculatorHelper;
    let setWinnerFuncSpy;

    beforeEach(() => {
      matchSummaryData = new MatchSummaryData();
      matchSummaryServices = new MatchSummaryServices();
      matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);
      setWinnerFuncSpy = sinon.spy();
    });

    afterEach(() => {
      matchSummaryData = null;
      matchSummaryServices = null;
      matchCalculatorHelper = null;
      setWinnerFuncSpy = null;
    });

    it('should not add set when game is still ongoing', () => {
      matchCalculatorHelper.setCount(1, 5, setWinnerFuncSpy);
      expect(setWinnerFuncSpy.called).to.be.false;

    });

    it('should add set to players when game is over', () => {
      const inputGame = [
        [6, 5], // player one gets set
        [5, 6] // player two gets set
      ];
      const expectedSet = [
        [1, 0], // player one gests set (1-0)
        [1, 1] // player two gets set (1-1)
      ];

      inputGame.forEach((game, index) => {
        matchCalculatorHelper.setCount(game[0], game[1], setWinnerFuncSpy);
        expect(setWinnerFuncSpy.withArgs(expectedSet[index][0], expectedSet[index][1]).calledOnce).to.be.true;
      });
    });
  });

  describe('setWinner()', () => {
    let matchSummaryData;
    let matchSummaryServices;
    let matchCalculatorHelper;
    let addMatchDataSpy;

    beforeEach(() => {
      matchSummaryData = new MatchSummaryData();
      matchSummaryData.playerOne = 'Person A';
      matchSummaryData.playerTwo = 'Person B';
      addMatchDataSpy = sinon.spy(MatchSummaryServices.prototype, 'addMatchData');
      matchSummaryServices = new MatchSummaryServices();
      matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices);

    });

    afterEach(() => {
      matchSummaryData = null;
      matchSummaryServices = null;
      matchCalculatorHelper = null;
      addMatchDataSpy.restore();
    });

    it('should not winner when game is still ongoing', () => {
      matchCalculatorHelper.setWinner(1, 1);
      expect(addMatchDataSpy.called).to.be.false;
    });

    it('should assign correct final set and winner to the model', () => {
      const inputSet = [
        [2, 1], // player one won set
        [0, 2], // player two won set
      ];
      const expectedSet = [
        [2, 1], // player one won set
        [2, 0], // player two won set
      ];
      const expectedPlayers = [
        ['Person A', 'Person B'], // Person A is the winner
        ['Person B', 'Person A']  // Person B is the winner
      ];
      inputSet.forEach((value, index) => {
        matchCalculatorHelper.setWinner(value[0], value[1]);
        expect(matchSummaryData.winner).to.equal(expectedPlayers[index][0]);
        expect(matchSummaryData.opponent).to.equal(expectedPlayers[index][1]);
        expect(matchSummaryData.winnerSetTotal).to.equal(expectedSet[index][0]);
        expect(matchSummaryData.opponentSetTotal).to.equal(expectedSet[index][1]);
        expect(addMatchDataSpy.called).to.be.true;
      });
    });
  });
});
