import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  pokemonLimitedInfoType,
  pokemonVeryDetailedInfoType,
} from "../utils/types";

export default function Details() {
  const [pokemonInfo, setPokemonInfo] =
    useState<pokemonVeryDetailedInfoType | null>(null);

  const params: pokemonLimitedInfoType = useLocalSearchParams();

  const { height, width } = useWindowDimensions();

  console.log({ height, width });

  const urlArray = params.url.split("/");
  const pokemonNumber = urlArray[urlArray.length - 2];

  // Fetch info for this pokemon's pokedex page
  useEffect(() => {
    if (!pokemonInfo) {
      try {
        (async () => {
          const number = Number(pokemonNumber);

          const officialArtwork = "official-artwork";

          const ogResponse = await fetch(params.url);
          const ogData = await ogResponse.json();

          const name = ogData.name.toUpperCase();
          const heightCm = Number(ogData.height) * 10;
          const weightKg = Number(ogData.weight) / 10;
          const imageUrl = ogData.sprites.other[officialArtwork].front_default;
          const types = ogData.types;

          const moreDetailResponse = await fetch(ogData.species.url);
          const moreDetailData = await moreDetailResponse.json();

          const genus = moreDetailData.genera[7].genus
            .split(" ")[0]
            .toUpperCase();

          const textArray =
            moreDetailData.flavor_text_entries[28].flavor_text.split("\n");
          let text = textArray[0];
          for (let i = 1; i < textArray.length; i++) {
            text += " " + textArray[i];
          }

          const pokedexInfo = {
            imageUrl,
            number,
            name,
            genus,
            heightCm,
            weightKg,
            text,
            types,
          };

          setPokemonInfo(pokedexInfo);
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  console.log(pokemonInfo?.imageUrl);
  return (
    <ScrollView contentContainerStyle={{}}>
      <View>
        <View>
          <Image source={{ uri: pokemonInfo?.imageUrl }} />
        </View>
        <View></View>
      </View>
      <View></View>
    </ScrollView>
  );
}
