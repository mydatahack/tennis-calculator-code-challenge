import { expect } from 'chai';
import sinon from 'sinon';
import { MatchCalculatorHelper } from '../MatchCalculatorHelper';
import { MatchSummaryData } from '../../models/MatchSummaryData';
import { MatchSummaryServices } from '../MatchSummaryServices';
import { MatchCalculator } from '../MatchCalculator';

describe('MatchCalculator', () => {

  describe('setAllMatchOutcomes()', () => {
    let matchSummaryData;
    let matchSummaryServices;
    let setMatchIdSpy;
    let setPlayerSpy;
    let setMatchOutcomeSpy;

    beforeEach(() => {
      matchSummaryData = new MatchSummaryData();
      matchSummaryServices = new MatchSummaryServices();
      setMatchIdSpy = sinon.spy(MatchCalculatorHelper.prototype, 'setMatchId');
      setPlayerSpy = sinon.spy(MatchCalculatorHelper.prototype, 'setPlayers');
      setMatchOutcomeSpy = sinon.spy(MatchCalculatorHelper.prototype, 'setMatchOutcome');

    });

    afterEach(() => {
      matchSummaryData = null;
      matchSummaryServices = null;
      setMatchIdSpy.restore();
      setPlayerSpy.restore();
      setMatchOutcomeSpy.restore();
    });

    it('should call all the functions from MatchCalculatorHelper', () => {
      const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices, true);
      const inputArray = ['Match: 01', 'Person A vs Person B', '0'];
      const matchCalculator = new MatchCalculator(matchCalculatorHelper);
      matchCalculator.setAllMatchOutcomes(inputArray);
      expect(setMatchIdSpy.calledWith('Match: 01')).to.be.true;
      expect(setPlayerSpy.calledWith('Person A vs Person B')).to.be.true;
      expect(setMatchOutcomeSpy.calledWith('0')).to.be.true;
    });

    it('should not call any functions if the array value do not meet any conditions', () => {
      const matchCalculatorHelper = new MatchCalculatorHelper(matchSummaryData, matchSummaryServices, true);
      const inputArray = ['','',''];
      const matchCalculator = new MatchCalculator(matchCalculatorHelper);
      matchCalculator.setAllMatchOutcomes(inputArray);
      expect(setMatchIdSpy.calledWith('Match: 01')).to.be.false;
      expect(setPlayerSpy.calledWith('Person A vs Person B')).to.be.false;
      expect(setMatchOutcomeSpy.calledWith('0')).to.be.false;
    });
  });
});