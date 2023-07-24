import { NavigatorScreenParams } from "@react-navigation/native";

export type StackRootParamList = {
  DrawerNavigator: NavigatorScreenParams<DrawerRootParamList>;
  ShowDetailsScreen: undefined | { id: number };
  EpisodesListScreen: undefined | { id: number };
  EpisodeDetailsScreen: undefined | { id: number };
};

export type DrawerRootParamList = {
  ShowScreen: undefined;
  FavoriteScreen: undefined | { id: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRootParamList {}
  }
}
