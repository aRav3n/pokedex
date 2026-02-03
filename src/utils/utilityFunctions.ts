import { pokemonTypeType } from "./types";

function asPokemonType(typeName: string) {
  return typeName as pokemonTypeType;
}

function capitalizeWords(stringOrWordsToCapitalize: string) {
  function capitalizeIndividualWord(word: string) {
    const firstChar = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    const newlyCapitalizedWord = firstChar + restOfWord;
    return newlyCapitalizedWord;
  }

  const wordsArray = stringOrWordsToCapitalize.split(" ");
  let newlyCapitalizedString = "";
  for (let i = 0; i < wordsArray.length; i++) {
    const newlyCapitalizedWord = capitalizeIndividualWord(wordsArray[i]);
    if (i > 0) {
      newlyCapitalizedString += " ";
    }
    newlyCapitalizedString += newlyCapitalizedWord;
  }

  const dashSplitArray = stringOrWordsToCapitalize.split("-");
  if (dashSplitArray.length > 1) {
    newlyCapitalizedString = capitalizeIndividualWord(dashSplitArray[0]);
    for (let i = 1; i < dashSplitArray.length; i++) {
      const capitalizedSection = capitalizeIndividualWord(dashSplitArray[i]);
      newlyCapitalizedString += "-" + capitalizedSection;
    }
  }

  return newlyCapitalizedString;
}

function generateMainCardSize(indexHeight: number, indexWidth: number) {
  const generatedCardWidth = Math.min(indexWidth * 0.4, 200);
  const generatedCardHeight = Math.max(
    generatedCardWidth,
    Math.min(300, indexHeight * 0.3),
  );
  return { generatedCardHeight, generatedCardWidth };
}

export { asPokemonType, capitalizeWords, generateMainCardSize };
