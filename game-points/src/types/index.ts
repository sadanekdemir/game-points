export interface Bonus {
  collect: number,
  yield: number
}

export type GameItem = {
  label: string,
  unitPoints: number,
  bonus?: Bonus,
}

export type BonusItem = Omit<GameItem, 'unitPoints'>;

export interface ScoreItem {
  label: string,
  quantity: number,
  score: number
  unitPoints?: number,
}