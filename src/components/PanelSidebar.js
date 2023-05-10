import cssProperties from "../assets/cssProperties.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor() {
        super();
    }


    drawCssPropertyControl(property){

     
        return Anmo.BuildElement({
            tag: 'div',
            style: {
                width: '100%',
                display: 'flex',
                'justify-content': 'space-between'
            },
            content: [
                property.name,
                Anmo.BuildElement({
                    tag: 'input',
                    attributes: [
                        {attribute: 'type', value: 'text' }
                    ],
                    style: {
                        width: '10%',
                    },
                })
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
                    gap: '10px'
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