import exportFile from "../utils/CreateComponentFile.js"


export default class extends Anmo.AbstractView { 
    constructor() {
        super();
    }

    getLayout(){
        document.dispatchEvent(new CustomEvent('getDrawingLayout'))
        setTimeout(() => {
            const layout = Anmo.AppLocalStorage.getTemporaryData('UIBuilderDrawingLayout');
            this.layout = JSON.parse(layout);
            exportFile(this.layout);
        }, 1000);
    }

    getComponentHTML() {
        try {
            return Anmo.BuildElement({
                tag: "div",
                id: this.id,
                style: {
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    'flex-direction': 'row-reverse',
                    'background-color': '#bfbfbf    '
                },
                content: [
                    Anmo.BuildElement({
                        tag: "button",
                        onTap: () => this.getLayout(),
                        style: {
                            width: '40px',
                            height: '40px',
                            border: '1px black solid',
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'center'
                        },
                        content: Anmo.BuildElement({
                            tag: "i",
                            attributes: [
                                { attribute: "class", value: 'arrow down'},
                            ],
                        })
                    }),
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
}