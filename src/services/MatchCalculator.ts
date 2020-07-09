import { IMatchCalculatorHelper } from './MatchCalculatorHelper';

export interface IMatchCalculator {
  setAllMatchOutcomes(matchArray: string[]): void;
}

export class MatchCalculator implements IMatchCalculator {

  private _matchCalculatorHelper: IMatchCalculatorHelper;

  constructor(matchCalculatorHelper: IMatchCalculatorHelper) {
    this._matchCalculatorHelper = matchCalculatorHelper;
  }

  setAllMatchOutcomes(matchArray: string[]): void {
    matchArray.forEach((value) => {
      // get matchId & players
      if (value.toLowerCase().includes('match') && value.includes(':')) {
        this._matchCalculatorHelper.setMatchId(value);
      } else if (value.toLowerCase().includes('vs')) {
       this._matchCalculatorHelper.setPlayers(value);
      }
      // Read score and calculate match outcome
      // Skipping extra score lines (due to mistake just in case) after the game ended.
      if (this._matchCalculatorHelper.isNewGame()) {
        this._matchCalculatorHelper.setMatchOutcome(value);
      }
    });
  }
}