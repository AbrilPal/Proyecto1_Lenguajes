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
import { afn_to_afd, convertAFDToD3Graph } from './afn_to_afd';
import { evaluate_afd } from './evaluate_afd';

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
  const [afngrafica, setAfngrafica] = useState(Object);
  const [afdgrafica, setAfdgrafica] = useState(Object);
  const [inputEvalu, setInputEvalu] = useState(null || Boolean);
  const [toFND, setToFND] = useState(null || Boolean)
  const [alertEvaluar, setAlertEvaluar] = useState(null || Boolean)
  const [grafica, setGrafica] = useState(Number)
  const [open, setOpen] = React.useState(false);
  const [arbol, setArbol] = React.useState(Object)

  const handleClickOpen = () => {
    setOpen(true);
    evaluateExpressionAFD()
  };

  const handleClose = () => {
    setOpen(false);
  };

  let itBelongsText = <></>;

  const evaluateExpressionAFD = () => {
    const input = (document.getElementById("input2") as HTMLInputElement).value
    const itBelongs = evaluate_afd(input, arbol);
    setAlertEvaluar(itBelongs)
  }

  const convertRegularExpressionToTree = () => {
    setInputEvalu(false)
    let valor_input = (document.getElementById("input1") as HTMLInputElement).value
    const tree = re_to_tree(valor_input);
    setArbol(tree)
    const afn = tree_to_afn(tree, [[], []], 0, 1);
    const d3GraphData = convert_matrix_to_d3_graph(afn);
    setAfngrafica(d3GraphData)
    setToFND(true)
    setGrafica(0)
  }

  const convertAFNToAFD = () => {
      const afd = afn_to_afd(arbol);
      const d3GraphData = convertAFDToD3Graph(arbol);
      setAfdgrafica(d3GraphData)
      setInputEvalu(true)
      setGrafica(1)
  }

  const buildShowGraph = () => {
    if (grafica === 0) { // Hay arbol sintactico
      return (
        <div>
          <h6>AFN</h6>
          <NodeGraph data={afngrafica}/>
        </div>
      );
    } else if (grafica === 1) { // Hay AFN
      return (
        <div>
          <h6>AFD</h6>
          <NodeGraph data={afdgrafica}/>
        </div>
      );
    } 
    return (<div></div>);
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
        <Stack direction="row" spacing={2} style={{width: "100%", justifyContent: "center"}}>
          <Button variant="outlined" color="secondary" onClick={() => setAccion(true)}>Opción 1</Button>
          <Button variant="outlined" color="secondary" onClick={() => setAccion(false)}>Opción 2</Button>
        </Stack>
        <div style={{width: "100%", height: "600px", marginBottom: "100px"}}>
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
              {!toFND ?
              <>
                <br></br>
                <br></br>
                <Button variant='contained' color='primary' disabled>AFD</Button>
                <br></br>
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
                {buildShowGraph()}
                <Button variant='contained' color='primary' onClick={() => {convertAFNToAFD()}}>AFD</Button>
                <br></br>
                <br></br>
                {inputEvalu ?
                <>
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
                {alertEvaluar ?
                <>
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
                        La cadena {<em><strong>{(document.getElementById("input2") as HTMLInputElement).value}</strong></em>} si pertenece a {<em><strong>L(</strong></em>}{<em><strong>{(document.getElementById("input1") as HTMLInputElement).value + ")"}</strong></em>}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color='secondary' variant='outlined'>CERRAR</Button>
                    </DialogActions>
                  </Dialog>
                </>
                :
                <>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle style={{color:"red"}}>{"No"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        La cadena {<em><strong>{(document.getElementById("input2") as HTMLInputElement).value}</strong></em>} no pertenece a {<em><strong>L(</strong></em>}{<em><strong>{(document.getElementById("input1") as HTMLInputElement).value + ")"}</strong></em>}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color='secondary' variant='outlined'>CERRAR</Button>
                    </DialogActions>
                  </Dialog>
                </>}
                </>
                :
                <>
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
                }
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
