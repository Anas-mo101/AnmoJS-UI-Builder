import cssProperties from "../assets/cssProperties.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor(eid) {
        super();

        this.eid = eid;
        this.search = false;
        this.searchKey = "";
        this.searchResult = [];
    }

    updateCSSDrawingPanel(value,prop){
        document.dispatchEvent(
            new CustomEvent('updateCSSDrawingPanel', {detail: { prop, value, id: this.eid }} )
        );
    }

    searchProp(prop){
        if(prop == ""){
            this.search = false;
            this.searchResult = [];
            this.update();
            return;
        }


        this.searchResult = cssProperties.filter((result) => {
            if(result.name.includes(prop)){
                return true;
            }
            return false;
        });
        this.update();
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
            const show = this.search ? this.searchResult : cssProperties;
            const showElement = show.map((property) => this.drawCssPropertyControl(property)) 


            return Anmo.BuildElement ({
                tag: 'div',
                id: this.id,
                style: {
                    padding: '10px 5px',
                    display: 'flex',
                    'flex-direction': 'column',
                    gap: '20px',
                },
                content: [
                    Anmo.BuildElement({
                        tag: 'div',
                        style: {
                            display: 'flex',
                        },
                        content: [
                            Anmo.BuildElement ({
                                tag: 'input',
                                onChange: (e) => {
                                    this.search = true;
                                    this.searchKey = e.target.value;
                                    this.searchProp(e.target.value)
                                },
                                style: {
                                    width: '100%',
                                },
                                attributes: [
                                    {attribute: 'placeholder', value: 'Search' },
                                    {attribute: 'type', value: 'text' },
                                ],
                            }),
                            Anmo.BuildElement ({
                                tag: 'button',
                                onTap: (e) => {
                                    this.search = false;
                                    this.update();
                                },
                                content: 'x'
                            }),
                        ]
                    }),
                    ...showElement
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
}