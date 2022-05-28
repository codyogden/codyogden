import { format, parseISO } from 'date-fns';
import { FC, HTMLAttributes, useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLTimeElement> {
    dateTime: string;
}

const FormatDate: FC<Props> = ({
    dateTime,
    className,
}) => {
    const date = useMemo(() => {
        const date_iso = new Date(parseISO(dateTime));
        const display = format(date_iso, 'd LLLL yyyy');
        const dateTimeFmt = format(date_iso, 'yyyy-mm-d');
        return {
            date_iso,
            display,
            dateTimeFmt,
        }
    }, [dateTime]);
    return <time className={className} dateTime={date.dateTimeFmt}>{date.display}</time>
};

export default FormatDate;
