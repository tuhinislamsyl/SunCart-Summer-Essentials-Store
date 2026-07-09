'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function HeroAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch a free summer-themed animation from Lottie CDN
    fetch('https://lottie.host/b3ae94a5-b6cc-4ef4-b1f9-0c2d3a4c5e6f/K7pq5E5z9l.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.log('Animation load error:', err));
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-full h-[400px]">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true}
        className="w-full h-full"
      />
    </div>
  );
}
