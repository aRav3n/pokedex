import { StyleSheet } from "react-native";

import { pokemonDetailedInfoType, pokemonVeryDetailedInfoType } from "./types";

export const styles = StyleSheet.create({
  mainFlexContainerContentStyle: {
    alignContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 16,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  typeText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export function generateCustomStyle(
  pokemonInfo: pokemonDetailedInfoType | pokemonVeryDetailedInfoType,
  width: number | null
) {
  // credit: perplexity.ai
  const colorsByType = {
    normal: "#CCC1B6",
    fire: "#F4B397",
    water: "#A9D4F2",
    electric: "#FAE4B8",
    grass: "#C3E5B4",
    ice: "#BDE1E2",
    fighting: "#F0B8B3",
    poison: "#D4B8E2",
    ground: "#E0D3B0",
    flying: "#D0C8F2",
    psychic: "#F6C6D9",
    bug: "#D4E8A9",
    rock: "#D4C8A9",
    ghost: "#D0C8E0",
    dragon: "#D4C8F2",
    dark: "#C8C0B8",
    steel: "#E0E0E0",
    fairy: "#F6D4E8",
  };

  const bgColor = pokemonInfo?.types
    ? // @ts-ignore
      colorsByType[pokemonInfo.types[0].type.name]
    : "pink";

  const customStyle = StyleSheet.create({
    mainCard: {
      backgroundColor: bgColor,
      borderRadius: 20,
      padding: 20,
    },
  });

  return customStyle;
}
