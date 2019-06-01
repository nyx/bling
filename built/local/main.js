"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var blockchain_1 = require("./blockchain");
var Bling = /** @class */ (function (_super) {
    __extends(Bling, _super);
    function Bling(value) {
        return _super.call(this, new Uint8Array([value])) || this;
    }
    return Bling;
}(blockchain_1.Data));
var BlingChain = /** @class */ (function (_super) {
    __extends(BlingChain, _super);
    function BlingChain() {
        return _super.call(this) || this;
    }
    return BlingChain;
}(blockchain_1.BlockChain));
var bling = new BlingChain();
var d1 = new Bling(1);
var d2 = new Bling(2);
var d3 = new Bling(3);
var d4 = new Bling(4);
bling.addData(d1);
bling.addData(d2);
bling.addData(d3);
bling.addData(d4);
console.log('blockchain valid? : ' + bling.isChainValid());
console.log("tampering...");
bling.getBlock(2).setData(new blockchain_1.Data(new Uint8Array([42])));
console.log('tampered blockchain valid? : ' + bling.isChainValid());
