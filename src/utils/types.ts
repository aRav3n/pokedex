export type pokemonTypeType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type typeObject = {
  name: pokemonTypeType;
  url: string;
};

type typeParent = {
  slot: number;
  type: typeObject;
};

export type pokemonDetailedInfo = {
  name: string;
  url: string;
  image: string;
  types: typeParent[];
};

export type pokemonVeryDetailedInfo = {
  backgroundColor: string;
  imageUrl: string;
  number: number;
  name: string;
  genus: string;
  heightCm: number;
  weightKg: number;
  text: string;
  types: typeParent[];
};

export type pokemonLimitedInfo = {
  name: string;
  url: string;
};

export type pokemonCardProp = {
  pokemon: pokemonLimitedInfo;
  cardHeight: number | null;
  cardWidth: number | null;
};
