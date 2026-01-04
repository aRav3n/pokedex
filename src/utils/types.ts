export type pokemonLimitedInfoType = {
  name: string;
  url: string;
};
type pokemonTypeParent = {
  slot: number;
  type: pokemonLimitedInfoType;
};

export type pokemonDetailedInfoType = {
  name: string;
  url: string;
  image: string;
  types: pokemonTypeParent[];
};

export type pokemonVeryDetailedInfoType = {
  imageUrl: string;
  number: number;
  name: string;
  genus: string;
  heightCm: number;
  weightKg: number;
  text: string;
  types: pokemonTypeParent[];
};

export type pokemonCardPropType = {
  pokemon: pokemonLimitedInfoType;
};
