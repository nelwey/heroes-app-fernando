import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";


interface FavoriteHeroContext {
  //state
  favorites: Hero[];
  favoriteCount: number;

  //methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}
export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find(h => h.id === hero.id);
    if (heroExist) {
      return setFavorites(favorites.filter(h => h.id !== hero.id));
    }
    setFavorites([...favorites, hero]);
  }

  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])


  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite
      }}
    >
      {children}
    </FavoriteHeroContext>
  )
}
