import attributesProperties from "../assets/attributesProperties.json" assert {type: 'json'}


export default class extends Anmo.AbstractView { 
    constructor(eid) {
        super();

        this.eid = eid;
        this.search = false;
        this.searchKey = "";
        this.searchResult = [];
    }

    updateAttsDrawingPanel(value,prop){
        document.dispatchEvent(
            new CustomEvent('updateAttsDrawingPanel', {detail: { prop, value, id: this.eid }} )
        );
    }

    searchProp(prop){
        if(prop == ""){
            this.search = false;
            this.searchResult = [];
            this.update();
            return;
        }


        this.searchResult = attributesProperties.filter((result) => {
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
            const show = this.search ? this.searchResult : attributesProperties;
            const showElement = show.map((property) => this.drawCssPropertyControl(property)) 

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