export type Bonus = {
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

export type ScoreItem = {
  label: string,
  quantity: number,
  score: number
  unitPoints: number,
}

export type ScoreList = Record<string, ScoreItem>;

export type GameData = {
  gameItems?: GameItem[],
  scores?: ScoreList,
  totalScore?: number,
  totalBonus?: number
}