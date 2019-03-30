var global = require("./global");
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

        ball:{
            default:null,
            type: cc.Sprite
        },
    },

    onLoad () {
    },

    initWithModel: function(model){
        this.node.active = true;
        this.model = model;
        //this.node.runAction(cc.moveTo(0 , cc.v2(this.model.x,this.model.y)));
        if(this.model.type <= constValue.ballType){
            this.ball.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(this.model.type);
        }else{
            this.ball.getComponent(cc.Sprite).spriteFrame = this.toolAtlas.getSpriteFrame(this.model.type - constValue.ballType - 1);
        }
        this.node.x = this.model.x;
        this.node.y = this.model.y;
    },

    updateView: function(){
        let cmd = this.model.cmd;
        if(cmd.length <= 0) {
            return;
        }
        let actionArray = [];
        for(let i in cmd){
            if(cmd[i].action == "moveTo"){
                let move = cc.moveTo(cmd[i].keepTime, cc.v2(this.model.x,this.model.y));
                actionArray.push(move);
            } else if(cmd[i].action == "toDie"){
                this.getComponent(cc.PhysicsCircleCollider).sensor = true;
                if(this.model.type <= constValue.ballType){
                    let delay = cc.delayTime(cmd[i].delayTime);
                    actionArray.push(delay);
                    let callFunc = cc.callFunc(function(){
                        global.ballBreak(this.node.position , this.model.type);
                        global.removeBallFromPool(this.node);
                    },this);
                    actionArray.push(callFunc);
                }else{
                    let delay = cc.delayTime(cmd[i].delayTime);
                    actionArray.push(delay);
                    let callFunc = cc.callFunc(function(){
                        global.removeBallFromPool(this.node);
                    },this);
                    actionArray.push(callFunc);
                }
            } else if(cmd[i].action == "drop"){
                this.getComponent(cc.PhysicsCircleCollider).sensor = true;
                let move = cc.moveTo(0.3, cc.v2(this.model.x,this.node.y-450));
                actionArray.push(move);
                let callFunc = cc.callFunc(function(){
                    global.removeBallFromPool(this.node);
                },this);
                actionArray.push(callFunc);
            } else if(cmd[i].action == "changeColor"){
                /*this.changeColorFlag = 1;
                let delay = cc.delayTime(cmd[i].playTime);
                actionArray.push(delay);
                let callFunc = cc.callFunc(function(){
                    this.ball.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(this.model.type);
                },this);
                actionArray.push(callFunc);*/
                this.ball.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(this.model.type);
            } else if(cmd[i].action == "toShake"){
                let squashAction = cc.scaleTo(0.1, 1, 0.9);
                actionArray.push(squashAction);
                let scaleBackAction = cc.scaleTo(0.1, 1, 1);
                actionArray.push(scaleBackAction);
                let move1 = cc.moveTo(0.08, cc.v2(this.model.x,this.model.y + this.model.addYPos));
                actionArray.push(move1);
                let move2 = cc.moveTo(0.05, cc.v2(this.model.x,this.model.y));
                actionArray.push(move2);
            }
        }

        if(actionArray.length == 1){
            this.node.runAction(actionArray[0]);
        }else if(actionArray.length !== 0){
            this.node.runAction(cc.sequence(...actionArray));
        }
    },

    stopAction:function () {
        this.node.stopAllActions();
        this.node.x = this.model.x;
        this.node.y = this.model.y;
    },

    findNullState:function (pos) {
        let a = [];
        let d = [];
        let min = undefined;
        let index = 0;
        if(this.model.left.status === -2){
            a.push(this.model.left);
        }
        if(this.model.right.status === -2){
            a.push(this.model.right);
        }
        if(this.model.lower1.status === -2){
            a.push(this.model.lower1);
        }
        if(this.model.lower2.status === -2){
            a.push(this.model.lower2);
        }
        for(let i = 0;i < a.length;i++){
            let x = Math.abs(pos.x - a[i].x);
            let y = Math.abs(pos.y - a[i].y);
            d[i] = Math.sqrt((x * x) + (y * y));
        }
        min = d[0];
        for(let i = 0;i < d.length;i++){
            if(min > d[i]){
                min = d[i];
                index = i;
            }
        }
        return a[index];
    },

});
