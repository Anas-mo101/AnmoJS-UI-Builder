import Dragables from "./Dragables.js";
import PanelSidebar from "./PanelSidebar.js";
import DragablesInfo from "../assets/dragables.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor() {
        super();
     
        this.flag = true;
        this.panelTitle = '';

        document.addEventListener("showComponentToolSet", (e) => {
            this.flag = false;
            this.panelTitle = e.detail.id;
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
                    padding: '5px 5px'
                },
                content: [
                    Anmo.BuildElement ({
                        tag: 'div',
                        style: {
                            width: '220px',
                            'min-width': '220px',
                            display: 'flex',
                            gap: '10px',
                            margin: '5px 0px'
                        },
                        content: [
                            Anmo.BuildElement({
                                tag: "button",
                                onTap: () => {
                                    this.flag = true;
                                    this.update();
                                },
                                style: {
                                    width: '20px',
                                    height: '20px',
                                    // border: 'none',
                                    display: 'flex',
                                    'align-items': 'center',
                                    'justify-content': 'center',
                                    background: 'transparent',
                                    cursor: 'pointer'
                                },
                                content: 'x'
                            }),
                        ]
                    }),
                    this.panelTitle,
                    new PanelSidebar().getComponentHTML()
                ]
            });



            return this.flag ? draggablesList : panelSidebar;
        } catch (error) {
            return this.componentError(error);
        }
    }
}