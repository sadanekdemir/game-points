import { useMemo } from "react";
import { items } from "../data";
import { GameItem, BonusItem } from "../types";

export const useGetGameData = (): {
  gameItems: GameItem[];
  bonusItems: BonusItem[];
} => {
  const gameItems: GameItem[] = useMemo(()=>{
    return items.map(item => ({ label: item.label, unitPoints: item.unitPoints }) )
  }, [items])

  const bonusItems: BonusItem[] = useMemo(()=>{
    return items.filter(item => item.bonus).map(item => ({ label: item.label, bonus: item.bonus }))
  },[items])

  return { gameItems, bonusItems }
}