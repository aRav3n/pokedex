// API instructions: https://pokeapi.co/docs/v2#pokemon-section
// Folder structure guide: https://expo.dev/blog/expo-app-folder-structure-best-practices#summary

import { FlatList, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";

import PokemonCard from "../components/pokemonCard";

import { pokemonLimitedInfo } from "../utils/types";
import { styles } from "../utils/styles";
import { generateMainCardSize } from "../utils/utilityFunctions";

const qtyOfPokemonToFetch = 151;

export default function Index() {
  const apiURL =
    "https://pokeapi.co/api/v2/pokemon/?limit=" + qtyOfPokemonToFetch;
  const [pokemonArray, setPokemonArray] = useState<pokemonLimitedInfo[]>([]);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);

  // get and set height and width of Index component
  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const indexHeight = height - headerHeight;
    const indexWidth = width;
    const { generatedCardHeight, generatedCardWidth } = generateMainCardSize(
      indexHeight,
      indexWidth,
    );
    setCardHeight(generatedCardHeight);
    setCardWidth(generatedCardWidth);
  }, [height, width, headerHeight]);

  // fetch the initial Pokémon array
  async function fetchPokemonArray() {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const results = data.results;

      setPokemonArray(results);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchPokemonArray();
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.mainFlexContainerContentStyle}
      data={pokemonArray}
      getItemLayout={(data, index) => ({
        length: cardHeight,
        offset: (cardHeight + 16) * index + 16,
        index,
      })}
      initialNumToRender={30}
      keyExtractor={(item) => item.name}
      maxToRenderPerBatch={10}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
        />
      )}
    />
  );
}
