

export default class DrawingDS {
    constructor() {
        this.drawing = [];
    }

    getDrawing() {
        return this.drawing;
    }

    append(comp) {
        this.drawing.push(comp);
    }

    isEmpty() {
        return this.drawing.length > 0;
    }

    delete(id){
        this.drawing = this.SearchAndDelete(this.drawing, id);
    }

    SearchAndDelete(arr, id) {
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].id === id) {
                arr.splice(i, 1);
                return arr;
            }

            if (Array.isArray(arr[i])) {
                this.SearchAndDelete(arr[i], id);
            }

            if (typeof arr[i] === "object" && arr[i] !== null) {
                if (Array.isArray(arr[i].content)) {
                    arr[i].content = this.SearchAndDelete(arr[i].content, id);
                } else if (typeof arr[i].content === "object" && arr[i].content !== null) {
                    arr[i].content = this.SearchAndDelete([arr[i].content], id);
                }
            }
        }

        return arr;
    };

    bfsLoop(id, cb){
        let queue = [...this.drawing];
        while (queue.length) {
            let curr = queue.shift();
            if (curr.id === id) {
                curr = cb(curr);
            }
            if (typeof curr === 'object' && curr !== null) {
                if (curr?.content != null) {
                    if (Array.isArray(curr.content)) {
                        queue.push(...curr.content)
                    } else {
                        queue.push(curr.content);
                    }
                }
            }
        }
    }


    UpdateAtts(id, prop, value) {
        const start = performance.now();

        this.bfsLoop(id, (curr) => {
            if (curr?.attributes) {
                curr.attributes.forEach(a => {
                    if (a.attribute == prop) {
                        a.value = value;
                    }
                });
            } else {
                curr.attributes = [{ attribute: prop, value: value }]
            }
            return curr;
        });

        
        const duration = performance.now() - start;
        console.log(duration, 'UpdateAtts');
    }

    UpdateCSS(id, prop, value) {
        const start = performance.now();

        this.bfsLoop(id, (curr) => {
            curr.style[prop] = value;
            return curr;
        });

        const duration = performance.now() - start;
        console.log(duration, 'UpdateCSS');
    }


    UpdateContent(id, content) {
        const start = performance.now();

        this.bfsLoop(id, (curr) => {
            if (curr.content == null) {
                curr.content = content;
            } else if (Array.isArray(curr.content)) {
                curr.content.push(content)
            } else if (typeof curr.content === 'object') {
                curr.content = [curr.content, content];
            }
            return curr;
        });

        const duration = performance.now() - start;
        console.log(duration, 'UpdateContent');
    }
}