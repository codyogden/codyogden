import { FC, HTMLAttributes } from 'react';

const SRT: FC<HTMLAttributes<HTMLSpanElement>> = ({
   children
}) => <span
         css={{
            border: 0,
            clip: 'rect(1px, 1px, 1px, 1px)',
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
      </span>;
export default SRT;
