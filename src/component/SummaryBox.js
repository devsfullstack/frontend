import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryBox = () => {
  const [totalACobrar, setTotalACobrar] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);

  useEffect(() => {
    // Función para obtener los datos desde el backend
    const fetchData = async () => {
      try {
        const responseACobrar = await axios.get('http://localhost:3001/api/totalACobrar');
        const responseAPagar = await axios.get('http://localhost:3001/api/totalAPagar');
        
        setTotalACobrar(responseACobrar.data.totalACobrar);
        setTotalAPagar(responseAPagar.data.totalAPagar);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  return (
    <div className="summary-box">
      <div className="summary-card">Total a Cobrar: {totalACobrar}</div>
      <div className="summary-card">Total a Pagar: {totalAPagar}</div>
    </div>
  );
};

export default SummaryBox;
