import cssProperties from "../assets/cssProperties.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor(eid) {
        super();

        this.eid = eid;
    }

    updateCSSDrawingPanel(value,prop){
        document.dispatchEvent(
            new CustomEvent('updateCSSDrawingPanel', {detail: { prop, value, id: this.eid }} )
        );
    }


    drawCssPropertyControl(property){

        const drawInputType = (type,name) => {

            if(Array.isArray(type)){
                return Anmo.BuildElement({
                    tag: 'select',
                    onChange: (e) => {
                        this.updateCSSDrawingPanel(e.target.value,name);
                    },
                    style: {
                        width: '24%',
                    },
                    content: type.map((e) => {
                        return Anmo.BuildElement({
                            tag: 'option',
                            content: e
                        })
                    })
                })
            }


            switch (type) {
                case 'text':
                case 'size':
                case 'number':
                case 'font-family':
                    return Anmo.BuildElement({
                        tag: 'input',
                        onInput: (e) => {
                            this.updateCSSDrawingPanel(e.target.value,name);
                        },
                        attributes: [
                            {attribute: 'type', value: 'text' }
                        ],
                        style: {
                            width: '20%',
                        },
                    })
                // case 'size':
                // case 'number':
                //     return Anmo.BuildElement({
                //         tag: 'input',
                //         onInput: (e) => {
                //             this.updateCSSDrawingPanel(e.target.value,name);
                //         },
                //         attributes: [
                //             {attribute: 'type', value: 'number' }
                //         ],
                //         style: {
                //             width: '20%',
                //         },
                //     })
                case 'color':
                    return Anmo.BuildElement({
                        tag: 'input',
                        onInput: (e) => {
                            this.updateCSSDrawingPanel(e.target.value,name);
                        },
                        attributes: [
                            {attribute: 'type', value: 'color' }
                        ],
                        style: {
                            width: '24%',
                        },
                    })
                default:
                    break;
            }
        }

     
        return Anmo.BuildElement({
            tag: 'div',
            style: {
                width: '100%',
                display: 'flex',
                'justify-content': 'space-between',
                'align-items': 'center',
            },
            content: [
                Anmo.BuildElement({
                    tag: 'p',
                    style: {
                        margin: '0px',
                        'font-size': '13px'
                    },
                    content: property.name
                }),
                drawInputType(property.value_options,property.name)
            ]
        });
    }

   
    getComponentHTML() {
        try {
            return Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                style: {
                    display: 'flex',
                    'flex-direction': 'column',
                    gap: '20px',
                    padding: '10px 5px'
                },
                content: [
                    ...cssProperties.map((property) => {
                        return this.drawCssPropertyControl(property)
                    }) 
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
}