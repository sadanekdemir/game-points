export interface Bonus {
  collect: number,
  yield: number
}

export type GameItem = {
  label: string,
  unitPoints: number,
  bonus?: Bonus,
}

export type BonusItem = {
  label: string,
  collect: number,
  bonusAmount: number;
}

export interface ScoreItem {
  label: string,
  quantity: number,
  score: number
  unitPoints: number,
}

export type ScoreList = Record<string, ScoreItem>;