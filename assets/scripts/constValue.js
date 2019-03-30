const constValue = {};

constValue.barrierInfo = [
    '1,2,1,3,1,4,1,5,1,6,1,7,' +
    '2,2,2,3,2,4,2,5,2,6,' +
    '3,3,3,4,3,5,3,6,' +
    '4,3,4,4,4,5,' +
    '5,4,5,5,' +
    '6,4',
    '1,3,1,4,1,5,1,6,1,7,' +
    '2,2,2,3,' +
    '3,3,3,4,3,5,3,6,' +
    '4,2,4,3,' +
    '5,3,5,4,' +
    '6,2,6,3',
    '1,2,1,3,1,6,1,7,' +
    '2,2,2,3,2,5,2,6,' +
    '3,2,3,3,3,6,3,7,' +
    '4,2,4,3,4,5,4,6,' +
    '5,2,5,3,5,6,5,7,' +
    '6,2,6,3,6,4,6,5,6,6',
    '1,3,1,4,1,5,1,6,' +
    '2,2,2,3,2,4,2,5,2,6,' +
    '3,2,3,3,' +
    '4,1,4,2,' +
    '5,2,5,3,' +
    '6,2,6,3,6,4,6,5,6,6',
    '1,3,1,4,1,6,1,7,' +
    '2,2,2,3,2,5,2,6,' +
    '3,3,3,4,3,5,3,6,' +
    '4,2,4,3,4,4,4,5,' +
    '5,3,5,4,5,5,' +
    '6,2,6,3,6,5,6,6,' +
    '7,3,7,4,7,6,7,7',
];

constValue.mapValue = {
    'rowInitPosition':543,//540
    'singleLineX':-350,
    'pairLineX':-393,
    'rowInterval':77,
    'columnInterval':87.5,
};

constValue.createMap = {
    'rowInitPosition':-60,//540
    'singleLineX':-280,
    'pairLineX':-320,
    'rowInterval':92,
    'columnInterval':92,
};

constValue.sgeName = [
    'xc_lv',
    'xc_huang',
    'xc_cheng',
    'xc_fen',
    'xc_zi',
    'xc_lan',
];

constValue.nextBallPos = {
    x:-192,
    y:-400,
};

constValue.toolValue = {
    'rainbow':3,
    'bomb':5,
};

constValue.timeArry = {
    'moveBallArryTime':1,
    'ballBreakTimeInterval':0.08,
    'fireBallInterval':0.2,
    'tinyTime':0.0000001,
};

constValue.addLineBallNum = 10;
constValue.updateLineTime = 15;//20

constValue.initBallNum = 110;

constValue.ballType = 5;
constValue.specialBallType = 4;

constValue.width = 10;
constValue.mastHeight = 13;

constValue.initBall = 23;//23
//constValue.entirelyBall = 75;

constValue.reviveLine = 7;
constValue.backgroundWidth = 466;
constValue.wallInterval = 310; //195
constValue.ballNumAccount = 100;

constValue.arrowLength = 160;
constValue.arrowRotation = 56;

constValue.aimingNum = 20;
constValue.aimingBallSpeed = 1;
constValue.aimingInterval = 50;
constValue.aimingInitPosY = 170;
constValue.fireAimingInterval = 1.05;

constValue.aimingYDistance = 3000;

constValue.myBallSpeed = 3000;

constValue.arrowRotationRange = 5;

module.exports = constValue;
export default constValue;
