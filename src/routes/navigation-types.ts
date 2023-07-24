import { NavigatorScreenParams } from "@react-navigation/native";

import { WeekDays, Episode } from "@services";

export type StackRootParamList = {
  DrawerNavigator: NavigatorScreenParams<DrawerRootParamList>;
  ShowDetailsScreen: undefined;
  EpisodeDetailsScreen: undefined;
};

export type DrawerRootParamList = {
  ShowScreen: undefined;
  FavoriteScreen: undefined | { show: FavoriteScreenProps };
};

export type FavoriteScreenProps = {
  id: number;
  name: string;
  poster: string;
  schedule: {
    time: string;
    days: WeekDays[];
  };
  genres: string[];
  summary: string;
  episodes: Episode[];
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRootParamList {}
  }
}
