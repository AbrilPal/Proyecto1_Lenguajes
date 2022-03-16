import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function App() {
  const [accion, setAccion] = useState(null);
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
          <Button variant="outlined" color="secondary" onClick={() => setAccion(true)}>Opción 1</Button>
          <Button variant="outlined" color="secondary" onClick={() => setAccion(false)}>Opción 2</Button>
        </Stack>
        <div style={{width: "100%", height: "600px"}}>
          {accion ? 
            <>
              <h4>Opcion 1</h4>
              <TextField
                hiddenLabel
                label="Expresión regular"
                color='secondary'
                id="filled-hidden-label-small"
                variant="filled"
              />
              <br></br>
              <br></br>
              <Button variant='contained' color='primary'>AFN</Button>
            </>
          :
            <>
              <h3>opcion 2</h3>
            </>
          }
        </div>
      </div>
    )
}

export default App;
