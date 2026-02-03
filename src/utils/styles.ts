import { StyleSheet } from "react-native";

import {
  pokemonDetailedInfo,
  pokemonVeryDetailedInfo,
  pokemonTypeType,
} from "./types";
import { asPokemonType } from "./utilityFunctions";

const pokedexEntryTextSize = 24;

export const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  centeredText: {
    alignSelf: "center",
    padding: 12,
  },
  closeText: {
    flexDirection: "row",
  },
  headerGroup: {
    backgroundColor: "#399494",
    borderBottomWidth: 0,
    display: "flex",
    flexDirection: "row",
  },
  headerTitleGroup: {
    fontSize: 32,
    justifyContent: "center",
  },
  headerTitleIndividual: {
    color: "#ffffff",
    textAlign: "center",
  },
  mainFlexContainerContentStyle: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#62d5b488",
    gap: 16,
    padding: 16,
  },
  nameText: {
    flexGrow: 1,
    fontSize: pokedexEntryTextSize * 0.8,
    fontWeight: "bold",
    textAlign: "center",
  },
  pokedexHeaderDetailText: {
    fontSize: pokedexEntryTextSize * 0.8,
    alignContent: "flex-end",
  },
  pokedexHeaderText: {
    fontSize: pokedexEntryTextSize * 1.25,
    textAlign: "left",
  },
  pokedexInfoText: {
    alignSelf: "center",
    fontSize: pokedexEntryTextSize,
    padding: 12,
    textAlign: "left",
  },
  pokedexImageParent: {
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
  pokedexTopInfoParent: {
    justifyContent: "space-between",
  },
  spreadOutText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeText: {
    flexGrow: 1,
    fontSize: pokedexEntryTextSize * 0.7,
    textAlign: "center",
  },
});

export function generateCustomStyle(
  pokemonInfo: pokemonDetailedInfo | pokemonVeryDetailedInfo,
  cardHeight: number | null,
  cardWidth: number | null,
) {
  // credit: perplexity.ai
  const colorsByType: Record<pokemonTypeType, string> = {
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

  const lowerCaseTypeName = asPokemonType(
    pokemonInfo.types[0].type.name.toLowerCase(),
  );

  const bgColor = colorsByType[lowerCaseTypeName] ?? "pink";

  const imageDims =
    cardHeight && cardWidth ? Math.min(cardHeight, cardWidth) * 0.5 : 100;

  const customStyle = StyleSheet.create({
    mainCard: {
      alignContent: "stretch",
      alignItems: "center",
      backgroundColor: bgColor,
      borderColor: "#00000044",
      borderRadius: 20,
      borderWidth: 2,
      height: cardHeight,
      padding: 20,
      width: cardWidth,
    },
    mainCardImage: {
      flexGrow: 3,
      flexShrink: 1,
      height: imageDims,
      width: imageDims,
    },
    pokedexTopParent: {
      backgroundColor: bgColor,
      borderBottomColor: "#000000",
      borderBottomWidth: 4,
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 12,
    },
  });

  return customStyle;
}
