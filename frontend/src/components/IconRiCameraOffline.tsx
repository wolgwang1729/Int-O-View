import * as React from "react";

// By: ri
// See: https://v0.app/icon/ri/camera-off-line
// Example: <IconRiCameraOffLine width="24px" height="24px" style={{color: "#000000"}} />

export const IconRiCameraOffLine = ({
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
      d="M19.586 21H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h.586L1.394 2.808l1.414-1.415l19.799 19.8l-1.415 1.414zm-14-14H4v12h13.586l-2.18-2.18A5.5 5.5 0 0 1 7.68 9.094zm3.525 3.525a3.5 3.5 0 0 0 4.865 4.865zM22 17.785l-2-2V7h-3.83l-2-2H9.83l-.308.307l-1.414-1.414L9 3h6l2 2h4a1 1 0 0 1 1 1zM11.262 7.05a5.5 5.5 0 0 1 6.188 6.188L15.112 10.9A3.515 3.515 0 0 0 13.6 9.388z"
    />
  </svg>
);
