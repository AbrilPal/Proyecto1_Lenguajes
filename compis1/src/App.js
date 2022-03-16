import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';

function App() {
  const [accion, setAccion] = useState(0);
  if (accion === 0){
    return(
      <div className="App">
        <h1>Bienvenido por favor escoge que quieres realizar primero</h1>
        <span>
          <b>Opción 1:</b> A partir del a expresión regular <em><strong>r</strong></em> se construirá un <em><strong>AFN</strong></em>, el cual luego se transformará a un 
          <em><strong>AFD</strong></em>.
        </span>
        <br></br>
        <br></br>
        <span>
        <b>Opción 2:</b> A partir del a expresión regular <em><strong>r</strong></em> se generará un <em><strong>AFD</strong></em> directamente.
        </span>
        <br></br>
        <br></br>
        <Stack direction="row" spacing={2} style={{width: "300px", justifyContent: "center", marginLeft: "600px"}}>
          <Button variant="outlined" color="secondary">Opción 1</Button>
          <Button variant="outlined" color="secondary">Opción 2</Button>
        </Stack>
      </div>
    )
  }
  return (
    <>
    </>
  );
}

export default App;
