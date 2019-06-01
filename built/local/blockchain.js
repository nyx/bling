"use strict";
exports.__esModule = true;
var crypto_js_1 = require("crypto-js");
var Data = /** @class */ (function () {
    function Data(payload) {
        this.hash = "";
        this.init(payload);
    }
    Data.prototype.init = function (payload) {
        this.payload = payload;
        this.hash = this.computeHash();
    };
    Data.prototype.computeHash = function () {
        return this.hash = crypto_js_1.SHA256(this.payload.toString()).toString();
    };
    Data.prototype.getPayload = function () {
        return this.payload;
    };
    Data.prototype.getHash = function () {
        return this.hash;
    };
    return Data;
}());
exports.Data = Data;
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, previous) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous = previous;
        this.hash = this.computeHash();
    }
    Block.prototype.computeHash = function () {
        var previousHash = undefined;
        if (this.previous === null) {
        }
        else {
            previousHash = this.previous.getHash();
        }
        return crypto_js_1.SHA256(this.index +
            previousHash +
            this.timestamp +
            this.data.getHash()).toString();
    };
    Block.prototype.getData = function () {
        return this.data;
    };
    // tamper with the chain - for testing purposes only!
    Block.prototype.setData = function (data) {
        this.data = data;
    };
    Block.prototype.getHash = function () {
        return this.hash;
    };
    Block.prototype.getPrevious = function () {
        return this.previous;
    };
    return Block;
}());
exports.Block = Block;
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.chain = [BlockChain.createGenesisBlock()];
    }
    BlockChain.createGenesisBlock = function () {
        return new Block(0, new Date, new Data(new Uint8Array([])), null);
    };
    BlockChain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    BlockChain.prototype.getNextIndex = function () {
        return this.chain.length;
    };
    BlockChain.prototype.getNextTimestamp = function () {
        return new Date;
    };
    BlockChain.prototype.addData = function (data) {
        var block = new Block(this.getNextIndex(), this.getNextTimestamp(), data, this.getLatestBlock());
        this.chain.push(block);
        return block;
    };
    BlockChain.prototype.getBlock = function (index) {
        return this.chain[index];
    };
    BlockChain.prototype.isChainValid = function () {
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            if (currentBlock.getHash() !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.getPrevious().getHash() !== previousBlock.getHash()) {
                return false;
            }
        }
        return true;
    };
    BlockChain.prototype.printChain = function () {
        for (var i = 0; i < this.chain.length; i++) {
            var b = this.chain[i];
            console.log(b.index + " - " + b.getHash());
            if (i > 0) {
                var pb = this.chain[i - 1];
                console.log("prev - " + pb.index + " - " + pb.getHash());
            }
        }
    };
    return BlockChain;
}());
exports.BlockChain = BlockChain;
