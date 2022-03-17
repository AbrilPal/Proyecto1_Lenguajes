import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {re_to_tree} from "./re_to_tree"
import { convert_matrix_to_d3_graph, tree_to_afn } from './tree_to_afn';
import NodeGraph from './NodeGraph';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [accion, setAccion] = useState(null || Boolean);
  const [afdgrafica, setAfdgrafica] = useState(Object);
  const [inputEvalu, setInputEvalu] = useState(null || Boolean);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertRegularExpressionToTree = () => {
    let valor_input = (document.getElementById("input1") as HTMLInputElement).value
    const tree = re_to_tree(valor_input);
    console.log(tree)
    const afn = tree_to_afn(tree, [[], []], 0, 1);
    const d3GraphData = convert_matrix_to_d3_graph(afn);
    setAfdgrafica(d3GraphData)
    setInputEvalu(true)
  }
    return(
      <div className="App">
        <h1>Bienvenido/a, por favor escoge que quieres realizar</h1>
        <span>
          <b>Opción 1:</b> A partir del a expresión regular <em><strong>r</strong></em> se construirá un <em><strong>AFN</strong></em>, el cual luego se transformará a un <em><strong>AFD</strong></em>.
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
              {!inputEvalu ?
              <>
                  <br></br>
                 <TextField
                  hiddenLabel
                  label="Cadena"
                  color='secondary'
                  id="input2"
                  variant="filled"
                  disabled
                />
                <br></br>
                <br></br>
                <Button variant='contained' color='primary' disabled>Evaluar</Button>
              </>
              :
              <>
                <NodeGraph data={afdgrafica}/>
                <br></br>
                <TextField
                  hiddenLabel
                  label="Cadena"
                  color='secondary'
                  id="input2"
                  variant="filled"
                />
                <br></br>
                <br></br>
                <Button variant='contained' color='primary' onClick={() => handleClickOpen()}>Evaluar</Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle style={{color:"green"}}>{"Si"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      La cadena {<em><strong>{(document.getElementById("input2") as HTMLInputElement).value}</strong></em>} si pertenece a L({<em><strong>{(document.getElementById("input1") as HTMLInputElement).value}</strong></em>})
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='secondary' variant='outlined'>CERRAR</Button>
                  </DialogActions>
                </Dialog>
              </>
              }
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
