var global = require("./global");
var constValue = require('constValue');
import GameModel from "./gameModel";
import playerInfo from "./playerInfo";
import barrierInfo from "./barrierInfoJs";

cc.Class({
    extends: cc.Component,

    properties: {
        gameCanvas:{
            default: null,
            type: cc.Node
        },

        ballNum:{
            default: null,
            type: cc.Label
        },

        clownPre:{
            default:null,
            type:cc.Prefab
        },

        arrowPre:{
            default:null,
            type:cc.Node
        },

        myBall:{
            default:null,
            type:cc.Prefab
        },

        nextBallNode:{
            default:null,
            type: cc.Node
        },

        ballAtlas:{
            default:null,
            type: cc.SpriteAtlas
        },

        gameOverNode:{
            default:null,
            type: cc.Node
        },

        coinsNum:{
            default:null,
            type: cc.Label
        },

        promptPre:{
            default:null,
            type:cc.Prefab
        },

        getBallArr:String,
        arrowRotationChange:0,

        cmd:[],

    },

    onLoad () {
        //global.currentBarrier = 5;
        global.myBulletNum = 20;
        this.changeBallNumLabel(global.myBulletNum);

        this.clown = cc.instantiate(this.clownPre);
        this.clown.parent = this.node;
        this.arrow = this.arrowPre;

        this.coinsNum.string = playerInfo.playerCoins;

        if(barrierInfo.ballInfoArr && barrierInfo.instructionBarrier){
            this.gameModel = new GameModel();
            this.gameModel.init(barrierInfo.ballInfoArr[global.currentBarrier-1]);

            if(global.currentBarrier < 5){
                this.rabbitPrompt = cc.instantiate(this.promptPre);
                this.rabbitPrompt.parent = this.node;
                this.rabbitPrompt.getComponent("promptJs").writeRabbitDialogue(barrierInfo.instructionBarrier);
            }

            let ballViews = this.gameCanvas.getComponent("gameCanvas");
            ballViews.setController(this);
            ballViews.initWithBallModels(this.gameModel.getBalls());

            this.initValue();
            this.setListener();
        }

        global.gameOverWaiting = ((num) => {
            this.gameOverNode.active = true;
            if(num === 1){
                if(global.currentBarrier === playerInfo.playerBarrier){
                    playerInfo.writeBarrier(++playerInfo.playerBarrier);
                }
            }
            this.gameOverNode.getComponent("gameResultJs").promptStatus(num);
        });

    },

    changeResidueBallNum () {
        global.myBulletNum--;
        this.changeBallNumLabel(global.myBulletNum);
    },

    changeBallNumLabel (num) {
        this.ballNum.string = num;
    },

    onDestroy () {
        cc.audioEngine.stopAll();
    },

    initValue: function(){
        let windowSize=cc.winSize;
        global.winWidthHalf = parseInt(windowSize.width/2);
        global.gameOverFlag = false;
        global.lineNum = 0;
        global.myBallFly = 1;
        global.ballNumCounting = 0;
        this.changeBallColor();
        this.arrowPos = this.arrow.convertToWorldSpaceAR(cc.v2(0, 0));
    },

    changeBallColor:function(){
        this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
        this.nextBallNode.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(global.nextBall);
    },

    setListener: function(){
        this.node.on(cc.Node.EventType.TOUCH_START, function(eventTouch){
            if(this.cmd.length === 0 && !global.gameOverFlag && global.myBulletNum > 0){
                let temp = eventTouch.getLocation();
                if(temp.y > 300){
                    global.aimingYDistance = constValue.aimingYDistance;
                    global.arrowRotation = 0;
                    global.touchStart = 1;
                    this.changeArrowRotation(temp);
                    this.pushActionToClown('1');

                    let ballViews = this.arrow.getComponent("arrowJs");
                    ballViews.createAimingLine();
                }
            }

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(eventTouch){
            if(this.cmd.length === 0 && !global.gameOverFlag && global.myBulletNum > 0){
                let temp = eventTouch.getLocation();
                if(temp.y > 300){
                    this.changeArrowRotation(temp);
                }else{
                    this.pushActionToClown('0');
                    this.arrow.rotation = 0;
                }
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(eventTouch){
            if(global.touchStart){
                /*console.log(this.cmd);
                console.log(this.gameModel.cmd);*/
                global.touchStart = 0;
                if(this.cmd.length === 0 && !global.gameOverFlag && global.myBulletNum > 0){
                    this.changeResidueBallNum();
                    this.fireMyBall();
                }else{
                    this.arrow.rotation = 0;
                    this.pushActionToClown('0');
                }
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(eventTouch){
            global.touchStart = 0;
            this.arrow.rotation = 0;
            this.pushActionToClown('0');
        }, this);
    },

    spliceCmd:function(){
        this.cmd.splice(0,1);
    },

    changeArrowRotation:function (temp) {
        let dirction = (temp.x - this.arrowPos.x)/(temp.y - this.arrowPos.y);
        dirction = Math.atan(dirction)*180/Math.PI;
        if(dirction < constValue.arrowRotation && dirction > -constValue.arrowRotation){
            this.arrow.rotation = dirction;
        }else if(dirction >= constValue.arrowRotation){
            this.arrow.rotation = constValue.arrowRotation;
        }else if(dirction <= -constValue.arrowRotation){
            this.arrow.rotation = -constValue.arrowRotation;
        }
        if(Math.abs(global.arrowRotation - this.arrow.rotation) > constValue.arrowRotationRange){
            global.aimingYDistance = constValue.aimingYDistance;
        }
    },

    pushActionToClown:function(num){
        this.clown.getComponent("clownJs").actionFunc(num);
    },

    actionPrepare:function(){
        let balls = this.gameCanvas.getComponent("gameCanvas").ballsView;
        for(let i in balls){
            balls[i].getComponent("ball").stopAction();
        }
    },

    fireMyBall:function(){
        if(global.lineNum < constValue.mastHeight){
            //this.actionPrepare();
            this.cmd.push('fireBall');
            this.pushActionToClown('2');
            global.myBallFly = 1;
            let myBall = cc.instantiate(this.myBall);
            myBall.parent = this.node;
            let temp = this.rotationFunc(constValue.myBallSpeed);

            myBall.position = {
                x:temp.x,
                y:temp.y,
            }

            myBall.getComponent("myBallJs").changeBallSpeed(temp.xSpeed , temp.ySpeed);
            global.flyBall = global.currentBall;

            let actionArray = [];
            let bezier = [cc.v2(0, 0), cc.v2(96, 100), cc.v2(192, -70)];
            let bezierForward = cc.bezierBy(0.4, bezier);
            actionArray.push(bezierForward);
            let callFunc = cc.callFunc(function(){
                this.nextBallNode.position = constValue.nextBallPos;
                this.gameModel.cleanCmd();
                this.gameModel.changeNextBall();
                this.changeBallColor();
            },this);
            actionArray.push(callFunc);
            this.nextBallNode.runAction(cc.sequence(...actionArray));
        }
    },

    rotationFunc:function(speed){
        let retObj = {};
        retObj.x = constValue.arrowLength * Math.sin(this.arrow.rotation * Math.PI/180);
        retObj.y = this.arrow.position.y + constValue.arrowLength * Math.cos(this.arrow.rotation * Math.PI/180);
        retObj.xSpeed = speed * Math.sin(this.arrow.rotation * Math.PI/180);
        retObj.ySpeed = speed * Math.cos(this.arrow.rotation * Math.PI/180);
        return retObj;
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'changeBall':
                if(global.currentBall <= constValue.ballType){
                    if(this.nextBallNode.position.x === constValue.nextBallPos.x && this.nextBallNode.position.y === constValue.nextBallPos.y){
                        this.exchangeBallSprite();
                    }
                }
                break;
            case 'rainbowBt':
                if(playerInfo.playerCoins >= 3){
                    playerInfo.playerCoins = playerInfo.playerCoins - 3;
                    playerInfo.writeCoinNum(playerInfo.playerCoins);
                    this.coinsNum.string = playerInfo.playerCoins;
                    global.currentBall = 2 + constValue.ballType;
                    this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
                }else{
                    global.currentBall = 2 + constValue.ballType;
                    this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
                }
                break;
            case 'bombBt':
                if(playerInfo.playerCoins >= 5){
                    playerInfo.playerCoins = playerInfo.playerCoins - 5;
                    playerInfo.writeCoinNum(playerInfo.playerCoins);
                    this.coinsNum.string = playerInfo.playerCoins;
                    global.currentBall = 6 + constValue.ballType;
                    this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
                }else{
                    global.currentBall = 6 + constValue.ballType;
                    this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
                }
                break;
            default:
                break;
        }
    },

    exchangeBallSprite:function () {
        let ballSpriteBuffier = global.nextBall;
        global.nextBall = global.currentBall;
        global.currentBall = ballSpriteBuffier;
        this.clown.getComponent("clownJs").changeCurrentBall(global.currentBall);
        this.nextBallNode.getComponent(cc.Sprite).spriteFrame = this.ballAtlas.getSpriteFrame(global.nextBall);
    },
});
