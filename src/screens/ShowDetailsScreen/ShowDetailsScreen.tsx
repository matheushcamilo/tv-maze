import React from "react";
import { Button, StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { EmptyListMessage, LoadingOverlay, Screen } from "@components";
import { useShowDetails } from "@hooks";
import { StackRootParamList } from "@routes";
import { palette, spacing } from "@themes";

import { Genres } from "./components/Genres";
import { Schedule } from "./components/Schedule";
import { ShowDetailsImage } from "./components/ShowDetailsImage";
import { Summary } from "./components/Summary";
import { Title } from "./components/Title";

type ShowDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "ShowDetailsScreen">;

export function ShowDetailsScreen({ route, navigation }: ShowDetailsScreenProps) {
  const { showDetails, loading } = useShowDetails(route.params?.id);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  function navigateToEpisodesListScreen() {
    if (!route.params?.id) {
      return;
    }

    navigation.navigate("EpisodesListScreen", { id: route.params?.id });
  }

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  if (!showDetails) {
    return (
      <Screen canGoBack scrollable>
        <EmptyListMessage />
      </Screen>
    );
  }

  return (
    <Screen canGoBack scrollable>
      <ShowDetailsImage uri={showDetails?.image?.original} imageLoaded={imageLoaded} setImageLoaded={setImageLoaded} />

      <Title>{showDetails?.name}</Title>
      <Schedule days={showDetails?.schedule.days || []} time={showDetails?.schedule.time || ""} />
      <Genres genres={showDetails?.genres} />
      <Summary summary={showDetails?.summary || ""} />

      <View style={styles.buttonContainer}>
        <Button color={palette.greenDark} title="View Episodes by Season" onPress={navigateToEpisodesListScreen} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginTop: spacing.s36,
  },
});
