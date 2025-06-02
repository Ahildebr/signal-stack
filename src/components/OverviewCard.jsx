import React from 'react'

const OverviewCard = ({label, value}) => {
    return (
    <div>
    <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
    </div>
  )
}

export default OverviewCard