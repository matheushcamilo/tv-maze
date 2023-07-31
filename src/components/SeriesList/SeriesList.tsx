import React from "react";
import { FlatList, ListRenderItem } from "react-native";

import { EmptyListMessage } from "@components";
import { Show } from "@services";

import { SeriesItem } from "../SeriesItem/SeriesItem";

type SeriesListProps = {
  shows: Show[];
};

export function SeriesList({ shows }: SeriesListProps) {
  const flatListRef = React.useRef<FlatList>(null);

  const renderItem: ListRenderItem<Show> = ({ item }) => {
    return (
      <SeriesItem
        showId={item?.id}
        image={item?.image?.medium || ""}
        name={item?.name}
        rating={item?.rating?.average}
        language={item?.language}
        status={item?.status}
      />
    );
  };

  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [shows]);

  return (
    <FlatList
      ref={flatListRef}
      data={shows}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyListMessage />}
    />
  );
}
