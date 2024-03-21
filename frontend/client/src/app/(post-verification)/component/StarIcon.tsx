import React, { SVGProps } from "react";
import theme from "@/styles/theme/theme";

interface SvgComponentProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const StarIcon: React.FC<SvgComponentProps> = ({color, ...props}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        viewBox="0 -960 960 960"
        {...props}
    >
        <path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"
            fill={color || theme.lightGray}/>
    </svg>
)
export default StarIcon
