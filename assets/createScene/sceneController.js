var constValue = require('constValue');
var global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        gridIndicate:{
            default: null,
            type: cc.Node
        },

        frameRectangle:{
            default:null,
            type:cc.Prefab
        },

        ballPre:{
            default:null,
            type:cc.Prefab
        },
    },

    onLoad () {
        this.grids = [];
        for(let i = 0;i < constValue.mastHeight;i++){
            this.grids[i] = [];
            if(i%2){
                for(let j = 0;j < 7;j++){
                    this.grids[i][j] = this.initGrid(i , j);
                }
            }else{
                for(let j = 0;j < 8;j++){
                    this.grids[i][j] = this.initGrid(i , j);
                }
            }
        }

        this.gridsFrame = [];
        for(let i = 0;i < this.grids.length;i++){
            this.gridsFrame[i] = [];
            for(let j = 0;j < this.grids[i].length;j++){
                this.gridsFrame[i][j] = cc.instantiate(this.frameRectangle);
                this.gridsFrame[i][j].parent = this.node;
                this.gridsFrame[i][j].position = {
                    x:this.grids[i][j].x,
                    y:this.grids[i][j].y,
                };
            }
        }

        this.setListener();

        this.gridIndicate.position = {
            x:this.grids[0][0].x,
            y:this.grids[0][0].y,
        };
        global.choiceGrid = this.gridsFrame[0][0];
    },



    setListener: function(){
        this.node.on(cc.Node.EventType.TOUCH_START, function(eventTouch){
            let temp = this.node.convertToNodeSpaceAR(eventTouch.getLocation());
            for(let i = 0;i < this.gridsFrame.length;i++){
                for(let j = 0;j < this.gridsFrame[i].length;j++){
                    if((this.gridsFrame[i][j].position.x+(this.gridsFrame[i][j].width)/2) > temp.x && (this.gridsFrame[i][j].position.x-(this.gridsFrame[i][j].width)/2) < temp.x && (this.gridsFrame[i][j].position.y+(this.gridsFrame[i][j].height)/2) > temp.y && (this.gridsFrame[i][j].position.y-(this.gridsFrame[i][j].height)/2) < temp.y){
                        this.gridIndicate.position = this.gridsFrame[i][j].position;
                        global.choiceGrid = this.gridsFrame[i][j];
                        return;
                    }
                }
            }
        }, this);
    },

    initGrid:function (x , y) {
        let temp = {};
        if(x%2){
            temp.y = constValue. createMap.rowInitPosition - x * constValue.createMap.rowInterval;
            temp.x = constValue.createMap.singleLineX + y * constValue.createMap.columnInterval;
        }else{
            temp.y = constValue.createMap.rowInitPosition - x * constValue.createMap.rowInterval;
            temp.x = constValue.createMap.pairLineX + y * constValue.createMap.columnInterval;
        }

        return temp;
    },

    outputBallsArry:function () {
        let arr = "";
        for(let i = 0;i < this.gridsFrame.length;i++){
            for(let j = 0;j < this.gridsFrame[i].length;j++){
                let num = this.gridsFrame[i][j].getComponent("gridJs").status;
                if(num !== -1){
                    arr = arr + (i+1) + ",";
                    arr = arr + (j+1) + ",";
                    arr = arr + num + ",";
                }
            }
        }
        console.log(arr);
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'delete':
                global.choiceGrid.getComponent("gridJs").changeBallSp(-1);
                break;
            case 'output':
                this.outputBallsArry();
                break;
            default:
                break;
        }
    },



});
