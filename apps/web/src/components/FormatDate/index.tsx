import { format } from 'date-fns';
import { FC, HTMLAttributes, useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLTimeElement> {
    dateTime: string;
}

const FormatDate: FC<Props> = ({
    dateTime,
    className,
}) => {
    const date = useMemo(() => format(new Date(dateTime), 'd LLLL yyyy'), [dateTime]);
    return <time className={className} dateTime={dateTime}>{date}</time>
};

export default FormatDate;
