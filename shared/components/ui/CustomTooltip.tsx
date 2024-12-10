'use client';

import { Button } from '@/components/ui/button';
import { TooltipRenderProps } from 'react-joyride';

const CustomTooltip = (props: TooltipRenderProps) => {
  const {
    backProps,
    continuous,
    index,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
  } = props;

  const content = step.content as string;

  return (
    <>
      <div
        className="flex flex-col gap-4 rounded-lg bg-white p-4"
        {...tooltipProps}
        style={{ zIndex: 999, maxWidth: '300px' }}
      >
        <div className="p-2">
          {content.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" {...skipProps}>
            {skipProps.title}
          </Button>
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="outline" {...backProps}>
                {backProps.title}
              </Button>
            )}
            {continuous && (
              <Button {...primaryProps}>
                {primaryProps.title === 'Last' ? 'Finish' : primaryProps.title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTooltip;
