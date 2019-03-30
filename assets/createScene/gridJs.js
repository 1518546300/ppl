var constValue = require('constValue');

cc.Class({
    extends: cc.Component,

    properties: {
        ball:{
            default: null,
            type: cc.Node
        },

        ballSp:{
            default: null,
            type: cc.Sprite
        },

        ballAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        toolAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        status:101,
    },

    changeBallSp:function (num) {
        this.ballSp.spriteFrame = this.ballAtlas.getSpriteFrame(num);
        this.status = num;
        if(num <= constValue.ballType){
            this.ballSp.spriteFrame = this.ballAtlas.getSpriteFrame(num);
        }else{
            this.ballSp.spriteFrame = this.toolAtlas.getSpriteFrame(num-constValue.ballType-1);
        }
    }
});
