import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import {
  pokemonCardProp,
  pokemonDetailedInfo,
  pokemonLimitedInfo,
} from "../utils/types";
import { generateCustomStyle, styles } from "../utils/styles";
import { capitalizeWords } from "../utils/utilityFunctions";

export default function PokemonCard({
  pokemon,
  cardHeight,
  cardWidth,
}: pokemonCardProp) {
  const blankPokemonDetailObject = {
    name: "",
    url: "",
    image: "",
    types: [],
  };
  const [detailedPokemonInfo, setDetailedPokemonInfo] =
    useState<pokemonDetailedInfo>(blankPokemonDetailObject);

  async function fetchDetails(pokemonToFetch: pokemonLimitedInfo) {
    try {
      const response = await fetch(pokemonToFetch.url);
      const data = await response.json();
      const image = data.sprites.front_default;
      const types = data.types;

      const pokemonWithDetails = { ...pokemonToFetch, image, types };
      const newName = capitalizeWords(pokemonWithDetails.name);
      pokemonWithDetails.name = newName;

      for (let i = 0; i < pokemonWithDetails.types.length; i++) {
        const newTypeName = capitalizeWords(
          pokemonWithDetails.types[i].type.name,
        );
        pokemonWithDetails.types[i].type.name = newTypeName;
      }

      setDetailedPokemonInfo(pokemonWithDetails);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDetails(pokemon);
  }, []);

  if (detailedPokemonInfo.name !== "") {
    const customStyle = generateCustomStyle(
      detailedPokemonInfo,
      cardHeight,
      cardWidth,
    );

    return (
      <Link
        href={{
          pathname: "/details",
          params: {
            name: detailedPokemonInfo.name,
            url: detailedPokemonInfo.url,
          },
        }}
      >
        <View style={customStyle.mainCard}>
          <Text style={styles.nameText}>{pokemon.name}</Text>
          {detailedPokemonInfo.types && (
            <Text style={styles.typeText}>
              {detailedPokemonInfo.types[0].type.name}
            </Text>
          )}
          {detailedPokemonInfo.image && (
            <Image
              source={{ uri: detailedPokemonInfo.image }}
              style={customStyle.mainCardImage}
            />
          )}
        </View>
      </Link>
    );
  }
  return null;
}
