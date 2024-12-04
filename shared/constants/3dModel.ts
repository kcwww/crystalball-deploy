export const BASE = {
  DEFAULT: '/assets/bases/base.glb',
  ONE: '/assets/bases/base1.glb',
} as const;

export const BOTTOM = {
  DEFAULT: { id: 0, name: '기본', path: '/assets/bottoms/bottom.glb' },
  ONE: { id: 1, name: '눈', path: '/assets/bottoms/bottom1.glb' },
  TWO: { id: 2, name: '수풀', path: '/assets/bottoms/bottom2.glb' },
  THREE: { id: 3, name: '나무', path: '/assets/bottoms/bottom3.glb' },
} as const;

export const DECO = {
  PRESENT: {
    id: 1,
    name: '선물상자',
    fileName: '/assets/models/ribbonBox.glb',
  },
  FISHBREAD: {
    id: 2,
    name: '붕어빵',
    fileName: '/assets/models/fishBread.glb',
  },
  GINGERBREAD: {
    id: 3,
    name: '진저브레드',
    fileName: '/assets/models/gingerBread.glb',
  },
  CHEST: { id: 4, name: '마크상자', fileName: '/assets/models/chest.glb' },
  DDONG: { id: 5, name: '똥', fileName: '/assets/models/ddong.glb' },
  MINISNOWMAN: {
    id: 6,
    name: '미니눈사람',
    fileName: '/assets/models/miniSnowMan.glb',
  },
  SOCKS: { id: 7, name: '양말', fileName: '/assets/models/socks.glb' },
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
  DUCK: { id: 1, name: '오리', path: '/assets/sprites/bcduck.glb' },
  GLASSES_DUCK: {
    id: 2,
    name: '안경오리',
    path: '/assets/sprites/bcduck_glasses.glb',
  },
  SANTACLAUS: { id: 3, name: '산타클로스', path: '/assets/sprites/santa.glb' },
  SNOWMAN: { id: 4, name: '눈사람', path: '/assets/sprites/snowman.glb' },
  TREE: { id: 5, name: '크리스마스트리', path: '/assets/sprites/tree.glb' },
  TUX: { id: 6, name: '펭귄', path: '/assets/sprites/tux.glb' },
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
