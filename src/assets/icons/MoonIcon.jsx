import React from 'react';

const MoonIcon = (props) => (
  <svg 
    width={props.width || "670"} 
    height={props.height || "563"} 
    viewBox="0 0 670 563" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dddd_283_48)">
      <path d="M240.92 548.675C209.922 548.767 179.208 542.261 150.534 529.527C121.86 516.793 95.7856 498.082 73.8008 474.461C51.816 450.84 34.3509 422.772 22.4027 391.861C10.4544 360.949 4.25708 327.798 4.16444 294.301C4.0718 260.805 10.0857 227.618 21.8627 196.636C33.6398 165.653 50.9493 137.483 72.8031 113.732C94.6569 89.9812 120.627 71.1154 149.23 58.2118C177.834 45.3083 208.511 38.6196 239.509 38.5277L240.215 293.601L240.92 548.675Z" fill="url(#paint0_linear_283_48)" fillOpacity="0.76"/>
    </g>
    <defs>
      <filter id="filter0_dddd_283_48" x="-18.5287" y="-84.0091" width="688.328" height="755.222" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="19.2882"/>
        <feGaussianBlur stdDeviation="20.9901"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0 0.117647 0 0 0 0.04 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_283_48"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="77.1528"/>
        <feGaussianBlur stdDeviation="38.5764"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0 0.117647 0 0 0 0.03 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_283_48" result="effect2_dropShadow_283_48"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="172.459"/>
        <feGaussianBlur stdDeviation="51.6243"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0 0.117647 0 0 0 0.02 0"/>
        <feBlend mode="normal" in2="effect2_dropShadow_283_48" result="effect3_dropShadow_283_48"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="306.342"/>
        <feGaussianBlur stdDeviation="61.2684"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.0431373 0 0 0 0 0.117647 0 0 0 0.01 0"/>
        <feBlend mode="normal" in2="effect3_dropShadow_283_48" result="effect4_dropShadow_283_48"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_283_48" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_283_48" x1="239.509" y1="38.5277" x2="241.022" y2="548.675" gradientUnits="userSpaceOnUse">
        <stop stopColor="#643D56" stopOpacity="0"/>
        <stop offset="0.9999" stopColor="#F2EFF1" stopOpacity="0.808077"/>
      </linearGradient>
    </defs>
  </svg>
);

export default MoonIcon;