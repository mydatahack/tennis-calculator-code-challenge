import { IMatchSummaryData, IMatchSummaryJson } from '../models/MatchSummaryData';
import { IMatchSummaryServices } from './MatchSummaryServices';

export interface IMatchCalculatorHelper {
  isNewGame(): boolean;
  setMatchId(matchTitleLine: string): void;
  setPlayers(playerInfoLine: string): void;
  setMatchOutcome(score: string, setGameFunc?): void;
  setGame(playerOneScore: number, playerTwoScore: number, setCountFunc?): void;
  setCount(playerOneGame: number, playerTwoGame: number, setWinnerFunc?): void;
  setWinner(playerOneSet: number, playerTwoSet: number): void;
}

export class MatchCalculatorHelper implements IMatchCalculatorHelper {

  private _newGame: boolean;
  private _playerOneScore: number;
  private _playerTwoScore: number;
  private _playerOneGame: number;
  private _playerTwoGame: number;
  private _playerOneGameTotal: number;
  private _playerTwoGameTotal: number;
  private _playerOneSet: number;
  private _playerTwoSet: number;
  private _matchSummaryData: IMatchSummaryData;
  private _matchSummaryServices: IMatchSummaryServices;

  constructor(matchSummaryData: IMatchSummaryData,
    matchSummaryServices: IMatchSummaryServices,
    newGame: boolean = false) {
    this._newGame = newGame;
    this._playerOneScore = 0;
    this._playerTwoScore = 0;
    this._playerOneGame = 0;
    this._playerTwoGame = 0;
    this._playerOneGameTotal = 0;
    this._playerTwoGameTotal = 0;
    this._playerOneSet = 0;
    this._playerTwoSet = 0;
    this._matchSummaryData = matchSummaryData;
    this._matchSummaryServices = matchSummaryServices;
  }

  isNewGame(): boolean {
    return this._newGame;
  }

  setMatchId(matchTitleLine: string): void {
    const matchId = matchTitleLine.split(':')[1].trim();
    // Setting matchId to the model
    this._matchSummaryData.matchId = matchId;
    this._newGame = true;
  }

  setPlayers(playerInfoLine: string): void {
    const players = playerInfoLine.split('vs');
    const player1 = players[0].trim();
    const player2 = players[1].trim();
    // Setting players to the model
    this._matchSummaryData.playerOne = player1;
    this._matchSummaryData.playerTwo = player2;
  }

  setMatchOutcome(score: string, setGameFunc = this.setGame): void {
    if (score.trim() === '0') {
      this._playerOneScore += 1;
      setGameFunc(this._playerOneScore, this._playerTwoScore);
    } else if (score.trim() === '1') {
      this._playerTwoScore += 1;
      setGameFunc(this._playerOneScore, this._playerTwoScore);
    }
  }

  setGame = (playerOneScore: number, playerTwoScore: number, setCountFunc = this.setCount): void => {
    if ((playerOneScore >= 4 || playerTwoScore >= 4)
      && Math.abs(playerOneScore - playerTwoScore) >= 2) {
      this.resetPlayersScore();
      if (playerOneScore > playerTwoScore) {
        this._playerOneGame += 1;
        setCountFunc(this._playerOneGame, this._playerTwoGame);
      } else {
        this._playerTwoGame += 1;
        setCountFunc(this._playerOneGame, this._playerTwoGame);
      }
    }
  }

  setCount = (playerOneGame: number, playerTwoGame: number, setWinnerFunc = this.setWinner): void => {
    if (playerOneGame === 6) {
      this._playerOneSet += 1;
      this.resetPlayersGame();
      setWinnerFunc(this._playerOneSet, this._playerTwoSet);
    } else if (playerTwoGame === 6) {
      this._playerTwoSet += 1;
      this.resetPlayersGame();
      setWinnerFunc(this._playerOneSet, this._playerTwoSet);
    }
  }

  setWinner = (playerOneSet: number, playerTwoSet: number): void => {
    if (playerOneSet === 2) {
      this._matchSummaryData.winner = this._matchSummaryData.playerOne;
      this._matchSummaryData.opponent = this._matchSummaryData.playerTwo;
      this._matchSummaryData.winnerSetTotal = playerOneSet;
      this._matchSummaryData.opponentSetTotal = playerTwoSet;
      this._matchSummaryData.winnerGameTotal = this._playerOneGameTotal;
      this._matchSummaryData.opponentGameTotal = this._playerTwoGameTotal;
      this.addPlayersGameTotal();
      this.resetPlayersSet();
      this.addSummaryData();
    } else if (playerTwoSet === 2) {
      this._matchSummaryData.winner = this._matchSummaryData.playerTwo;
      this._matchSummaryData.opponent = this._matchSummaryData.playerOne;
      this._matchSummaryData.winnerSetTotal = playerTwoSet;
      this._matchSummaryData.opponentSetTotal = playerOneSet;
      this._matchSummaryData.winnerGameTotal = this._playerTwoGameTotal;
      this._matchSummaryData.opponentGameTotal = this._playerOneGameTotal;
      this.addPlayersGameTotal();
      this.resetPlayersSet();
      this.addSummaryData();
    }
  }

  private addSummaryData = () => {
    this._matchSummaryServices.addMatchData({ ...this._matchSummaryData as any }); // this needs to be any
    this._newGame = false;
  }

  private resetPlayersScore = () => {
    this._playerOneScore = 0;
    this._playerTwoScore = 0;
  }

  private resetPlayersGame = () => {
    this._playerOneGameTotal += this._playerOneGame;
    this._playerTwoGameTotal += this._playerTwoGame;
    this._playerOneGame = 0;
    this._playerTwoGame = 0;
  }

  private resetPlayersSet = () => {
    this._playerOneSet = 0;
    this._playerTwoSet = 0;
  }

  private addPlayersGameTotal = () => {
    this._matchSummaryData.playerOneGameTotal = this._playerOneGameTotal;
    this._matchSummaryData.playerTwoGameTotal = this._playerTwoGameTotal;
    this.resetPlayersGameTotal();
  }

  private resetPlayersGameTotal = () => {
    this._playerOneGameTotal = 0;
    this._playerTwoGameTotal = 0;
  }
}