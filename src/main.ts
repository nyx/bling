import { Data, Block, BlockChain } from "./blockchain";

//class Bling extends Data<number> {}
//class BlingChain extends BlockChain<Data<number>> {}

let bling = new BlockChain<number>();

bling.addData(1);
bling.addData(2);
bling.addData(3);
bling.addData(4);

console.log('blockchain valid? : ' + bling.isChainValid());

console.log("tampering...");

bling.getBlock(2).setData(42);

console.log('tampered blockchain valid? : ' + bling.isChainValid());
