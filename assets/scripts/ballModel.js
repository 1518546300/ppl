export default function ballModel(){
    this.type = undefined;
    this.x = 1;
    this.y = 1;
    this.left = undefined;
    this.right = undefined;
    this.top1 = undefined;
    this.top2 = undefined;
    this.lower1 = undefined;
    this.lower2 = undefined;
    this.isDeath = false;
    this.addYPos = 0;
    this.cmd = [];
}

ballModel.prototype.initBall = function(grid){
    this.x = grid.x;
    this.y = grid.y;
    this.type = grid.type;
}

ballModel.prototype.init = function(type){
    this.type = type;
}

ballModel.prototype.setXY = function(x , y){
    this.x = x;
    this.y = y;
}

ballModel.prototype.moveTo = function(time){
    this.cmd.push({
        action: "moveTo",
        keepTime: time,
        /*keepTime: ANITIME.TOUCH_MOVE,
        playTime: playTime,
        pos: pos*/
    });
    /*this.x = pos.x;
    this.y = pos.y;*/
}

ballModel.prototype.changeColor = function(num , time){
    if(this.type === 9){
        this.type = num;
        this.cmd.push({
            action: "changeColor",
            playTime:time,
        });
    }

}

ballModel.prototype.drop = function(){
    this.cmd.push({
        action: "drop",
    });
    this.isDeath = true;
}

ballModel.prototype.toDie = function(time){
    this.cmd.push({
        action: "toDie",
        delayTime: time,
    });
    this.isDeath = true;
}

ballModel.prototype.toShake = function(yPos){
    this.cmd.push({
        action: "toShake",
    });
    this.addYPos = yPos;
}
