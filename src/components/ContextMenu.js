
function contextMenu(posx, posy) {
    return new Promise((resolve, reject) => {
        let popupInc = new Anmo.Utils.PopupIncubator(true, false, false);
        const popup = Anmo.BuildElement({
            tag: 'div',
            style: {
                'background-color': 'white',
                'width': '100px',
                'display': 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'align-items': 'center',
                'background-color': 'white',
                'position': 'absolute',
                'top': posy + 'px',
                'left': posx + 'px',
            },
            content: [
                Anmo.BuildElement({
                    tag: 'button',
                    content: 'Delete',
                    attributes: [
                        { attribute: "class", value: "context-button" },
                    ],
                    onTap: async () => {
                        resolve('DELETE');
                        popupInc.hidePopup();
                    },
                    style: {
                        'display': 'flex',
                        'align-items': 'center',
                        'text-align': "center",
                        height: "30px",
                        padding: "10px 10px",
                        'background-color': "#e3e3e3",
                        'font-weight': "bold",
                        'border': 'none',
                        'width': '100%',
                        'justify-content': 'center'
                    }
                }),
            ]
        });

        popupInc.displayPopup(popup);
    });
}

export default contextMenu;