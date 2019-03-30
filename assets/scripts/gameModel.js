import ballModel from "./ballModel";
var constValue = require('constValue');
var global = require("./global");

export default function GameModel(){
    this.balls = null;
    this.grids = null;
    this.firstRow = 1; //屏幕上以8个球为第一行开始则置为1，否则置为0
    this.ballArry = [];
    this.initFlag = 1;
    this.cmd = [];
}

GameModel.prototype.arrDealPreliminary = function(arr){
    //this.getMyBall(arr);
    this.dealArr(arr);
}

GameModel.prototype.dealArr = function(arr){
    this.balls.length = 0;
    let ballNum = parseInt(arr.length/3);
    for(let i = 0;i < ballNum;i++){
        let ball = new ballModel();
        let gridPos = {};

        gridPos.x = this.grids[parseInt(arr[(i * 3)])][parseInt(arr[(i * 3) + 1])].x;
        gridPos.y = this.grids[parseInt(arr[(i * 3)])][parseInt(arr[(i * 3) + 1])].y;
        gridPos.type = parseInt(arr[(i * 3) + 2]);

        this.grids[parseInt(arr[(i * 3)])][parseInt(arr[(i * 3) + 1])].status = i;

        ball.initBall(gridPos);
        this.balls.push(ball);
    }
}

/*GameModel.prototype.dealArr = function(arr){
    this.balls.length = 0;
    let ballNum = parseInt(arr.length/2);
    for(let i = 0;i < ballNum;i++){
        let ball = new ballModel();
        let gridPos = {};
        //gridPos.type = parseInt(arr[i * 3]);
        gridPos.type = this.createBallColor();
        /!*gridPos.x = this.grids[parseInt(arr[(i * 3) + 1])][parseInt(arr[(i * 3) + 2])].x;
        gridPos.y = this.grids[parseInt(arr[(i * 3) + 1])][parseInt(arr[(i * 3) + 2])].y;*!/

        gridPos.x = this.grids[parseInt(arr[(i * 2)])][parseInt(arr[(i * 2) + 1])].x;
        gridPos.y = this.grids[parseInt(arr[(i * 2)])][parseInt(arr[(i * 2) + 1])].y;

        this.grids[parseInt(arr[(i * 2)])][parseInt(arr[(i * 2) + 1])].status = i;

        ball.initBall(gridPos);
        this.balls.push(ball);
    }
}*/

/*GameModel.prototype.dealToolArr = function(arr){
    let ballNum = parseInt(arr.length/3);
    for(let i = 0;i < ballNum;i++){
        this.balls[this.grids[parseInt(arr[(i * 3)])][parseInt(arr[(i * 3) + 1])].status].type = parseInt(arr[(i * 3) + 2]) + constValue.ballType;
    }
}*/

GameModel.prototype.init = function(initBallArr , initToolArr){
    for(let i = 0;i <= constValue.ballType;i++){
        this.ballArry.push(i);
    }
    this.balls = [];
    this.grids = [];
    this.initGrids();

    let ballArr = initBallArr.split(",");
    //let toolArr = initToolArr.split(",");

    this.dealArr(ballArr);
    //this.dealToolArr(toolArr);

    //this.initBallsAndAddRelationship();
    this.updateBallsRound();
    this.changeNextBall();
    this.initFlag = 0;
}

GameModel.prototype.addInfoToCmd = function(info){
    this.cmd.push(info);
}

GameModel.prototype.readCmd = function(){
    let cmd = this.cmd[0];
    return cmd;
}

GameModel.prototype.spliceCmd = function(){
    this.cmd.splice(0,1);
}

GameModel.prototype.changeNextBall = function(){
    if(this.initFlag === 1){
        global.currentBall = this.createBallColor();
    }else{
        global.currentBall = global.nextBall;
    }
    global.nextBall = this.createBallColor();
}

GameModel.prototype.createBallColor = function() {
    let index = 0;
    if(this.initFlag === 1){
        index = Math.round(Math.random() * constValue.ballType);
        return parseInt(index);
    }else{
        if(this.ballArry.length !== 0){
            while(1){
                index = Math.round(Math.random() * (this.ballArry.length-1));
                if(this.judgeBallsArry(this.ballArry[index])){
                    break;
                }else{
                    for(let i in this.ballArry){
                        if(this.ballArry[i] === this.ballArry[index]){
                            this.ballArry.splice(i,1);
                            break;
                        }
                    }
                }
            }
            return parseInt(this.ballArry[index]);
        }else{
            return -1;
        }
    }
}

GameModel.prototype.judgeBallsArry = function(type) {
    for(let i in this.balls){
        if(this.balls[i].type === type){
            return true;
        }
    }
    if(global.currentBall === type){
        return true;
    }
    return false;
}

GameModel.prototype.initBallsAndAddRelationship = function(){
    let k = 0;
    for(let i = 1;i < constValue.mastHeight;i++){
        if(k < constValue.initBall){
            for(let j = 1;j < constValue.width;j++){
                if(k < constValue.initBall){
                    if(this.grids[i][j].status !== -1){
                        this.balls[k]= new ballModel();
                        this.initBalls(this.balls[k] , this.grids[i][j]);
                        this.grids[i][j].status = k;
                        k++;
                    }
                }else{
                    return;
                }
            }
        }else{
            return;
        }
    }
}

GameModel.prototype.initBalls = function (ball , grid) {
    ball.setXY(grid.x , grid.y);
    ball.init(this.createBallColor());
}

GameModel.prototype.getBalls = function(){
    return this.balls;
}

GameModel.prototype.initGrids = function(){
    if(this.firstRow === 0){
        for(let i = 0;i < constValue.mastHeight;i++){
            this.grids[i] = [];
            for(let j = 0;j < constValue.width;j++){
                this.grids[i][j] = this.initGrid(i , j , 0);
            }
        }
    }else{
        for(let i = 0;i < constValue.mastHeight;i++){
            this.grids[i] = [];
            for(let j = 0;j < constValue.width;j++){
                this.grids[i][j] = this.initGrid(i , j , 1);
            }
        }
    }
}

GameModel.prototype.initGrid = function (x , y , flag) {
    let temp = {};
    if(x === 0 || y >= 8 || y === 0){
        temp.status = -1;
    }else{
        temp.status = -2;
    }
    if(flag === 0){
        if(x%2){
            temp.y = constValue.mapValue.rowInitPosition - x * constValue.mapValue.rowInterval;
            temp.x = constValue.mapValue.singleLineX + y * constValue.mapValue.columnInterval;
        }else{
            temp.y = constValue.mapValue.rowInitPosition - x * constValue.mapValue.rowInterval;
            temp.x = constValue.mapValue.pairLineX + y * constValue.mapValue.columnInterval;
        }
        if(x !== 0 && !(x%2) && y === 8){
            temp.status = -2;
        }
    }else{
        if(x%2){
            temp.y = constValue.mapValue.rowInitPosition - x * constValue.mapValue.rowInterval;
            temp.x = constValue.mapValue.pairLineX + y * constValue.mapValue.columnInterval;
        }else{
            temp.y = constValue.mapValue.rowInitPosition - x * constValue.mapValue.rowInterval;
            temp.x = constValue.mapValue.singleLineX + y * constValue.mapValue.columnInterval;
        }
        if(x !== 0 && (x%2) && y === 8){
            temp.status = -2;
        }
    }
    return temp;
}

GameModel.prototype.createBall = function(pos){
    let ball = new ballModel();
    ball.setXY(pos.x , pos.y);
    ball.init(global.flyBall);
    this.balls.push(ball);
    this.rewriteBallsArry();
    this.ballsShake(ball);

    this.addInfoToCmd("removeBall");

    return ball;
}

GameModel.prototype.findNinthBalls = function(balls){
    let a = [];
    let time = 0;
    for(let i in balls){
        this.ballRoundFunc(balls[i] , a , 9);
    }
    if(balls.length > 1){
        time = a.length*constValue.timeArry.ballBreakTimeInterval;
    }
    for(let i in a){
        this.balls[a[i]].changeColor(this.createBallColor() , time);
    }
}

GameModel.prototype.ballRoundFunc = function(ball , a , num){
    if(this.judgeGridStatus(ball.top1)){
        if(this.balls[ball.top1.status].type === num){
            if(this.ergidicArry(ball.top1.status , a)){
                a.push(ball.top1.status);
            }
        }
    }
    if(this.judgeGridStatus(ball.top2)){
        if(this.balls[ball.top2.status].type === num){
            if(this.ergidicArry(ball.top2.status , a)){
                a.push(ball.top2.status);
            }
        }
    }
    if(this.judgeGridStatus(ball.left)){
        if(this.balls[ball.left.status].type === num){
            if(this.ergidicArry(ball.left.status , a)){
                a.push(ball.left.status);
            }
        }
    }
    if(this.judgeGridStatus(ball.right)){
        if(this.balls[ball.right.status].type === num){
            if(this.ergidicArry(ball.right.status , a)){
                a.push(ball.right.status);
            }
        }
    }
    if(this.judgeGridStatus(ball.lower1)){
        if(this.balls[ball.lower1.status].type === num){
            if(this.ergidicArry(ball.lower1.status , a)){
                a.push(ball.lower1.status);
            }
        }
    }
    if(this.judgeGridStatus(ball.lower2)){
        if(this.balls[ball.lower2.status].type === num){
            if(this.ergidicArry(ball.lower2.status , a)){
                a.push(ball.lower2.status);
            }
        }
    }
}

GameModel.prototype.findRoundBall = function(ball , arry , jj){
    let aArry = [];
    if(ball.top1.status !== -2 && ball.top1.status !== -1){
        if(this.balls[ball.top1.status].type !== 10){
            if(this.ergidicArry(ball.top1.status , arry)){
                aArry.push(ball.top1.status);
            }
        }
    }
    if(ball.top2.status !== -2 && ball.top2.status !== -1){
        if(this.balls[ball.top2.status].type !== 10){
            if(this.ergidicArry(ball.top2.status , arry)){
                aArry.push(ball.top2.status);
            }
        }

    }
    if(ball.left.status !== -2 && ball.left.status !== -1){
        if(this.balls[ball.left.status].type !== 10){
            if(this.ergidicArry(ball.left.status , arry)){
                aArry.push(ball.left.status);
            }
        }

    }
    if(ball.right.status !== -2 && ball.right.status !== -1){
        if(this.balls[ball.right.status].type !== 10){
            if(this.ergidicArry(ball.right.status , arry)){
                aArry.push(ball.right.status);
            }
        }

    }
    if(ball.lower1.status !== -2 && ball.lower1.status !== -1){
        if(this.balls[ball.lower1.status].type !== 10){
            if(this.ergidicArry(ball.lower1.status , arry)){
                aArry.push(ball.lower1.status);
            }
        }

    }
    if(ball.lower2.status !== -2 && ball.lower2.status !== -1){
        if(this.balls[ball.lower2.status].type !== 10){
            if(this.ergidicArry(ball.lower2.status , arry)){
                aArry.push(ball.lower2.status);
            }
        }

    }

    for(let i in aArry){
        this.balls[aArry[i]].toShake(jj * 8);
    }

    arry = [...arry,...aArry];
    return arry;
}

GameModel.prototype.ballsShake = function(ball){
    let arry = [];
    arry = this.findRoundBall(ball , arry , 1);
    for(let i in arry){
        arry = this.findRoundBall(this.balls[arry[i]] , arry , 2);
    }
}

GameModel.prototype.createATopBall = function(pos){
    let a = [];
    let d = [];

    for(let i = 0;i < constValue.width;i++){
        if(this.grids[1][i].status === -2){
            a.push(this.grids[1][i]);
        }
    }
    for(let i in a){
        let x = Math.abs(pos.x - a[i].x);
        let y = Math.abs(pos.y - a[i].y);
        d[i] = Math.sqrt((x * x) + (y * y));
    }
    let min = d[0];
    let index = 0;
    for(let i = 0;i < d.length;i++){
        if(min > d[i]){
            min = d[i];
            index = i;
        }
    }
    return a[index];
}

GameModel.prototype.judgeRemoveBall = function(ball){
    let models = [];
    let removeBall = [];
    if(ball.type === 11){
        models = this.bombBall(ball);
    }else{
        let bubbles = this.findBallRound(ball , 8);
        removeBall = this.judgeBallRelationship(ball);
        let a = [...removeBall , ...bubbles];
        models = this.removeBall(a);
    }
    if(models.length > 0){
        this.findNinthBalls(models);
        this.addInfoToCmd("dropBall");
    }
    return models;
}

GameModel.prototype.findBallRound= function(ball , num){
    let a = [];

    if(this.judgeGridStatus(ball.top1)){
        if(this.balls[ball.top1.status].type === num){
            a.push(ball.top1.status);
        }
    }
    if(this.judgeGridStatus(ball.top2)){
        if(this.balls[ball.top2.status].type === num){
            a.push(ball.top2.status);
        }
    }
    if(this.judgeGridStatus(ball.left)){
        if(this.balls[ball.left.status].type === num){
            a.push(ball.left.status);
        }
    }
    if(this.judgeGridStatus(ball.right)){
        if(this.balls[ball.right.status].type === num){
            a.push(ball.right.status);
        }
    }
    if(this.judgeGridStatus(ball.lower1)){
        if(this.balls[ball.lower1.status].type === num){
            a.push(ball.lower1.status);
        }
    }
    if(this.judgeGridStatus(ball.lower2)){
        if(this.balls[ball.lower2.status].type === num){
            a.push(ball.lower2.status);
        }
    }
    return a;
}

GameModel.prototype.judgeGridStatus = function(grid){
    if(grid.status !== -2 && grid.status !== -1){
        return true;
    }else{
        return false;
    }
}

GameModel.prototype.removeBubble= function(bubble){
    let a = [];
    let index = this.findBallWithBall(bubble);
    a.push(index);
    this.removeBall(a);
}

GameModel.prototype.bombBall= function(bomb){
    let a = [];
    let index = this.findBallWithBall(bomb);
    a.push(index);
    if(bomb.top1.status !== -2 && bomb.top1.status !== -1){
        a.push(bomb.top1.status);
    }
    if(bomb.top2.status !== -2 && bomb.top2.status !== -1){
        a.push(bomb.top2.status);
    }
    if(bomb.left.status !== -2 && bomb.left.status !== -1){
        a.push(bomb.left.status);
    }
    if(bomb.right.status !== -2 && bomb.right.status !== -1){
        a.push(bomb.right.status);
    }
    if(bomb.lower1.status !== -2 && bomb.lower1.status !== -1){
        a.push(bomb.lower1.status);
    }
    if(bomb.lower2.status !== -2 && bomb.lower2.status !== -1){
        a.push(bomb.lower2.status);
    }

    let models = this.removeBall(a);
    return models;
}

GameModel.prototype.judgeDropBall= function(){
    let a = [];
    let b = [];
    let models = [];
    for(let i in this.balls){
        if(this.balls[i].type === 6){
            if((this.balls[i].lower1.status === -2 || this.balls[i].lower1.status === -1) && (this.balls[i].lower2.status === -2 || this.balls[i].lower2.status === -1)){
                a.push(i);
            }
        }
    }
    for(let i in this.balls){
        b.length = 0;
        if(!this.findSingleBall(i , b)){
            a.push(i);
        }
    }
    if(a.length > 0){
        models = this.dropBall(a);
        this.addInfoToCmd("dropBall");
    }
    return models;
}

GameModel.prototype.judgeBallRelationship = function(ball){
    let index = this.findBallWithBall(ball);
    let a = [];
    if(ball.type === 7){
        let ballNum = [];
        for(let i = 0;i <= constValue.ballType;i++){
            let ballCount = [];
            this.findSimiliarBall(i , index , ballCount);
            ballNum.push(ballCount.length * 10 + i);
        }
        ballNum.sort(function(a,b){
            return a-b;
        });

        if(ballNum[ballNum.length-1]/10 >= 3){
            this.findSimiliarBall(ballNum[ballNum.length-1]%10 , index , a);
        }
    }else{
        this.findSimiliarBall(this.balls[index].type , index , a);
    }

    if(a.length >= 3){
        return a;
    }else{
        return [];
    }
}

GameModel.prototype.testLineNum = function(){
    if(this.balls.length === 0){
        global.gameOverWaiting(1);
        return;
    }
    if(global.myBulletNum === 0){
        global.gameOverWaiting(0);
        return;
    }
    for(let i = 0;i < 10;i++){
        if(this.grids[constValue.mastHeight - 2][i].status >= 0){
            global.gameOverWaiting(0);
            return;
        }
    }
}

GameModel.prototype.testLineNumBossBarrier = function(){
    if(this.balls.length === 0){
        global.gameOverWaiting(0);
        return;
    }
    /*if(global.myBulletNum === 0){
        global.gameOverWaiting(0);
        return;
    }*/
    for(let i = 0;i < 10;i++){
        if(this.grids[constValue.mastHeight - 2][i].status >= 0){
            global.gameOverWaiting(1);
            return;
        }
    }
}

GameModel.prototype.initRound= function(x , y , ball){
    let funcX = x;
    if(this.firstRow === 0){
        funcX++;
    }
    if(funcX % 2){
        ball.top1 = this.grids[x-1][y-1];
        ball.top2 = this.grids[x-1][y];
        ball.left = this.grids[x][y-1];
        ball.right = this.grids[x][y+1];
        ball.lower1 = this.grids[x+1][y-1];
        ball.lower2 = this.grids[x+1][y];
    }else{
        ball.top1 = this.grids[x-1][y];
        ball.top2 = this.grids[x-1][y+1];
        ball.left = this.grids[x][y-1];
        ball.right = this.grids[x][y+1];
        ball.lower1 = this.grids[x+1][y];
        ball.lower2 = this.grids[x+1][y+1];
    }
}

GameModel.prototype.moveBallArry = function(distance){
    for(let i = 0;i < constValue.mastHeight;i++){
        for(let j = 0;j < constValue.width;j++){
            this.grids[i][j].y = this.grids[i][j].y - distance;
        }
    }
    for(let i in this.balls){
        this.balls[i].y = this.balls[i].y - distance;
        this.balls[i].moveTo(constValue.timeArry.moveBallArryTime);
    }
}

GameModel.prototype.updateBallsRound= function(){
    for(let i = 0;i < this.balls.length;i++){
        let temp = this.findGridWithBallIndex(i);
        this.initRound(temp.i , temp.j , this.balls[i]);
    }
}

GameModel.prototype.removeBall= function(a){
    let models = [];
    for(let j = 0;j < a.length;j++){
        if(this.balls[a[j]] !== undefined){
            this.balls[a[j]].isDeath = true;
        }else{
            return [];
        }
    }
    let b = this.removeBallArryRewrite(a);
    for(let i in b){
        models.push(this.balls[b[i]]);
        this.balls[b[i]].toDie((i) * constValue.timeArry.ballBreakTimeInterval);
    }
    for(let i in a){
        this.balls[a[i]] = null;
    }
    for(let i=0;i < this.balls.length; i++){
        if(this.balls[i] === null){
            this.balls.splice(i,1);
            i--;
        }
    }
    this.rewriteBallsArry();
    return models;
}

GameModel.prototype.removeBallArryRewrite= function(a){
    let b = [];
    for(let i in a){
        let index = parseInt(this.findBallWithBall(this.balls[a[i]]));
        b.push(index);
    }
    return this.bubbleSort(b);
}

GameModel.prototype.bubbleSort = function(arr){
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] < arr[j+1]) {
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

GameModel.prototype.dropBall= function(a){
    let models = [];
    for(let j = 0;j < a.length;j++){
        this.balls[a[j]].isDeath = true;
    }
    for(let j = 0;j < a.length;j++){
        models[j] = this.balls[a[j]];
        models[j].drop();
    }
    for(let i in a){
        this.balls[a[i]] = null;
    }
    for(let i=0;i < this.balls.length; i++){
        if(this.balls[i] === null){
            this.balls.splice(i,1);
            i--;
        }
    }
    this.rewriteBallsArry();
    return models;
}

GameModel.prototype.creatNewLine= function(){
    let returnModels = [];
    if(this.firstRow === 1){
        for(let i = 1;i < 8;i++){
            let ball = new ballModel();
            this.initBalls(ball , this.grids[0][i]);
            this.balls.push(ball);
            returnModels.push(ball);
        }
    }else{
        for(let i = 1;i < 9;i++){
            let ball = new ballModel();
            this.initBalls(ball , this.grids[0][i]);
            this.balls.push(ball);
            returnModels.push(ball);
        }
    }
    return returnModels;
}

/*GameModel.prototype.newLineInfluence = function(){
    if(this.firstRow === 1){
        this.firstRow = 0;
    }else{
        this.firstRow = 1;
    }

    this.changeBallPosition();
}*/

/*GameModel.prototype.changeBallPosition = function(){
    this.initGrids();
    for(let i in this.balls){
        this.balls[i].y = this.balls[i].y - constValue.mapValue.rowInterval;
        let temp = this.findGridWithBallIndex(i);
        this.rewriteGrids(temp.i ,temp.j , i);
        this.balls[i].moveTo();
    }
    this.rewriteBallsArry();
}*/

/*GameModel.prototype.gameAnim = function(){
    for(let i in this.balls){
        this.balls[i].y = this.balls[i].y + 100;
        this.balls[i].moveTo();
    }
}*/

GameModel.prototype.rewriteBallsArry = function(){
    this.rewriteGridsArry();
    let k = 0;
    let arryA = [];
    for(let i = 0;i < this.grids.length;i++){
        for(let j = 0;j < this.grids[i].length;j++){
            for(let ballIndex in this.balls){
                if(this.grids[i][j].x === this.balls[ballIndex].x && this.grids[i][j].y === this.balls[ballIndex].y){
                    this.grids[i][j].status = k;
                    arryA.push(this.balls[ballIndex]);
                    k++;
                }
            }
        }
    }
    this.balls = arryA;
    this.updateBallsRound();
}

GameModel.prototype.rewriteGridsArry = function(){
    for(let i = 0;i < this.grids.length;i++){
        for(let j = 0;j < this.grids[i].length;j++){
            if(i === 0 || j >= 8 || j === 0){
                this.grids[i][j].status = -1;
            }else{
                this.grids[i][j].status = -2;
            }
            if(this.firstRow === 0){
                if(i !== 0 && !(i%2) && j === 8){
                    this.grids[i][j].status = -2;
                }
            }else{
                if(i !== 0 && (i%2) && j === 8){
                    this.grids[i][j].status = -2;
                }
            }
        }
    }
}

GameModel.prototype.rewriteGrids= function(i , j , index){
    this.grids[i][j].status = parseInt(index);
}



GameModel.prototype.findGridWithBallIndex = function(index){
    let k = {};
    for(let i = 0;i < this.grids.length;i++){
        for(let j = 0;j < this.grids[i].length;j++){
            if(this.grids[i][j].x === this.balls[index].x && this.grids[i][j].y === this.balls[index].y){
                k.i = i;
                k.j = j;
                return k;
            }
        }

    }
}

GameModel.prototype.findGridWithBall = function(x , y){
    let k = {};
    for(let i = 0;i < this.grids.length;i++){
        for(let j = 0;j < this.grids[i].length;j++){
            if(this.grids[i][j].x === x && this.grids[i][j].y === y){
                k.i = i;
                k.j = j;
                return k;
            }
        }

    }
}

GameModel.prototype.findBallWithBall = function(ball){
    for(let i = 0;i < this.balls.length;i++){
        if(this.balls[i].x === ball.x && this.balls[i].y === ball.y){
            return i;
        }
    }
}

GameModel.prototype.ergidicArry= function(i , a){
    for(let j = 0;j < a.length;j++){
        if(i === a[j]){
            return false;
        }
    }
    return true;
}


GameModel.prototype.cleanCmd = function(){
    for(let i in this.balls){
        this.balls[i].cmd = [];
    }
}

GameModel.prototype.findSimiliarBall= function(type , i , a){
    if(this.balls[i].top1.status !== -1 || this.balls[i].top2.status !== -1){
        if(this.balls[i].top1.status !== -2 && this.balls[i].top1.status !== -1){
            if(this.balls[this.balls[i].top1.status].type === type || (this.balls[this.balls[i].top1.status].type === 7)){
                if(this.ergidicArry(this.balls[i].top1.status , a)){
                    a.push(this.balls[i].top1.status);
                    this.findSimiliarBall(type , this.balls[i].top1.status , a);
                }
            }
        }
        if(this.balls[i].top2.status !== -2 && this.balls[i].top2.status !== -1){
            if((this.balls[this.balls[i].top2.status].type === type) || this.balls[this.balls[i].top2.status].type === 7){
                if(this.ergidicArry(this.balls[i].top2.status , a)){
                    a.push(this.balls[i].top2.status);
                    this.findSimiliarBall(type , this.balls[i].top2.status , a);
                }
            }
        }
    }
    if(this.balls[i].left.status !== -2 && this.balls[i].left.status !== -1){
        if(this.balls[this.balls[i].left.status].type === type || this.balls[this.balls[i].left.status].type === 7){
            if(this.ergidicArry(this.balls[i].left.status , a)){
                a.push(this.balls[i].left.status);
                this.findSimiliarBall(type , this.balls[i].left.status , a);
            }
        }
    }
    if(this.balls[i].right.status !== -2 && this.balls[i].right.status !== -1){
        if(this.balls[this.balls[i].right.status].type === type || this.balls[this.balls[i].right.status].type === 7){
            if(this.ergidicArry(this.balls[i].right.status , a)){
                a.push(this.balls[i].right.status);
                this.findSimiliarBall(type , this.balls[i].right.status , a);
            }
        }
    }
    if(this.balls[i].lower1.status !== -2 && this.balls[i].lower1.status !== -1){
        if(this.balls[this.balls[i].lower1.status].type === type || this.balls[this.balls[i].lower1.status].type === 7){
            if(this.ergidicArry(this.balls[i].lower1.status , a)){
                a.push(this.balls[i].lower1.status);
                this.findSimiliarBall(type , this.balls[i].lower1.status , a);
            }
        }
    }
    if(this.balls[i].lower2.status !== -2 && this.balls[i].lower2.status !== -1){
        if(this.balls[this.balls[i].lower2.status].type === type || this.balls[this.balls[i].lower2.status].type === 7){
            if(this.ergidicArry(this.balls[i].lower2.status , a)){
                a.push(this.balls[i].lower2.status);
                this.findSimiliarBall(type , this.balls[i].lower2.status , a);
            }
        }
    }
}

GameModel.prototype.findSingleBall= function(i , b){
    if(this.balls[i].top1.status === -1 && this.balls[i].top2.status === -1){
        return true;
    }else{
        if(this.balls[i].top1.status !== -1 && this.balls[i].top1.status !== -2){
            if(this.findSingleBall(this.balls[i].top1.status , b)){
                return true;
            }
        }
        if(this.balls[i].top2.status !== -1 && this.balls[i].top2.status !== -2){
            if(this.findSingleBall(this.balls[i].top2.status , b)){
                return true;
            }
        }
        if(this.ergidicArry(this.balls[i].left.status , b)){
            b.push(this.balls[i].left.status);
            if(this.balls[i].left.status !== -1 && this.balls[i].left.status !== -2) {
                if (this.findSingleBall(this.balls[i].left.status , b)) {
                    return true;
                }
            }
        }
        if(this.ergidicArry(this.balls[i].right.status , b)){
            b.push(this.balls[i].right.status);
            if(this.balls[i].right.status !== -1 && this.balls[i].right.status !== -2) {
                if (this.findSingleBall(this.balls[i].right.status , b)) {
                    return true;
                }
            }
        }
    }
    return false;
}
