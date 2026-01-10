import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import {
  pokemonLimitedInfoType,
  pokemonVeryDetailedInfoType,
} from "../utils/types";
import { generateCustomStyle, styles } from "../utils/styles";

export default function Details() {
  const [pokemonInfo, setPokemonInfo] =
    useState<pokemonVeryDetailedInfoType | null>(null);

  const params: pokemonLimitedInfoType = useLocalSearchParams();

  const { width } = useWindowDimensions();

  const widthOfPokedexEntry = Math.min(width, 600);

  const imageDims = widthOfPokedexEntry * 0.2;

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

          let text;

          for (let i = 0; i < moreDetailData.flavor_text_entries.length; i++) {
            const textEntry = moreDetailData.flavor_text_entries[i];

            if (
              textEntry.language.name === "en" &&
              textEntry.version.name === "red"
            ) {
              const textArray = textEntry.flavor_text.split(/[\n\u000c]/);
              let tempText = textArray[0];
              for (let i = 1; i < textArray.length; i++) {
                tempText += " " + textArray[i];
              }
              text = tempText;
            }
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

  if (!pokemonInfo) {
    return null;
  }

  const customStyle = generateCustomStyle(pokemonInfo, widthOfPokedexEntry);

  return (
    <>
      <Stack.Screen options={{ title: params.name }} />
      <ScrollView>
        <View style={customStyle.pokedexTopParent}>
          <View style={styles.pokedexImageParent}>
            <Image
              style={{ width: imageDims, height: imageDims }}
              source={{ uri: pokemonInfo?.imageUrl }}
            />
            {pokemonInfo?.number ? (
              <Text style={styles.spreadOutText}>
                <Text style={styles.boldText}>No. </Text>
                <Text style={styles.boldText}>
                  {pokemonInfo.number.toString().padStart(3, "0")}
                </Text>
              </Text>
            ) : null}
          </View>
          <View style={styles.pokedexTopInfoParent}>
            <Text>{pokemonInfo?.name}</Text>
            <Text>{pokemonInfo?.genus}</Text>
            <View style={styles.spreadOutText}>
              <Text>HT</Text>
              <View style={styles.closeText}>
                <Text style={styles.boldText}>{pokemonInfo?.heightCm}</Text>
                <Text>cm</Text>
              </View>
            </View>
            <View style={styles.spreadOutText}>
              <Text>WT</Text>
              <View style={styles.closeText}>
                <Text style={styles.boldText}>{pokemonInfo?.weightKg}</Text>
                <Text>kg</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.centeredText}>{pokemonInfo?.text}</Text>
        </View>
      </ScrollView>
    </>
  );
}
