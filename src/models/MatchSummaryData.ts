
export interface IMatchSummaryData {
  matchId: string;
  playerOne: string;
  playerTwo: string;
  playerOneGameTotal: number;
  playerTwoGameTotal: number;
  winner: string;
  opponent: string;
  winnerSetTotal: number;
  opponentSetTotal: number;
  winnerGameTotal: number;
  opponentGameTotal: number;
}

export interface IMatchSummaryJson {
  _matchId: string;
  _playerOne: string;
  _playerTwo: string;
  _playerOneGameTotal: number;
  _playerTwoGameTotal: number;
  _winner: string;
  _opponent: string;
  _winnerSetTotal: number;
  _opponentSetTotal: number;
  _winnerGameTotal: number;
  _opponentGameTotal: number;
}

export class MatchSummaryData implements IMatchSummaryData {
  private _matchId: string;
  private _playerOne: string;
  private _playerTwo: string;
  private _playerOneGameTotal: number;
  private _playerTwoGameTotal: number;
  private _winner: string;
  private _opponent: string;
  private _winnerSetTotal: number;
  private _opponentSetTotal: number;
  private _winnerGameTotal: number;
  private _opponentGameTotal: number;

  get matchId(): string {
    return this._matchId;
  }

  set matchId(matchId: string) {
    this._matchId = matchId;
  }

  get playerOne(): string {
    return this._playerOne;
  }

  set playerOne(playeOne: string) {
    this._playerOne = playeOne;
  }

  get playerTwo(): string {
    return this._playerTwo;
  }

  set playerTwo(playerTwo: string) {
    this._playerTwo = playerTwo;
  }

  get playerOneGameTotal(): number {
    return this._playerOneGameTotal;
  }

  set playerOneGameTotal(playerOneGameTotal: number) {
    this._playerOneGameTotal = playerOneGameTotal;
  }

  get playerTwoGameTotal(): number {
    return this._playerTwoGameTotal;
  }

  set playerTwoGameTotal(playerTwoGameTotal: number) {
    this._playerTwoGameTotal = playerTwoGameTotal;
  }

  get winner(): string {
    return this._winner;
  }

  set winner(winner: string) {
    this._winner = winner;
  }

  get opponent(): string {
    return this._opponent;
  }

  set opponent(opponent: string) {
    this._opponent = opponent;
  }

  get winnerSetTotal(): number {
    return this._winnerSetTotal;
  }

  set winnerSetTotal(winnerSetTotal: number) {
    this._winnerSetTotal = winnerSetTotal;
  }

  get winnerGameTotal(): number {
    return this._winnerGameTotal;
  }

  set winnerGameTotal(winnerGameTotal: number) {
    this._winnerGameTotal = winnerGameTotal;
  }

  get opponentGameTotal(): number {
    return this._opponentGameTotal;
  }

  set opponentGameTotal(opponentGameTotal: number) {
    this._opponentGameTotal = opponentGameTotal;
  }

  get opponentSetTotal(): number {
    return this._opponentSetTotal;
  }

  set opponentSetTotal(opponentSetTotal: number) {
    this._opponentSetTotal = opponentSetTotal;
  }

}