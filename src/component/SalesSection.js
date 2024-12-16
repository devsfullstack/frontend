import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

const SalesSection = () => {
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const navigate = useNavigate(); // Inicializa el hook

  const salesExample = [
    { id: 1, emissionDate: '2024-11-01', dueDate: '2024-12-01', client: 'Cliente A', category: 'Producto A', subtotal: 100, discount: 10 },
    { id: 2, emissionDate: '2024-11-02', dueDate: '2024-12-02', client: 'Cliente B', category: 'Producto B', subtotal: 200, discount: 20 },
  ];

  const totalSales = salesExample.length;
  const totalCobrado = salesExample.reduce((acc, sale) => acc + (sale.subtotal - sale.discount), 0);
  const totalACobrar = totalSales * 100 - totalCobrado; // Ajusta la lógica según tus datos
  const totalVencido = salesExample.filter(sale => new Date(sale.dueDate) < new Date()).length;

  return (
    <Box p={3} sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Ventas
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label="Fecha"
            type="date"
            variant="outlined"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Vencimiento"
            type="date"
            variant="outlined"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" onClick={() => navigate('/nueva-venta')}>
            Nueva Venta
          </Button>
        </Grid>
      </Grid>

      <Box mt={4} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cantidad de Ventas</Typography>
                <Typography variant="h5">{totalSales}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cobrado</Typography>
                <Typography variant="h5">${totalCobrado.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">A Cobrar</Typography>
                <Typography variant="h5">${totalACobrar.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Vencido</Typography>
                <Typography variant="h5">{totalVencido}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>
        Lista de Ventas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Emisión</TableCell>
              <TableCell>Vencimiento</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Subtotal sin Descuento</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Subtotal con Descuento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesExample.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.emissionDate}</TableCell>
                <TableCell>{sale.dueDate}</TableCell>
                <TableCell>{sale.client}</TableCell>
                <TableCell>{sale.category}</TableCell>
                <TableCell>${sale.subtotal.toFixed(2)}</TableCell>
                <TableCell>${sale.discount.toFixed(2)}</TableCell>
                <TableCell>${(sale.subtotal - sale.discount).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Exportar
      </Button>
    </Box>
  );
};

export default SalesSection;
