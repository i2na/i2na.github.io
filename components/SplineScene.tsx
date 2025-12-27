import React, { useState } from 'react';

const SplineScene: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Loading Overlay */}
        {isLoading && (
            <div className="absolute inset-0 bg-brand-black flex items-center justify-center z-10 transition-opacity duration-700">
                <div className="animate-pulse text-brand-purple font-mono text-xl">Initializing 3D Environment...</div>
            </div>
        )}
      
      {/* 
        The iframe from Spline. 
        pointer-events-auto allows interaction with the robot.
      */}
      <iframe 
        src='https://my.spline.design/robotfollowcursorforlandingpagemc-JznlTrxysZWVnpptAFSN4EAP/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className={`w-full h-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        title="Spline 3D Robot"
      />
      
      {/* Overlay gradient to blend iframe into the dark theme at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />
    </div>
  );
};

export default SplineScene;