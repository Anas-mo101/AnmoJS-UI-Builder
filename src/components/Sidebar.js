import Dragables from "./Dragables.js";
import DragablesInfo from "../assets/dragables.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor() {
        super();
     
    }

   
    getComponentHTML() {
        try {
            return Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                style: {
                    width: '220px',
                    'min-width': '220px',
                    'display': 'flex',
                    'justify-items': 'center',
                    padding: '10px',
                    gap: '10px',
                    'flex-wrap': 'wrap',
                    border: '2px solid #bfbfbf',
                    'align-content': 'flex-start'
                },
                content: [
                   ...DragablesInfo.map((e) => new Dragables(e).getComponentHTML())
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
}