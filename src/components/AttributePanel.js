import attributesProperties from "../assets/attributesProperties.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor(eid) {
        super();

        this.eid = eid;
    }

    updateAttsDrawingPanel(value,prop){
        document.dispatchEvent(
            new CustomEvent('updateAttsDrawingPanel', {detail: { prop, value, id: this.eid }} )
        );
    }


    drawCssPropertyControl(property){

        const drawInputType = (type,name) => {

            if(Array.isArray(type)){
                return Anmo.BuildElement({
                    tag: 'select',
                    onChange: (e) => {
                        this.updateAttsDrawingPanel(e.target.value,name);
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


            return Anmo.BuildElement({
                tag: 'input',
                onInput: (e) => {
                    this.updateAttsDrawingPanel(e.target.value,name);
                },
                attributes: [
                    {attribute: 'type', value: 'text' }
                ],
                style: {
                    width: '20%',
                },
            })
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
                    ...attributesProperties.map((property) => {
                        return this.drawCssPropertyControl(property)
                    }) 
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
}