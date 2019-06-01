import { Data, Block, BlockChain } from "./blockchain";

class Bling extends Data {
    constructor(value: number) {
        super(new Uint8Array([value]));
    }
}

class BlingChain extends BlockChain {
    constructor() {
        super()
    }
}

let bling = new BlingChain();

let d1 = new Bling(1);
let d2 = new Bling(2);
let d3 = new Bling(3);
let d4 = new Bling(4);

bling.addData(d1);
bling.addData(d2);
bling.addData(d3);
bling.addData(d4);

console.log('blockchain valid? : ' + bling.isChainValid());

console.log("tampering...");

bling.getBlock(2).setData(new Data(new Uint8Array([42])));

console.log('tampered blockchain valid? : ' + bling.isChainValid());
