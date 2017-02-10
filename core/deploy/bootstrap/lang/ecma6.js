module.exports = (function () {
    'use strict'
    const $containers = require('./../containers.js');
    return class ecma6 extends $containers {
        constructor(hook) {
            super(hook);
        }
        build() {
            let limit = Object.keys(this.contenairs).length;
            let bootstrap ="";
            bootstrap += `let bootstrap = (function () {\n`;
            bootstrap += `'use strict'\n`;
            bootstrap += `class Key {constructor(){}}`;
            bootstrap += `let key = new Key({ method: "strict", role: "root" });\n`;
            bootstrap += `register.containers({\n`;
            function* thread() {
                var index = 0;
                while (index < limit - 1) {
                    yield index++;
                }
            }
             
            let iterator = thread();
            return new Promise((resolve, reject) => {
                for (var index in this.contenairs) {
                    let container = this.contenairs[index];
                    bootstrap += `"${container.name}":[${container.imports.map((a)=>{return "'"+a+"'"}).join(",")}],\n`;
                       if (iterator.next().done == 1) {
                          bootstrap += "},key);\n";
                          bootstrap += "})();\n";
                          resolve(bootstrap); 
       
                       }
                }
            });
        }

    }

})();