import { SplashScreen, Stack } from "expo-router";

import { styles } from "../utils/styles";
import { useHeaderHeight } from "@react-navigation/elements";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: styles.headerGroup,
          headerTitleAlign: styles.headerTitleIndividual.textAlign,
          headerTitleStyle: styles.headerTitleGroup,
          headerTintColor: styles.headerTitleIndividual.color,
          title: "Pokédex",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.7],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
