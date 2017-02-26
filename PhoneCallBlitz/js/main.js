"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 288, 528, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'one', 'assets/onebutton.png' );
        game.load.image( 'two', 'assets/twobutton.png' );
        game.load.image( 'three', 'assets/threebutton.png' );
        game.load.image( 'four', 'assets/fourbutton.png' );
        game.load.image( 'five', 'assets/fivebutton.png' );
        game.load.image( 'six', 'assets/sixbutton.png' );
        game.load.image( 'seven', 'assets/sevenbutton.png' );
        game.load.image( 'eight', 'assets/eightbutton.png' );
        game.load.image( 'nine', 'assets/ninebutton.png' );
        game.load.image( 'zero', 'assets/zerobutton.png' );
        game.load.image( 'call', 'assets/callbutton.png' );
        game.load.image( 'back', 'assets/backbutton.png' );
        game.load.image( 'phone', 'assets/phone.png' );
        game.load.image('endscreen', 'assets/endscreen.png');
        game.load.audio('beep1', 'assets/beep1.ogg');
        game.load.audio('beep2', 'assets/beep2.ogg');
        game.load.audio('beep3', 'assets/beep3.ogg');
        game.load.audio('beep4', 'assets/beep4.ogg');
        game.load.audio('beep5', 'assets/beep5.ogg');
        game.load.audio('callsound', 'assets/callsound.ogg');
        game.load.audio('backsound', 'assets/backbuttonsound.ogg');
    }
    
    var phone;
    var numbers;
    var call;
    var back;
    var numToCall = new Array();
    var numToCallTxt;
    var callNum = new Array();
    var callNumTxt;
    var endTxt;
    var endScreen;
    var callsMade=0;
    var callsMissed=0;
    var endScore=0;
    var scoreTxt;
    var timer;
    var timerTxt;
    var timerEvent;
    var gameOver = false;
    var beeps = new Array;
    var beep1;
    var beep2;
    var beep3;
    var beep4;
    var beep5;
    var bSound;
    var callSound;
    function create() {
        phone = game.add.sprite(0,64,'phone');
        
        numbers = game.add.group();
        numbers.create(24,176,'one');
        numbers.create(112,176,'two');
        numbers.create(200,176,'three');
        numbers.create(24,264,'four');
        numbers.create(112,264,'five');
        numbers.create(200,264,'six');
        numbers.create(24,352,'seven');
        numbers.create(112,352,'eight');
        numbers.create(200,352,'nine');
        numbers.create(112,440,'zero');
        
        for (var i = 0, len = numbers.children.length; i < len; i++) {
            numbers.children[i].inputEnabled = true;
            numbers.children[i].numVal = (i + 1)%10;
            numbers.children[i].events.onInputDown.add(addNum,this);
        }
        call = game.add.sprite(200,440,'call');
        call.inputEnabled = true;
        call.events.onInputDown.add(callNumber,this);
        
        back = game.add.sprite(24,440,'back');
        back.inputEnabled = true;
        back.events.onInputDown.add(backNum,this);
        
        var style = { font: "24px Verdana", fill: "#000", align: "center" };
        var style2 = { font: "24px Verdana", fill: "#fff", align: "center" };
        var style3 = { font: "18px Verdana", fill: "#fff", align: "center" };
        callNumTxt = game.add.text( 145, 105, "thing", style );
        callNumTxt.anchor.setTo( 0.5, 0.0 );
        numToCallTxt = game.add.text( 32, 10, "", style2 );
        newNumber();
        timerTxt = game.add.text(game.world.width/2-34, 34, "", style2);
        timer = game.time.create();
        
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 0, endGame, this);
        timer.start();
        
        endScreen = game.add.sprite(0,0,'endscreen');
        endScreen.visible = false;
        
        endTxt = game.add.text(32, game.world.height/2-50, "", style3);
        endTxt.visible = false;
        beep1 = game.add.audio('beep1');
        beep2 = game.add.audio('beep2');
        beep3 = game.add.audio('beep3');
        beep4 = game.add.audio('beep4');
        beep5 = game.add.audio('beep5');
        bSound = game.add.audio('backsound');
        callSound = game.add.audio('callsound');
        beeps = [beep1,beep2,beep3,beep4,beep5];
        
    }
    
    function update() {
        endTxt.text = ("Game Over\nYou made " + callsMade + " correct calls\n and " + callsMissed + " incorrect calls.\n Your score is " + endScore + "\nHit R to restart");
        timerTxt.text = formatTimer(Math.round((timerEvent.delay - timer.ms) / 1000));
        
        callNumTxt.text = callNum.join("");
        if (gameOver){
            if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
                restart();
            }
        }
    }
    
    function addNum(number, pointer) {
        if(callNum.length<12){
            beeps[game.rnd.integerInRange(0, 4)].play();
            if(callNum.length == 3 || callNum.length == 7){
                callNum.push("-");
            }
            callNum.push(number.numVal);
        }
    }
    function callNumber(){
        callSound.play();
        if (callNum.length != numToCall.length){
            newNumber();
            clearNum();
            score(-1);
        }
        else{
            for (var i = 0, l=callNum.length; i < l; i++) {           
                if (callNum[i] != numToCall[i]) { 
                    newNumber();
                    clearNum();
                    score(-1);
                    return;
                }           
            }
            newNumber();
            clearNum();
            score(1);
        }
    }
    function backNum(){
        if(callNum.length>0){
            bSound.play();
            if(callNum.length == 5 || callNum.length == 9){
                callNum.pop();
                callNum.pop();
            }
            else{
                 callNum.pop();
            }
        }
    }
        function newNumber(){
            numToCall = new Array;
            for (var i = 0; i < 12;i++){
                if(i == 3 || i == 7){
                    numToCall.push("-");
                }
                else{
                    numToCall.push(game.rnd.integerInRange(0, 9));
                }
            }
            numToCallTxt.text = "Call: " + numToCall.join("");
        }
    function clearNum(){
        callNum = new Array;
        callNumTxt.text = "";
    }
    function score(increase){
        endScore += increase;
        if (increase>0){
            callsMade += 1;
        }
        else{
            callsMissed += 1;
        }
    }
    function formatTimer(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }
    function endGame(){
        timer.stop();
        endScreen.visible = true;
        endTxt.visible = true;
        gameOver = true;
    }
    function restart(){
        endScreen.visible = false;
        endTxt.visible = false;
        endScore = 0;
        callsMade = 0;
        callsMissed = 0;
        clearNum();
        newNumber();
        timer = game.time.create();
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 0, endGame, this);
        gameOver = false;
        timer.start();
    }
};
