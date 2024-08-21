import { FC } from 'react';

type ActiveAnimationProps = {
  active: string;
  heightAndWidth?: string;
  backgroundColour: string;
};

const ActiveAnimation: FC<ActiveAnimationProps> = ({
  active,
  heightAndWidth = 'h-8 w-8',
  backgroundColour = ''
}: ActiveAnimationProps) => {
  return (
    <div className="mx-auto flex h-full items-center justify-center space-x-2">
      <div
        className={`${heightAndWidth} ${active} rounded-full ${backgroundColour} [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`${heightAndWidth} ${active} rounded-full ${backgroundColour} [animation-delay:-0.15s]`}
      ></div>
      <div className={`${heightAndWidth} ${active} rounded-full ${backgroundColour}`}></div>
    </div>
  );
};

export default ActiveAnimation;
