import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { LoadingOverlay, Screen } from "@components";
import { useEpisodeDetails } from "@hooks";
import { StackRootParamList } from "@routes";

import { EpisodeDetailsImage } from "./components/EpisodeDetailsImage";
import { Subtitle } from "./components/Subtitle";
import { Summary } from "./components/Summary";
import { Title } from "./components/Title";

type EpisodeDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "EpisodeDetailsScreen">;

export function EpisodeDetailsScreen({ route }: EpisodeDetailsScreenProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { episodeDetails, loading } = useEpisodeDetails(route.params?.episodeId);

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <Screen canGoBack scrollable>
      <EpisodeDetailsImage
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        uri={episodeDetails?.image?.original}
      />
      <Title>{episodeDetails?.name}</Title>
      <Subtitle season={episodeDetails?.season} number={episodeDetails?.number} />
      <Summary summary={episodeDetails?.summary || ""} />
    </Screen>
  );
}
