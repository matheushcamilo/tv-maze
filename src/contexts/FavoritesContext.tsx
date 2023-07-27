import React from "react";
import type { PropsWithChildren } from "react";

import { useImmerReducer } from "use-immer";

import { favoriteStorage } from "@storage";

type FavoriteState = {
  favoriteIds: number[];
};

type FavoriteAction = { type: "FAVORITE/ADDED"; payload: number } | { type: "FAVORITE/REMOVED"; payload: number };

type FavoriteContextType = {
  state: FavoriteState;
  dispatch: (action: FavoriteAction) => void;
};

const initialState: FavoriteState = {
  favoriteIds: favoriteStorage.getAllFavorites() || [],
};

const FavoriteContext = React.createContext<FavoriteContextType | undefined>(undefined);

function favoriteReducer(draft: FavoriteState, action: FavoriteAction) {
  switch (action.type) {
    case "FAVORITE/ADDED":
      favoriteStorage.addToFavorites(action.payload);
      draft.favoriteIds.push(action.payload);
      break;
    case "FAVORITE/REMOVED":
      favoriteStorage.removeFromFavoritesById(action.payload);
      const index = draft.favoriteIds.findIndex(id => id === action.payload);
      if (index !== -1) {
        draft.favoriteIds.splice(index, 1);
      }
      break;
    default:
      throw new Error("Unhandled action!");
  }
}

function FavoriteProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useImmerReducer(favoriteReducer, initialState);

  const value = { state, dispatch };
  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
}

const useFavorite = (): FavoriteContextType => {
  const context = React.useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }

  return context;
};

export { FavoriteProvider, useFavorite };
