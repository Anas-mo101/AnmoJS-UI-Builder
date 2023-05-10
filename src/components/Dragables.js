
export default class extends Anmo.AbstractView { 
    constructor(info) {
        super();
        this.info = info;
    }

   
    getComponentHTML() {
        try {
            return Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                attributes: [
                    { attribute: "draggable", value: "true" },
                    { attribute: "ondragstart", value: `event.dataTransfer.setData('text', '${this.id}')` },
                    { attribute: "data-component", value: JSON.stringify(this.info.data) },
                    { attribute: "class", value: 'hovercard'},
                    { attribute: "title", value: 'container'}
                ],
                style:  {
                    width : '100px',
                    height: '100px',
                    border: '2px solid #bfbfbf',
                    'display': 'flex',
                    'justify-content': 'center',
                    gap: '10px',
                    'align-items': 'center',
                    'flex-direction': 'column',
                    'border-radius': '5px',
                },
                content: [
                    Anmo.BuildElement({
                        tag: "img",
                        attributes: [
                            { attribute: "src", value: './media/logo.png' },
                            { attribute: "draggable", value: "false" },
                        ],
                        style: {
                            width: '80%',
                        },
                    }),
                    Anmo.BuildElement({
                        tag: "p",
                        style:  {
                            margin : '0px',
                        },
                        content: this.info.title
                    }),
                ]
            });
        } catch (error) {
            console.log('error:' + error);
            return this.componentError(error);
        }
    }
}