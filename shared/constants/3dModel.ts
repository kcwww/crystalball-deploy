export const BASE = {
  DEFAULT: '/assets/bases/base.glb',
  ONE: '/assets/bases/base1.glb',
} as const;

export const BOTTOM = {
  DEFAULT: { name: 'default', path: '/assets/bottoms/bottom.glb' },
  ONE: { name: 'snow', path: '/assets/bottoms/bottom1.glb' },
  TWO: { name: 'grass', path: '/assets/bottoms/bottom2.glb' },
  THREE: { name: 'tree', path: '/assets/bottoms/bottom3.glb' },
} as const;

export const DECO = {
  LUCKY_CAT: { name: 'luckyCat', path: '/assets/models/luckyCat.glb' },
  MILK_COOKIE: { name: 'milkCookie', path: '/assets/models/milkCookie.glb' },
  MINI_SANTA: { name: 'miniSanta', path: '/assets/models/miniSanta.glb' },
  SANTA_CAT: { name: 'santaCat', path: '/assets/models/santaCat.glb' },
  PRESENT: {
    name: 'giftBox',
    path: '/assets/models/ribbonBox.glb',
  },
  FISHBREAD: {
    name: 'fishBread',
    path: '/assets/models/fishBread.glb',
  },
  GINGERBREAD: {
    name: 'gingerBread',
    path: '/assets/models/gingerBread.glb',
  },
  CHEST: { name: 'chest', path: '/assets/models/chest.glb' },
  DDONG: { name: 'poop', path: '/assets/models/ddong.glb' },
  MINISNOWMAN: {
    name: 'miniSnowMan',
    path: '/assets/models/miniSnowMan.glb',
  },
  SOCKS: { name: 'socks', path: '/assets/models/socks.glb' },
} as const;

export const SENTIMENT = {
  positive: '/assets/flakes/heart.glb',
  neutral: '/assets/flakes/star.glb',
  negative: '/assets/flakes/water.glb',
} as const;

export type Sentiment = keyof typeof SENTIMENT;

export const GROUND = {
  WINTER: '/assets/grounds/winter.glb',
} as const;

export const MAIN_DECORATION = {
  BANANA_CAT: { name: 'bananaCat', path: '/assets/sprites/bananaCat.glb' },
  DUCK: { name: 'duck', path: '/assets/sprites/bcduck.glb' },
  GLASSES_DUCK: {
    name: 'glassesDuck',
    path: '/assets/sprites/bcduck_glasses.glb',
  },
  SANTACLAUS: { name: 'santaclaus', path: '/assets/sprites/santaclaus.glb' },
  SNOWMAN: { name: 'snowMan', path: '/assets/sprites/snowman.glb' },
  TREE: { name: 'tree', path: '/assets/sprites/tree.glb' },
  TUX: { name: 'tux', path: '/assets/sprites/tux.glb' },
} as const;

export const SNOW_FLAKE = {
  ONE: '/assets/flakes/snowFlake01.glb',
  TWO: '/assets/flakes/snowFlake02.glb',
  THREE: '/assets/flakes/snowFlake03.glb',
} as const;

export const DECO_TYPE = {
  MAIN: 'MainDeco',
  SUB: 'SubDeco',
  BASE: 'Base',
  BOTTOM: 'Bottom',
} as const;

export const ETC = {
  NEW: '/assets/etcs/new.glb',
} as const;

export const ENVIRONMENTS = {
  MOON: '/assets/environments/moon.glb',
  TREE: '/assets/environments/spruce.glb',
  HOUSE: '/assets/environments/house.glb',
} as const;
