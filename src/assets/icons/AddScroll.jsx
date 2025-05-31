import React from 'react';

const AddScroll = (props) => (
  <svg 
    width={props.width || "49"} 
    height={props.height || "224"} 
    viewBox="0 0 49 224" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M9.27775 107.272C9.27775 109.918 7.31218 112.063 4.88753 112.063C2.46288 112.063 0.497314 109.918 0.497314 107.272C0.497314 104.626 2.46288 102.481 4.88753 102.481C7.31218 102.481 9.27775 104.626 9.27775 107.272ZM2.78753 107.272C2.78753 108.538 3.72773 109.564 4.88753 109.564C6.04733 109.564 6.98753 108.538 6.98753 107.272C6.98753 106.006 6.04733 104.98 4.88753 104.98C3.72773 104.98 2.78753 106.006 2.78753 107.272Z" 
      fill="#D9D9D9" 
      fillOpacity="0.67"
    />
    <ellipse 
      cx="3.29266" 
      cy="3.5935" 
      rx="3.29266" 
      ry="3.5935" 
      transform="matrix(1 0 0 -1 15.863 50.9738)" 
      fill="#D9D9D9" 
      fillOpacity="0.67"
    />
    <ellipse 
      cx="3.29266" 
      cy="3.5935" 
      rx="3.29266" 
      ry="3.5935" 
      transform="matrix(1 0 0 -1 15.863 170.757)" 
      fill="#D9D9D9" 
      fillOpacity="0.67"
    />
    <ellipse 
      cx="3.29266" 
      cy="3.59351" 
      rx="3.29266" 
      ry="3.59351" 
      transform="matrix(1 0 0 -1 42.2043 223.462)" 
      fill="#D9D9D9" 
      fillOpacity="0.67"
    />
    <ellipse 
      cx="3.29266" 
      cy="3.5935" 
      rx="3.29266" 
      ry="3.5935" 
      transform="matrix(1 0 0 -1 38.9116 7.85175)" 
      fill="#D9D9D9" 
      fillOpacity="0.67"
    />
  </svg>
);

export default AddScroll;