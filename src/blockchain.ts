import { SHA256 } from "crypto-js";

export class Data<T> {
    private payload: T
    private hash: string = ""

    constructor(payload: T) {
        this.init(payload);
    }

    private init(payload: T) {
        this.payload = payload;
        this.hash = this.computeHash();
    }

    computeHash(): string {
        return this.hash = SHA256(this.payload.toString()).toString();
    }

    getPayload(): T {
        return this.payload;
    }

    getHash(): string {
        return this.hash;
    }
}

export class Block<T> {
    index: number
    timestamp: Date
    data: Data<T>
    private previous: Block<T> | null
    private hash: string

    constructor(index: number, timestamp: Date, data: Data<T>, previous: Block<T> | null) {
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

    getData(): Data<T> {
        return this.data;
    }

    // tamper with the chain - for testing purposes only!
    setData(payload: T) {
        this.data = new Data<T>(payload);
    }

    getHash(): string {
        return this.hash;
    }

    getPrevious(): Block<T> {
        return this.previous;
    }
}

export class BlockChain<T> {
    private chain: Block<T>[] = []

    getLatestBlock(): Block<T> | null {
        if(this.chain.length > 0) {
            return this.chain[this.chain.length -1];
        } else {
            return null;
        }
    }

    private getNextIndex(): number {
        return this.chain.length;
    }

    private getNextTimestamp(): Date {
        return new Date;
    }

    addData(data: T) {
        let block = new Block(
            this.getNextIndex(),
            this.getNextTimestamp(),
            new Data<T>(data),
            this.getLatestBlock());
        this.chain.push(block);
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