declare module 'node-zip' {
    class NodeZip {
        constructor();
        file(name: string, data: any, options?: any): this;
        folder(name: string): this;
        generate(options?: any): any;
    }

    export = NodeZip;
}
