var constValue = require('constValue');

cc.Class({
    extends: cc.Component,

    properties: {
        ballAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        toolAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        actionAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        currentBall:{
            default:null,
            type: cc.Sprite
        },

        clown:{
            default:null,
            type: cc.Node
        },

        hand:{
            default:null,
            type: cc.Node
        },
    },

    onLoad () {
        this.handPos = this.hand.position;
        this.clownPos = this.clown.position;
    },

    actionFunc:function(num){
        switch (num) {
            case '0': //发射取消
                this.clownAction('0');
                break;
            case '1'://发射准备
                this.clownAction('1');
                break;
            case '2'://发射结束
                this.clownAction('2');
                this.scheduleOnce(function(){
                    this.clownAction('3');
                    this.scheduleOnce(function(){
                        this.clownAction('0');
                    },0.15);
                },0.1);
                break;
            default:
                break;
        }
    },

    clownAction:function(num){
        switch (num) {
            case '0':
                this.clown.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('c0');
                this.hand.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('h0');
                this.hand.position = this.handPos;
                this.clown.position = this.clownPos;
                break;
            case '1':
                this.clown.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('c1');
                this.hand.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('h1');
                this.clown.position = {
                    x:this.clown.position.x,
                    y:this.clown.position.y - 8,
                }
                this.hand.position = {
                    x:this.hand.position.x,
                    y:this.hand.position.y - 15,
                }
                break;
            case '2':
                this.clown.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('c2');
                this.hand.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame(100);
                this.currentBall.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(100);
                this.clown.position = this.clownPos;
                break;
            case '3':
                this.clown.getComponent(cc.Sprite).spriteFrame = this.actionAtlas.getSpriteFrame('c3');
                break;
            default:
                break;
        }

    },

    changeCurrentBall:function(num){
        if(num <= constValue.ballType){
            this.currentBall.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(num);
        }else{
            this.currentBall.getComponent(cc.Sprite).spriteFrame = this.toolAtlas.getSpriteFrame(num-constValue.ballType-1);
        }

    },

    // update (dt) {},
});
