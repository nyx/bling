import { SHA256 } from "crypto-js";

export class Data {
    private payload: Uint8Array
    private hash: string = ""

    constructor(payload: Uint8Array) {
        this.init(payload);
    }

    private init(payload: Uint8Array) {
        this.payload = payload;
        this.hash = this.computeHash();
    }

    computeHash(): string {
        return this.hash = SHA256(this.payload.toString()).toString();
    }

    getPayload(): Uint8Array {
        return this.payload;
    }

    getHash(): string {
        return this.hash;
    }
}

export class Block {
    index: number
    timestamp: Date
    data: Data
    private previous: Block | null
    private hash: string

    constructor(index: number, timestamp: Date, data: Data, previous: Block | null) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous = previous
        this.hash = this.computeHash();
    }

    computeHash(): string { 
        var previousHash = undefined;
        if(this.previous === null) {
        } else {
            previousHash = this.previous.getHash();
        }
        return SHA256(
            this.index +
            previousHash +
            this.timestamp +
            this.data.getHash()).toString();
    }

    getData(): Data {
        return this.data;
    }

    // tamper with the chain - for testing purposes only!
    setData(data: Data) {
        this.data = data;
    }

    getHash(): string {
        return this.hash;
    }

    getPrevious(): Block {
        return this.previous;
    }
}

export class BlockChain {
    private genesisBlock: Block
    private chain: Block[]

    constructor() {
        this.chain = [BlockChain.createGenesisBlock()];
    }

    static createGenesisBlock(): Block {
        return new Block(0, new Date, new Data(new Uint8Array([])), null);
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length -1];
    }

    private getNextIndex(): number {
        return this.chain.length;
    }

    private getNextTimestamp(): Date {
        return new Date;
    }

    addData(data: Data): Block {
        let block = new Block(
            this.getNextIndex(),
            this.getNextTimestamp(),
            data,
            this.getLatestBlock());
        this.chain.push(block);
        return block;
    }

    getBlock(index: number) {
        return this.chain[index];
    }

    isChainValid(): boolean {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.getHash() !== currentBlock.computeHash()) {
                return false;
            }

            if(currentBlock.getPrevious().getHash() !== previousBlock.getHash()) {
                return false;
            }
        }
        return true;
    }

    printChain() {
        for(let i = 0; i < this.chain.length; i++) {
            const b = this.chain[i];
            console.log(`${b.index} - ${b.getHash()}`);
            if(i > 0) {
                const pb = this.chain[i - 1];
                console.log(`prev - ${pb.index} - ${pb.getHash()}`);
            }
        }
    }
}