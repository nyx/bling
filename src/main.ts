import { BlockChain } from "./blockchain";

let bling = new BlockChain<number>();

bling.addData(1);
let bling2 = bling.addData(2);
bling.addData(3);
bling.addData(4);

console.log("side hustle");
bling.addData(42, bling.getBlockByHash(bling2.getHash()));

console.log('blockchain valid? : ' + bling.isChainValid());

console.log("tampering");
bling.getBlock(2).setData(42);

console.log('tampered blockchain valid? : ' + bling.isChainValid());
