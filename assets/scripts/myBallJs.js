import constValue from "./constValue";
var global = require("./global");

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

        ball:{
            default:null,
            type: cc.Sprite
        },

        audioBallTouch: {
            default: null,
            type: cc.AudioClip
        },

        audioThrowBall: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad () {
        if(global.currentBall <= constValue.ballType){
            this.ball.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(global.currentBall);
        }else{
            this.ball.getComponent(cc.Sprite).spriteFrame = this.toolAtlas.getSpriteFrame(global.currentBall-constValue.ballType-1);
        }
        this.touchPertect = 0;
    },

    onBallContactLeftWall:function(){
        let xSpeed = Math.abs(this.getComponent(cc.RigidBody).linearVelocity.x);
        let ySpeed = this.getComponent(cc.RigidBody).linearVelocity.y;
        this.changeBallSpeed(xSpeed , ySpeed);
    },

    onBallContactRightWall:function(){
        let xSpeed = -this.getComponent(cc.RigidBody).linearVelocity.x;
        let ySpeed = this.getComponent(cc.RigidBody).linearVelocity.y;
        this.changeBallSpeed(xSpeed , ySpeed);
    },

    changeBallSpeed:function(xSpeed , ySpeed){
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(xSpeed,ySpeed);
    },

    onBeginContact: function (contact, selfCollider, other) {
        switch (other.tag) {
            case 0://球碰到球
                if(!other.node.getComponent("ball").model.isDeath){
                    if(this.touchPertect === 0){
                        this.touchPertect = 1;
                        if(other.node.getComponent("ball").model.type === 8){
                            let speed = this.getComponent(cc.RigidBody).linearVelocity;
                            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                            global.bubbleBreak(other.node);
                            //other.node.active = false;
                            this.getComponent(cc.RigidBody).linearVelocity = speed;
                            this.touchPertect = 0;
                        }else{
                            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                            cc.audioEngine.play(this.audioBallTouch, false, 1);
                            let pos = other.node.getComponent("ball").findNullState(this.node.position);
                            global.findBall(pos , this.node);
                        }
                    }
                }
                break;
            case 1://球碰到左墙
                this.onBallContactLeftWall();
                break;
            case 2://球碰到右墙
                this.onBallContactRightWall();
                break;
            case 3://球碰到顶墙
                if(this.touchPertect === 0){
                    this.touchPertect = 1;
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                    let position = this.node.position;
                    global.addFristLineBall(position , this.node);
                }
                break;
            default:
                break;
        }
    },


});
