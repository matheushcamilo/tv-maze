import React from "react";
import type { PropsWithChildren } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

type Options = Parameters<typeof render>[1];

function AllTheProviders({ children }: PropsWithChildren) {
  return <NavigationContainer>{children}</NavigationContainer>;
}

const customRender = (ui: React.ReactElement, options?: Omit<Options, "wrapper">) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
