
cc.Class({
    extends: cc.Component,

    properties: {
        littlePaddle:{
            default:null,
            type: cc.Prefab
        },

        littleBall:{
            default:null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

        this.init();

        this.setListener();
    },

    setListener: function(){
        this.node.on(cc.Node.EventType.TOUCH_START, function(eventTouch){
            this.changePaddlePos(this.node.convertToNodeSpaceAR(eventTouch.getLocation()));
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(eventTouch){
            this.changePaddlePos(this.node.convertToNodeSpaceAR(eventTouch.getLocation()));
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(eventTouch){
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(eventTouch){
        }, this);
    },

    changePaddlePos: function(temp){
        if(temp.x >= -280 && temp.x <= 280){
            this.paddle.x = temp.x;
        }
    },

    init() {
        this.paddle = cc.instantiate(this.littlePaddle);
        this.paddle.parent = this.node;

        this.ironBall = cc.instantiate(this.littleBall);
        this.ironBall.parent = this.node;

        this.ironBall.getComponent("littleBallJs").init(this);
        //this.paddle.getComponent("littleBallJs").init();

    },

    stopGame() {
        /*this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0);*/
    },

    onBallContactBrick(ballNode, brickNode) {
        /*brickNode.parent = null;
        this.gameModel.addScore(1);
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.stopGame();
        }*/
    },

    onBallContactGround(ballNode, groundNode) {
        this.stopGame();
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    onDestroy() {
        //this.physicsManager.enabled = false;
    }

    /*init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameView.init(this);
        this.ball.init(this);
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber);
        this.overPanel.init(this);
    },

    startGame() {
        this.init();
    },

    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0);
    },

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(1);
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.stopGame();
        }
    },

    onBallContactGround(ballNode, groundNode) {
        this.stopGame();
    },

    onBallContactPaddle(ballNode, paddleNode) {
    },

    onBallContactWall(ballNode, brickNode) {
    },

    onDestroy() {
        this.physicsManager.enabled = false;
    }*/

});
