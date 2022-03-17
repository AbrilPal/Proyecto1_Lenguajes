import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {re_to_tree} from "./re_to_tree"
import { convert_matrix_to_d3_graph, tree_to_afn } from './tree_to_afn';
import NodeGraph from './NodeGraph';

function App() {
  const [accion, setAccion] = useState(null || Boolean);
  const [afdgrafica, setAfdgrafica] = useState(Object);

  const convertRegularExpressionToTree = () => {
    let valor_input = (document.getElementById("input1") as HTMLInputElement).value
    const tree = re_to_tree(valor_input);
    console.log(tree)
    const afn = tree_to_afn(tree, [[], []], 0, 1);
    const d3GraphData = convert_matrix_to_d3_graph(afn);
    setAfdgrafica(d3GraphData)
  }
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
                id="input1"
                variant="filled"
              />
              <br></br>
              <br></br>
              <Button variant='contained' color='primary' onClick={() => {convertRegularExpressionToTree()}}>AFN</Button>
              <br></br>
              <NodeGraph data={afdgrafica}/>
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
