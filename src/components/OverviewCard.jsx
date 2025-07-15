import React from 'react'
import SplitText from '../animations/SplitText';

function OverviewCard({ label, value }) {
  return (
    <div className="bg-gray-700 p-4 rounded-xl text-center text-white shadow-md">
      <SplitText
        text={label}
        className="text-sm uppercase font-semibold text-gray-400"
        splitType="chars"
        delay={80}
        textAlign="center"
      />
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default OverviewCard;