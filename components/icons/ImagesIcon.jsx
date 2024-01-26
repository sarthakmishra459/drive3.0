import * as React from "react";

function ImagesIcon({ fill = "#6C7281", ...rest }) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M12 4c1.38 0 2.5 1.12 2.5 2.5S13.38 9 12 9s-2.5-1.12-2.5-2.5S10.62 4 12 4zm0-2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM20 0H4a2 2 0 00-2 2v20a2 2 0 002 2h16a2 2 0 002-2V2a2 2 0 00-2-2zm-1 19H5V1h14v2.72l-2.77 2.77c-.05.05-.11.11-.16.16L12 8.41l-4.7-4.7c-.05-.05-.11-.11-.16-.16L4 3.72V19h15V19z"
                fill={fill}
            />
        </svg>
    );
}

export default ImagesIcon;
