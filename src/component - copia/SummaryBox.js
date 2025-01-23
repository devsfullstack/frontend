import React from 'react';

const SummaryBox = () => {
  const totalACobrar = 3000;
  const totalAPagar = 1500;

  return (
    <div className="summary-box">
      <div className="summary-card">Total a Cobrar: {totalACobrar}</div>
      <div className="summary-card">Total a Pagar: {totalAPagar}</div>
    </div>
  );
};

export default SummaryBox;
