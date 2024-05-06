import React from 'react';

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
}

const CustomMarker: React.FC<MarkerProps> = ({ lat, lng, text }) => (
  <div style={{ color: 'white', background: 'red', padding: '10px 15px', borderRadius: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' ,textAlign: 'center', fontSize: '14px', fontWeight: 'bold' ,userSelect: 'none', cursor: 'default', whiteSpace: 'nowrap'}}>
    {text}
  </div>
);

export default CustomMarker;
