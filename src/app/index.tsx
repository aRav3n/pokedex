// API instructions: https://pokeapi.co/docs/v2#pokemon-section
// Folder structure guide: https://expo.dev/blog/expo-app-folder-structure-best-practices#summary

import { ScrollView } from "react-native";
import { useEffect, useState } from "react";

import PokemonCard from "../components/pokemonCard";

import { pokemonLimitedInfoType } from "../utils/types";
import { styles } from "../utils/styles";

const qtyOfPokemonToFetch = 20;

export default function Index() {
  const apiURL =
    "https://pokeapi.co/api/v2/pokemon/?limit=" + qtyOfPokemonToFetch;
  const [pokemonArray, setPokemonArray] = useState<pokemonLimitedInfoType[]>(
    []
  );

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

  // call fetchPokemonArray()
  useEffect(() => {
    fetchPokemonArray();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.mainFlexContainerContentStyle}>
      {pokemonArray.map((pokemon: pokemonLimitedInfoType) => {
        return <PokemonCard pokemon={pokemon} key={pokemon.name} />;
      })}
    </ScrollView>
  );
}
