import playerInfo from "./playerInfo";

var global = require("./global");
var constValue = require('constValue');

cc.Class({
    extends: cc.Component,

    properties: {
        ballPre: {
            default: null,
            type:cc.Prefab
        },

        topWall: {
            default: null,
            type:cc.Node
        },

        audioBackMusic: {
            default: null,
            type: cc.AudioClip
        },

        audioThrowBall: {
            default: null,
            type: cc.AudioClip
        },

        particle:{
            default:null,
            type: cc.Prefab
        },
    },

    onLoad () {
        this.current = cc.audioEngine.play(this.audioBackMusic, true, 1);

        global.findBall = ((pos , ball) => {
            ball.destroy();
            this.findBall(pos);
        });

        global.ballBreak = ((pos , type) => {
            let particle = cc.instantiate(this.particle);
            particle.parent = this.node;
            particle.getComponent("particleJs").doAction(pos , type);
        });

        global.removeBallFromPool = ((ball) => {
            this.removeBallFromPool(ball);
        });

        global.addFristLineBall = ((position , node) => {
            node.destroy();
            let grid = this.controller.gameModel.createATopBall(position);
            this.findBall(grid);
        });

        global.bubbleBreak = ((ball) => {
            this.controller.gameModel.removeBubble(ball.getComponent("ball").model);

            ball.active = false;
        });

        this.gameStart();

        /*this.schedule(function(){
            if(this.controller.cmd.length > 0){
                this.controller.cmd.push("moveAllBall");
            }else{
                this.controller.cmd.push("moveAllBall");
                this.readFatherCmd("moveAllBall");
            }
        },10);*/
    },

    gameStart:function(){
        this.animationFirst();
    },

    animationFirst:function(){
        /*constValue.dropTime = 1;
        this.controller.gameModel.moveBallArry(100);
        this.node.y += 100;
        this.readCmd('moveAllBall');

        this.schedule(function(){
            constValue.dropTime = 1;
            this.node.y -= 100;
            this.readCmd('moveAllBall');
        },5);*/
    },

    removeBallFromPool:function(ball){
        this.balls.put(ball);
    },

    findBall:function(pos){
        let ball = this.controller.gameModel.createBall(pos);
        let aniView = this.balls.get();
        aniView.parent = this.node;
        this.ballsView.push(aniView);
        let cellViewScript = aniView.getComponent("ball");
        cellViewScript.initWithModel(ball);
        this.rewriteBallsArry();

        this.scheduleOnce(function(){
            this.startAction();
            this.currentJudgeBall = ball;
            this.rewriteGameCmd();
        },constValue.timeArry.tinyTime);
    },

    readCmd:function(msg){
        this.controller.gameModel.spliceCmd();
        switch (msg) {
            case 'removeBall':
                if(this.currentJudgeBall){
                    let models = this.controller.gameModel.judgeRemoveBall(this.currentJudgeBall);
                    if(models.length > 0){
                        this.startAction();
                        this.moveBall();
                        this.doSomething((models.length * constValue.timeArry.ballBreakTimeInterval));
                    }else{
                        this.rewriteGameCmd();
                    }
                }
                break;
            case 'dropBall':
                let models = this.controller.gameModel.judgeDropBall();
                if(models.length > 0){
                    this.startAction();
                    this.moveBall();
                    this.doSomething(constValue.timeArry.tinyTime);
                }else{
                    this.rewriteGameCmd();
                }
                break;
            default:
                break;
        }
    },

    readFatherCmd:function(msg){
        //this.controller.spliceCmd();
        switch (msg) {
            case 'moveAllBall':
                for(let i in this.ballsView){
                    let ballScript = this.ballsView[i].getComponent("ball");
                    ballScript.stopAction();
                }
                this.controller.gameModel.moveBallArry(100);
                this.topWall.runAction(cc.moveTo(constValue.timeArry.moveBallArryTime, cc.v2(0,this.topWall.y-100)));
                for(let i in this.ballsView){
                    let ballScript = this.ballsView[i].getComponent("ball");
                    ballScript.updateView();
                }
                this.controller.gameModel.cleanCmd();
                this.scheduleOnce(function(){
                    this.controller.cmd = [];
                },constValue.timeArry.moveBallArryTime);
                break;
            default:
                break;
        }
    },

    /*rewriteGameCmd:function(){
        if(this.controller.gameModel.cmd.length > 0){
            let msg = this.controller.gameModel.readCmd();
            this.readCmd(msg);
        }else{
            this.fireBallLastCheak();

            /!*this.scheduleOnce(function(){
                this.controller.cmd = [];
            },constValue.timeArry.moveBallArryTime);*!/

            this.currentJudgeBall = null;
            this.controller.gameModel.cleanCmd();
            this.controller.gameModel.testLineNum();
            this.controller.spliceCmd();
            if(this.controller.cmd.length > 0){
                this.readFatherCmd(this.controller.cmd[0]);
            }
        }
    },*/

    rewriteGameCmd:function(){
        if(this.controller.gameModel.cmd.length > 0){
            let msg = this.controller.gameModel.readCmd();
            this.readCmd(msg);
        }else{
            this.fireBallLastCheak();

            this.currentJudgeBall = null;
            this.controller.gameModel.cleanCmd();

            if(global.currentBarrier !== 10){
                this.controller.gameModel.testLineNum();
            }else{
                this.controller.gameModel.testLineNumBossBarrier();
            }



            this.scheduleOnce(function(){
                this.controller.spliceCmd();
                if(this.controller.cmd.length > 0){
                    this.readFatherCmd(this.controller.cmd[0]);
                }
            },constValue.timeArry.fireBallInterval);
        }
    },

    fireBallLastCheak:function(){
        let balls = [];
        balls.push(this.currentJudgeBall);
        this.controller.gameModel.findNinthBalls(balls);
        this.startAction();
    },

    doSomething:function(delayTime){
        this.scheduleOnce(function(){
            this.rewriteGameCmd();
        },delayTime);
    },

    rewriteBallsArry:function(){
        let arryA = [];
        for(let j in this.controller.gameModel.balls){
            for(let i in this.ballsView){
                if(this.controller.gameModel.balls[j] === this.ballsView[i].getComponent("ball").model){
                    arryA.push(this.ballsView[i]);
                }
            }
        }
        this.ballsView = arryA;
    },

    startAction:function(){
        for(let i in this.ballsView){
            let ballScript = this.ballsView[i].getComponent("ball");
            ballScript.stopAction();
            ballScript.updateView();
        }
    },

    moveBall: function(){
        for(let i in this.ballsView){
            if(this.ballsView[i].getComponent("ball").model.isDeath){
                this.ballsView[i] = null;
            }
        }
        for(let i=0;i < this.ballsView.length; i++){
            if(this.ballsView[i] === null){
                this.ballsView.splice(i,1);
                i--;
            }
        }
    },

    createBallPool: function(){
        this.balls = new cc.NodePool();
        for (let i = 0; i < constValue.initBallNum; i++) {
            let ball = cc.instantiate(this.ballPre);
            this.balls.put(ball);
        }
    },

    initWithBallModels: function(ballsModels){
        this.createBallPool();
        this.ballsView = [];
        for(let i = 0;i < this.controller.gameModel.balls.length;i++){
            if(this.balls.size() > 0){
                let aniView = this.balls.get();
                aniView.parent = this.node;
                let cellViewScript = aniView.getComponent("ball");
                cellViewScript.initWithModel(ballsModels[i]);

                aniView.position = {
                    x:this.controller.gameModel.balls[i].x,
                    y:this.controller.gameModel.balls[i].y,
                }
                this.ballsView[i] = aniView;
            }
        }
    },

    setController:function(controller){
        this.controller = controller;
    },
});
