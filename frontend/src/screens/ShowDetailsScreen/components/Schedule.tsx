import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Schedule as ScheduleProps } from "@services";
import { palette, spacing } from "@themes";
import { formatDays } from "@utils";

export function Schedule({ days, time }: ScheduleProps) {
  const scheduleString = React.useMemo(() => {
    let _string = "";

    if (time) {
      _string += `${time}h`;
    }

    if (time && days?.length > 0) {
      _string += " | ";
    }

    if (days && days.length > 0) {
      _string += formatDays(days);
    }

    if (days?.length === 0 && !time) {
      _string = "No content.";
    }

    return _string;
  }, [days, time]);

  return (
    <View style={styles.scheduleContainer}>
      <Text style={styles.schedule} accessibilityRole="text">
        Schedule
      </Text>
      <Text style={styles.scheduleInfo} accessibilityRole="text">
        {scheduleString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    width: "100%",
    marginBottom: spacing.s4,
  },
  schedule: {
    fontFamily: "Satoshi-Medium",
    color: palette.green,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  scheduleInfo: {
    fontFamily: "Satoshi-Medium",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
