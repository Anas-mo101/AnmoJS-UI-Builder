import contextMenu from "./ContextMenu.js"
import { bfsSearchAndDelete, dfsSearchAndDelete } from "../utils/DrawingUtils.js"

export default class extends Anmo.AbstractView { 
    constructor() {
        super();

        this.drawing = [];
        setTimeout(() => this.init(), 1000);


        document.addEventListener("getDrawingLayout", (e) => {
            Anmo.AppLocalStorage.TemporaryData({
                key: 'UIBuilderDrawingLayout', 
                value: this.drawing
            });
        });
    }


    init() {
        const board = document.getElementById(this.id) ? document.getElementById(this.id) : false;
        if (!board) {
            setTimeout(() => this.init(), 1000);
            return;
        };

        board.addEventListener('dragover', (ev) => ev.preventDefault());
        board.addEventListener('drop', async (ev) => this.handleDrop(ev));
    }


    bfsSearchAndUpdateContent(arr, id, content) {
        let queue = [...arr];
        
        while (queue.length) {
            const curr = queue.shift();
            if (curr.id === id) {
                if(curr.content == null){
                    curr.content = content;
                }else if(Array.isArray(curr.content)){
                    curr.content.push(content)
                }else if(typeof curr.content === 'object'){
                    curr.content = [ curr.content , content];
                }
                return arr;
            }
            if (typeof curr === 'object' && curr !== null) {
                if(curr?.content != null){
                    if(Array.isArray(curr.content)){
                        queue.push(...curr.content)
                    }else{
                        queue.push(curr.content);
                    }
                }
            }
        }
        
        // If the id wasn't found, return the original array.
        return arr;
    }
    

    handleDrop(ev, id = false){
        ev.preventDefault();
        ev.stopPropagation();
        
        const dropedItem = document.getElementById(ev.dataTransfer.getData("text"));
        if(!dropedItem?.dataset?.component){
            return;
        }

        const newid = Anmo.AbstractView.generateID();
        const newcomponent = JSON.parse(dropedItem.dataset.component);

        if(!id){
            this.drawing.push({id: newid, ...newcomponent});
        }else{
            this.drawing = this.bfsSearchAndUpdateContent(this.drawing, id, {id: newid, ...newcomponent})
        }

        setTimeout(() => this.init(), 500);
        this.update();
    }


    draw(drawing){
        let sections = [];

        if(Array.isArray(drawing)){
            for (let index = 0; index < drawing.length; index++) {
                const element = drawing[index];
                const compcontent = element?.content ? this.draw(element.content) : []; 

                const comp = Anmo.BuildElement({
                    ...element,
                    content: compcontent,
                    onContextMenu: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const response = await contextMenu(e.clientX, e.clientY);
                        
                        if(response === 'DELETE'){
                            this.drawing = dfsSearchAndDelete(this.drawing, element.id);
                            setTimeout(() => this.init(), 500);
                            this.update();
                        }
                    },
                });
    
                if(true){ // for componets that can have children
                    // comp.addEventListener('dragover', (ev) => ev.preventDefault());
                    comp.addEventListener('drop', (ev) => this.handleDrop(ev, element.id) );
                }
    
                sections.push(comp);
            }
            return sections;
        }

        if(typeof drawing === 'object' && drawing !== null && !Array.isArray(drawing)){
            
            const compcontent = drawing?.content ? this.draw(drawing.content) : []; 

            const comp = Anmo.BuildElement({
                ...drawing,
                content: compcontent,
                onContextMenu: async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const response = await contextMenu(e.clientX, e.clientY);
                    console.log(response);
                    
                    if(response === 'DELETE'){
                        this.drawing = dfsSearchAndDelete(this.drawing, drawing.id);
                        setTimeout(() => this.init(), 500);
                        this.update();
                    }
                },
            });

            if(true){ // for componets that can have children
                comp.addEventListener('dragover', (ev) => ev.preventDefault());
                comp.addEventListener('drop', async (ev) => this.handleDrop(ev, drawing.id) );
            }

            sections.push(comp);

            return sections;
        }
    }

   
    getComponentHTML() {
        try {
            return Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                style: {
                    width: 'inherit',
                    border: '2px solid #bfbfbf',
                    padding: '10px',
                    'overflow-y': 'auto'
                },
                content: [
                    ...this.draw(this.drawing)
                ]
            });
        } catch (error) {
            console.log(error);
            return this.componentError(error);
        }
    }
}