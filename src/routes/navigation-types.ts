import { NavigatorScreenParams } from "@react-navigation/native";

export type StackRootParamList = {
  DrawerNavigator: NavigatorScreenParams<DrawerRootParamList>;
  ShowDetailsScreen: undefined;
  EpisodeDetailsScreen: undefined;
};

export type DrawerRootParamList = {
  ShowScreen: undefined;
  FavoriteScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRootParamList {}
  }
}
