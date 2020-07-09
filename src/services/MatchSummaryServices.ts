import { IMatchSummaryJson } from '../models/MatchSummaryData';
import {
  noMatchQueryResultMsg,
  noPlayerQueryResultMsg
} from '../constants/constantValues';

export interface IMatchSummaryServices {
  matchSummary: IMatchSummaryJson[];
  addMatchData(matchSummaryData: IMatchSummaryJson): void;
  queryMatchResult(query: string): void;
  queryPlayerGames(query: string): void;
}

export class MatchSummaryServices implements IMatchSummaryServices {

  private _matchSummary: IMatchSummaryJson[] = [];

  get matchSummary() {
    return this._matchSummary;
  }

  addMatchData(matchSummaryData: IMatchSummaryJson) {
    this._matchSummary.push({ ...matchSummaryData });
  }

  queryMatchResult(query: string): string {
    const matchId = query.trim().substring(query.length - 2);
    const targetMatch = this._matchSummary.find(x => x._matchId === matchId);
    if (targetMatch){
      return `${targetMatch._winner} defeated ${targetMatch._opponent}\n${targetMatch._winnerSetTotal} sets to ${targetMatch._opponentSetTotal}`;
    } else {
      return noMatchQueryResultMsg;
    }
  }

  queryPlayerGames(query: string): string {
    const targetPlayer = query.trim().split(' ').slice(2).join(' ').toLowerCase();
    const winMatches = this._matchSummary.filter((match) => {
      return match._winner.toLowerCase() === targetPlayer;
    });
    const lostMatches = this._matchSummary.filter((match) => {
      return match._opponent.toLowerCase() === targetPlayer;
    });

    if (!winMatches.length && !lostMatches.length) {
      return noPlayerQueryResultMsg;
    }

    // console.log(winMatches);
    // console.log(lostMatches);

    const totalGamesWonInWinningMatch = this.totalGameCalculator(winMatches, '_winnerGameTotal');
    const totalGameLostInWinningMatch = this.totalGameCalculator(winMatches, '_opponentGameTotal');
    const totalGamesWonInLosingMatch = this.totalGameCalculator(lostMatches, '_opponentGameTotal');
    const totalGamesLostInLosingMatch = this.totalGameCalculator(lostMatches, '_winnerGameTotal');

    return `${totalGamesWonInWinningMatch + totalGamesWonInLosingMatch} ${totalGameLostInWinningMatch + totalGamesLostInLosingMatch}`;
  }

  private totalGameCalculator(matchArray: IMatchSummaryJson[], key: string) {
    return matchArray.reduce((total, matchData) => {
      total += matchData[key];
       return total;
    }, 0);
  }
}