import { GameItem } from "../types";

export const items: GameItem[] = [
  { label: 'A', unitPoints: 50, bonus: { collect: 3, yield: 200 } },
  { label: 'B', unitPoints: 30, bonus: { collect: 2, yield: 90 } },
  { label: 'C', unitPoints: 20 },
  { label: 'D', unitPoints: 15 },
  { label: 'E', unitPoints: 10 },
]
