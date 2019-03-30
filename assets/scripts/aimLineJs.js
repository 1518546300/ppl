var global = require("./global");
var constValue = require('constValue');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
    },

    init:function(position , y){
        this.node.opacity = 255;
        this.distancePos = position;
        this.readPosition = {
            x:0,
            y:y,
        }
    },

    aimingLineDestroy:function(){
        global.aimingLineDestroy(this.node);
    },

    onBeginContact: function (contact, selfCollider, other) {
        switch (other.tag) {
            case 0://球碰到球
                this.node.opacity = 0;
                if(global.aimingYDistance > this.readPosition.y){
                    global.aimingYDistance = this.readPosition.y;
                    global.arrowRotation = this.node.parent.rotation;
                }
                break;
            case 3://球碰到球
                this.node.opacity = 0;
                if(global.aimingYDistance > this.readPosition.y){
                    global.aimingYDistance = this.readPosition.y;
                    global.arrowRotation = this.node.parent.rotation;
                }
                break;
            default:
                break;
        }
    },

    onPreSolve: function (contact, selfCollider, other) {
        switch (other.tag) {
            case 0://球碰到球
                this.node.opacity = 0;
                break;
            case 3://球碰到顶墙
                this.node.opacity = 0;
                //global.aimingYDistance = other.node.position.y;
                break;
            default:
                break;
        }
    },

    update (dt) {
        this.node.x = this.readPosition.x;
        this.node.y = this.readPosition.y;
        this.node.y += constValue.aimingBallSpeed;
        this.readPosition = this.node.position;
        if(this.node.y > global.aimingYDistance){
            this.node.opacity = 0;
        }else{
            this.node.opacity = 255;
        }
        let temp = this.node.convertToWorldSpaceAR(cc.v2(0,0));
        if(temp.x > (global.winWidthHalf + constValue.wallInterval) || temp.x < (global.winWidthHalf - constValue.wallInterval)){
            if(temp.x > (global.winWidthHalf + constValue.wallInterval)){
                temp.x = 2 * (global.winWidthHalf + constValue.wallInterval) - temp.x;
            }else{
                temp.x = (global.winWidthHalf - constValue.wallInterval) * 2 - temp.x;
            }
            temp = global.convertPos(temp.x,temp.y);
            this.node.x = temp.x;
            this.node.y = temp.y;
        }

        if(global.touchStart === 0){
            this.aimingLineDestroy();
        }

        if(this.readPosition.y >= this.distancePos){
            this.node.position = {
                x:0,
                y:constValue.aimingInitPosY,
            };
            this.readPosition = this.node.position;
        }
    },
});
