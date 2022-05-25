import { format } from 'date-fns';
import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTimeElement> {
    dateTime: string;
}

const FormatDate: FC<Props> = ({
    dateTime,
}) => {
    return <time dateTime={dateTime}>{format(new Date(dateTime), 'd LLLL yyyy')}</time>
};

export default FormatDate;
