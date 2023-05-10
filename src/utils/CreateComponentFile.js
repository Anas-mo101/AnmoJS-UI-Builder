
//flawed

const writeComponents = (data) => {
    let componentContent = '';
    if(Array.isArray(data)){
        data.forEach(element => {
            if (element?.content != null) {
                let innerContent = writeComponents(element?.content);
                element.content = innerContent;
            }
            const comp = `Anmo.BuildElement(${JSON.stringify(element)}),`
            componentContent += comp;
        });
        return `[${componentContent}]`;
    } else if (typeof data === 'object' ) {
        if (data?.content != null) {
            let innerContent = writeComponents(data?.content);
            data.content = innerContent;
        }
        componentContent = `Anmo.BuildElement(${JSON.stringify(data)}),`
        return componentContent;
    }else if (typeof data === 'string' || data instanceof String){
        componentContent = data;
        return componentContent;
    }
}



const exportFile = (data) => {
    let componentContent = writeComponents(data);

    const componentCode = `
        export default class extends Anmo.AbstractView { 
            constructor() {
                super();
            }
        
            getComponentHTML() {
                try {
                    return Anmo.BuildElement ({
                        tag: 'div',
                        id: this.id,
                        content: ${componentContent}
                    });
                } catch (error) {
                    return this.componentError(error);
                }
            }
        }
    `;
    
    var exportedFilenmae = 'export.js';

    var blob = new Blob([componentCode], { type: 'text/javascript;' });

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export default exportFile;