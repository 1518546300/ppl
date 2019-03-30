var constValue = require('constValue');
var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
        aimingLine:{
            default:null,
            type: cc.Prefab
        },

        gameCanvas:{
            default:null,
            type: cc.Node
        },
    },

    onLoad () {
        this.aimingBalls = [];
        this.aimingLines = new cc.NodePool();
        this.distancePos = constValue.aimingInitPosY + constValue.aimingNum * constValue.aimingInterval;
        //global.aimingYDistance = constValue.aimingYDistance;

        for (let i = 0; i < constValue.aimingNum; i++) {
            let aimingLine = cc.instantiate(this.aimingLine); // 创建节点
            this.aimingLines.put(aimingLine); // 通过 putInPool 接口放入对象池
        }

        global.aimingLineDestroy = (() => {
            this.removeAllAimingBalls();
        });

        global.convertPos = ((x , y) => {
            let temp = this.node.convertToNodeSpaceAR(cc.v2(x , y));
            return temp;
        });
    },

    createAimingLine:function(){
        for(let i = 0;i < constValue.aimingNum;i++){
            let aimingLine = null;
            if (this.aimingLines.size() > 0) {
                aimingLine = this.aimingLines.get();
                aimingLine.parent = this.node;
                aimingLine.readPosition = {};
                    aimingLine.position = {
                    x:0,
                    y:constValue.aimingInitPosY + constValue.aimingInterval * i,
                }
                aimingLine.readPosition = aimingLine.position;
                aimingLine.getComponent('aimLineJs').init(this.distancePos , aimingLine.position.y , this.aimingColor)
                this.aimingBalls.push(aimingLine);
            }
        }
    },

    removeAllAimingBalls:function(){
        if(this.aimingBalls.length === 0){
            return;
        }else{
            for(let i = 0;i < this.aimingBalls.length;i++){
                this.aimingLines.put(this.aimingBalls[i]);
            }
            this.aimingLines.length = 0;
        }
    },

    /*update (dt) {
        if(global.touchStart === 1){
            /!*if (this.aimingLines.size() > 0) {
                let aimingLine = this.aimingLines.get();
                aimingLine.parent = this.node;
                aimingLine.position = {
                    x:0,
                    y:constValue.aimingInitPosY,
                }
                aimingLine.getComponent('aimLineJs').init(this.distancePos , aimingLine.position.y , this.aimingColor);
            }*!/

            /!*if(this.aimingBalls.length !== 0){
                for(let i = 0;i < this.aimingBalls.length;i++){
                    this.aimingBalls[i].position = this.aimingBalls[i].readPosition;
                    this.aimingBalls[i].y += constValue.aimingBallSpeed;
                    this.aimingBalls[i].readPosition = this.aimingBalls[i].position;
                    console.log(this.aimingBalls[i].position);
                    let temp = this.aimingBalls[i].convertToWorldSpaceAR(cc.v2(0,0));
                    /!*if(temp.x > (global.winWidthHalf + constValue.wallInterval) || temp.x < (global.winWidthHalf - constValue.wallInterval)){
                        if(temp.x > (global.winWidthHalf + constValue.wallInterval)){
                            temp.x = 2 * (global.winWidthHalf + constValue.wallInterval) - temp.x;
                        }else{
                            temp.x = (global.winWidthHalf - constValue.wallInterval) * 2 - temp.x;
                        }
                        temp = global.convertPos(temp.x,temp.y);
                        this.node.x = temp.x;
                        this.node.y = temp.y;
                    }*!/
                    if(this.aimingBalls[i].y >= this.distancePos){
                        this.aimingBalls[i].position = {
                            x:0,
                            y:constValue.aimingInitPosY,
                        };
                        //this.aimingBalls[i].readPosition = this.aimingBalls[i].position;
                    }
                }
            }*!/
        }
    },*/
});
