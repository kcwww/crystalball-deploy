'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Chrome, ColorResult } from '@uiw/react-color';
import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import { DECO_TYPE } from '@/shared/constants/3dModel';
import { DecorationType } from '@/shared/types/model';

const ColorButton = ({ type }: { type: DecorationType }) => {
  const { setModelColor, setBottomColor, modelColor, bottomColor } =
    use3DModel();

  const handleColorChange = (color: ColorResult) => {
    if (type === DECO_TYPE.MAIN) {
      setModelColor({ modelColor: color.hex });
    } else if (type === DECO_TYPE.BOTTOM) {
      setBottomColor({ bottomColor: color.hex });
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        색상 변경
      </PopoverTrigger>
      <PopoverContent className="pointer-events-auto flex items-center justify-center">
        <Chrome
          color={type === DECO_TYPE.MAIN ? modelColor : bottomColor}
          onChange={(color) => handleColorChange(color)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ColorButton;
