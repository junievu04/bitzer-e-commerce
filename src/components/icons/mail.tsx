const Mail = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0.5C27.665 0.5 35.5 8.33502 35.5 18C35.5 27.665 27.665 35.5 18 35.5C8.33502 35.5 0.5 27.665 0.5 18C0.5 8.33502 8.33502 0.5 18 0.5Z"
        fill="#5A6274"
        stroke="#EFEFEF"
      />
      <mask
        id="mask0_1208_69"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="10"
        width="20"
        height="16"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 10H10C8.9 10 8.01 10.9 8.01 12L8 24C8 25.1 8.9 26 10 26H26C27.1 26 28 25.1 28 24V12C28 10.9 27.1 10 26 10ZM26 24H10V14L18 19L26 14V24ZM18 17L10 12H26L18 17Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1208_69)">
        <rect x="-7" y="-7" width="50" height="50" fill="white" />
        <mask
          id="mask1_1208_69"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-7"
          y="-7"
          width="50"
          height="50"
        >
          <rect x="-7" y="-7" width="50" height="50" fill="white" />
        </mask>
        <g mask="url(#mask1_1208_69)"></g>
      </g>
    </svg>
  );
};

export default Mail;
