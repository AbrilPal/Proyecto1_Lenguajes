import { pink } from '@mui/material/colors';
import * as React from 'react';
import { Graph } from "react-d3-graph";
import './main.css'

export interface NodeGraphProps {
    data: any;
}
 
export interface NodeGraphState {
}
 
class NodeGraph extends React.Component<NodeGraphProps, NodeGraphState> {
    render() {
        let data = {
            nodes: [{id: "a", label: "", isInitial: false, isFinal: false}],
            links: []
        };

        data = this.props.data;

        return (
            <Graph
                id="graph-id"
                data={data}
                config={{
                    directed: true,
                    height: 300,
                    width: 300,
                    node: {
                      labelProperty: "id",
                      renderLabel: false,
                      viewGenerator: ((node) => {
                          return (
                              <div className={`graph-node${node.isInitial ? ' node-initial' : ''}${node.isFinal ? ' node-final':''}`}>
                                  {node.id}
                              </div>
                          )
                      })
                    
                    },
                    link: {
                        renderLabel: true,
                        fontSize: 14,
                        color: "purple",
                    }
                  }}
            />
        );
    }
}
 
export default NodeGraph;