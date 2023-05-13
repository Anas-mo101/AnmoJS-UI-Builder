import Dragables from "./Dragables.js";
import PanelSidebar from "./PanelSidebar.js";
import DragablesInfo from "../assets/dragables.json" assert {type: 'json'};
import AttributePanel from "./AttributePanel.js";


export default class extends Anmo.AbstractView { 
    constructor() {
        super();
     
        this.flag = 0;
        this.eid = '';

        document.addEventListener("showComponentToolSet", (e) => {
            this.flag = 1;
            this.eid = e.detail.id;
            this.update();
        });
    }

   
    getComponentHTML() {
        try {
            const draggablesList = Anmo.BuildElement ({
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

            const panelSidebar = Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                style: {
                    width: '220px',
                    'min-width': '220px',
                    border: '2px solid #bfbfbf',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden',
                    // 
                },
                content: [
                    Anmo.BuildElement ({
                        tag: 'div',
                        style: {
                            width: '220px',
                            'min-width': '220px',
                            display: 'flex',
                            gap: '10px',
                            padding: '10px 5px',
                            'background-color': 'black'
                        },
                        content: [
                            Anmo.BuildElement({
                                tag: "button",
                                onTap: () => {
                                    this.flag = 0;
                                    this.update();
                                },
                                style: {
                                    width: '25px',
                                    height: '25px',
                                    'border-radius': '10px',
                                    display: 'flex',
                                    'align-items': 'center',
                                    'justify-content': 'center',
                                    background: 'white',
                                    cursor: 'pointer'
                                },
                                content: 'x'
                            }),
                            Anmo.BuildElement({
                                tag: "button",
                                onTap: () => {
                                    this.flag = 2;
                                    this.update();
                                },
                                style: {
                                    width: '25px',
                                    height: '25px',
                                    'border-radius': '10px',
                                    display: 'flex',
                                    'align-items': 'center',
                                    'justify-content': 'center',
                                    background: 'white',
                                    cursor: 'pointer'
                                },
                                content: 'e'
                            }),
                        ]
                    }),
                    this.flag == 1 ? new PanelSidebar(this.eid).getComponentHTML() : 
                        new AttributePanel(this.eid).getComponentHTML()
                ]
            });



            switch (this.flag) {
                case 0:
                    return draggablesList;
                case 1:
                case 2:
                    return panelSidebar;
                default:
                    return draggablesList;
            }

        } catch (error) {
            return this.componentError(error);
        }
    }
}