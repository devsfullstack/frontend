import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SalesList = ({ sales }) => {
  return (
    <List>
      {sales.map(sale => (
        <ListItem key={sale.id}>
          <ListItemText primary={`${sale.product} - $${sale.amount}`} secondary={`Fecha: ${sale.date}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default SalesList;
