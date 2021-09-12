import {createReadStream, ReadStream, statSync} from "fs";
import {onData, onEnd} from "./types";

export class FileReader {
    private readable?:ReadStream;
    onData?: onData;
    onEnd?: onEnd;

    constructor(
        readonly path: string,
    ) {
        this.readable = createReadStream(path);
        this.readable.on('data', (data: any) => {
            if(this.onData != undefined){
                 this.onData(data);
            }
        });
        this.readable.on('end', () => {
            if(this.onEnd != undefined){
                 this.onEnd();
            }
        });
    }
    public pause(){
        this.readable?.pause();
    }
    public resume(){
        this.readable?.resume();
    }
    public fileSize(){
         return statSync(this.path).size;
    }
    public stop(){
        this.readable?.destroy();
    }
}
