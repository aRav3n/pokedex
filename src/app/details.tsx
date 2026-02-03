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

import { pokemonLimitedInfo, pokemonVeryDetailedInfo } from "../utils/types";
import { generateCustomStyle, styles } from "../utils/styles";

export default function Details() {
  const [pokemonInfo, setPokemonInfo] =
    useState<pokemonVeryDetailedInfo | null>(null);

  const colorsApiBaseUrl = "https://www.csscolorsapi.com/api/colors/";

  const params: pokemonLimitedInfo = useLocalSearchParams();

  const { height, width } = useWindowDimensions();

  const widthOfPokedexEntry = Math.min(width, 600);

  const imageDims = Math.min(widthOfPokedexEntry * 0.2, height * 0.2);

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

          const backgroundColorString = moreDetailData.color.name;
          const colorRes = await fetch(
            colorsApiBaseUrl + backgroundColorString,
          );
          const colorData = await colorRes.json();

          const backgroundColor = `#${colorData.data.hex}22`;
          console.log(backgroundColor);

          const pokedexInfo = {
            imageUrl,
            number,
            name,
            genus,
            heightCm,
            weightKg,
            text,
            types,
            backgroundColor,
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

  const customStyle = generateCustomStyle(
    pokemonInfo,
    widthOfPokedexEntry,
    imageDims,
  );

  return (
    <>
      <Stack.Screen options={{ title: params.name }} />
      <ScrollView style={{ backgroundColor: pokemonInfo.backgroundColor }}>
        <View style={customStyle.pokedexTopParent}>
          <View style={styles.pokedexImageParent}>
            <Image
              style={{ width: imageDims, height: imageDims }}
              source={{ uri: pokemonInfo?.imageUrl }}
            />
            {pokemonInfo?.number ? (
              <Text style={styles.spreadOutText}>
                <Text style={[styles.boldText, styles.pokedexHeaderText]}>
                  No.{" "}
                </Text>
                <Text style={[styles.boldText, styles.pokedexHeaderText]}>
                  {pokemonInfo.number.toString().padStart(3, "0")}
                </Text>
              </Text>
            ) : null}
          </View>
          <View style={styles.pokedexTopInfoParent}>
            <Text style={[styles.boldText, styles.pokedexHeaderText]}>
              {pokemonInfo?.name}
            </Text>
            <Text style={styles.pokedexHeaderText}>{pokemonInfo?.genus}</Text>
            <View style={styles.spreadOutText}>
              <Text style={styles.pokedexHeaderText}>HT</Text>
              <View style={styles.closeText}>
                <Text style={[styles.boldText, styles.pokedexHeaderText]}>
                  {pokemonInfo?.heightCm}
                </Text>
                <Text style={styles.pokedexHeaderDetailText}>cm</Text>
              </View>
            </View>
            <View style={styles.spreadOutText}>
              <Text style={styles.pokedexHeaderText}>WT</Text>
              <View style={styles.closeText}>
                <Text style={[styles.boldText, styles.pokedexHeaderText]}>
                  {pokemonInfo?.weightKg}
                </Text>
                <Text style={styles.pokedexHeaderDetailText}>kg</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text style={[styles.pokedexInfoText]}>{pokemonInfo?.text}</Text>
        </View>
      </ScrollView>
    </>
  );
}
