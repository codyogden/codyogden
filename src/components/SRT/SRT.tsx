import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {}

const SRT: FC<Props> = ({
    children,
}) => {
    return <span
                css={{
                    border: 0,
                    clip: 'rect(1px, 1px 1px 1px)',
                    clipPath: 'inset(50%)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    width: 1,
                    wordWrap: 'normal',
                }}
            >
                {children}
            </span>
};

export default SRT;

/**
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
 */