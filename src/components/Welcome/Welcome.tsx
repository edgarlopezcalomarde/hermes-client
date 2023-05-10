import React from 'react';

interface WelcomeProps {
  motto: string;
  welcometext: string;
}

function Welcome({ motto, welcometext }: WelcomeProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold">👋 {welcometext}</h1>
      <h2 className="text-2xl font-semibold">{motto}</h2>
    </div>
  );
}

export default Welcome;
