import * as React from "react";

// By: ri
// See: https://v0.app/icon/ri/mic-off-line
// Example: <IconRiMicOffLine width="24px" height="24px" style={{color: "#000000"}} />

export const IconRiMicOffLine = ({
  height = "1em",
  fill = "currentColor",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      d="m16.425 17.839l4.767 4.768l1.415-1.415l-19.8-19.799l-1.413 1.415L7 8.414V10a5 5 0 0 0 6.39 4.804l1.55 1.55A7.002 7.002 0 0 1 5.07 11H3.056A9.004 9.004 0 0 0 11 18.945V23h2v-4.055a8.941 8.941 0 0 0 3.425-1.106m-4.872-4.872a3.002 3.002 0 0 1-2.52-2.52zm7.822 2.193l-1.443-1.442c.509-.81.856-1.73.997-2.718h2.016a8.949 8.949 0 0 1-1.57 4.16m-2.91-2.909l-1.548-1.548A2.96 2.96 0 0 0 15 10V6a3 3 0 0 0-5.818-1.032L7.686 3.471A5 5 0 0 1 17 6v4c0 .81-.192 1.575-.534 2.251"
    />
  </svg>
);
