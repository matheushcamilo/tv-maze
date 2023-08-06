import { NavigatorScreenParams } from "@react-navigation/native";

export type StackRootParamList = {
  DrawerNavigator: NavigatorScreenParams<DrawerRootParamList>;
  ShowDetailsScreen: undefined | { showId: number };
  EpisodesListScreen: undefined | { seasonId: number };
  EpisodeDetailsScreen: undefined | { episodeId: number };
  SeasonsScreen: undefined | { seasonId: number };
};

export type DrawerRootParamList = {
  HomeScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRootParamList {}
  }
}
