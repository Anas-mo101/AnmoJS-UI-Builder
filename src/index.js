import DrawingBoard from "./components/DrawingBoard.js";
import Sidebar from "./components/Sidebar.js"
import Toolbar from "./components/Toolbar.js"

// import _export from "./export.js";

Anmo.setBreakPoints({mobile: 450, tablet: 850});
Anmo.setMainContainer("body");

// Anmo.initApp(_export);

Anmo.initApp(class extends Anmo.AbstractView { 
    constructor() {
        super();
    }

    getComponentHTML() {
        try {
            return Anmo.BuildElement({
                tag: "div",
                id: this.id,
                style: {
                    width: '100%',
                    height: '100%',
                },
                content: [
                    new Toolbar().getComponentHTML(),
                    Anmo.BuildElement({
                        tag: "div",
                        style: {
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                        },
                        content: [ 
                            new Sidebar().getComponentHTML(),
                            new DrawingBoard().getComponentHTML()
                        ]
                    })
                ]
            });
        } catch (error) {
            return this.componentError(error);
        }
    }
})
