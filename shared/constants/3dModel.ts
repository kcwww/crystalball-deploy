export const BASE = {
  DEFAULT: '/assets/bases/base.glb',
  ONE: '/assets/bases/base1.glb',
} as const;

export const BOTTOM = {
  DEFAULT: '/assets/bottoms/bottom.glb',
  ONE: '/assets/bottoms/bottom1.glb',
  TWO: '/assets/bottoms/bottom2.glb',
  THREE: '/assets/bottoms/bottom3.glb',
} as const;

export const DECO = {
  PRESENT: { name: '선물상자', fileName: '/assets/models/ribbonBox.glb' },
  FISHBREAD: { name: '붕어빵', fileName: '/assets/models/fishBread.glb' },
  GINGERBREAD: {
    name: '진저브레드',
    fileName: '/assets/models/gingerBread.glb',
  },
  CHEST: { name: '마크상자', fileName: '/assets/models/chest.glb' },
  DDONG: { name: '똥', fileName: '/assets/models/ddong.glb' },
  MINISNOWMAN: {
    name: '미니눈사람',
    fileName: '/assets/models/miniSnowMan.glb',
  },
  SOCKS: { name: '양말', fileName: '/assets/models/socks.glb' },
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
  DUCK: '/assets/sprites/bcduck.glb',
  GLASSES_DUCK: '/assets/sprites/bcduck_glasses.glb',
  SANTACLAUS: '/assets/sprites/santa.glb',
  SNOWMAN: '/assets/sprites/snowman.glb',
  TREE: '/assets/sprites/tree.glb',
  TUX: '/assets/sprites/tux.glb',
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
