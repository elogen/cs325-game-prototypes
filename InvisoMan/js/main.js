window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.spritesheet( 'player', 'assets/invisoman.png', 20, 33);
        game.load.image('info', 'assets/info.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('background','assets/background.png');
    }
    var player;
    var background;
    var infoSet;
    var enemies;
    var maxEnemies = 1;
    var maxInfo = 1;
    var maxSpeed = 100;
    var minSpeed = -100;
    var directionTimer = 0;
    var gameOver = false;
    var endTxt;
    var score = 0;
    function create() {
        background = game.add.sprite(0,0,'background');
        
        infoSet = game.add.group();
        infoSet.enableBody = true;
        infoSet.physicsBodyType = Phaser.Physics.ARCADE;
        infoSet.createMultiple(30, 'info');
        
        player = game.add.sprite(0,game.world.height/2,'player');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5,0.5);
        player.alpha = 0;
        
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(150, 'enemy');
        var style = { font: "15px Verdana", fill: "#000", align: "center" };
        endTxt = game.add.text(game.world.width / 2 - 70, 20, "Game Over\nYour score was " + score + "\nHit R to restart", style);
        endTxt.visible = false;
        
    }
    
    function update() {
        endTxt.text = ("Game Over\nYour score was " + score + "\nHit R to restart");
        if (gameOver){
            if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
                restart();
            }
        }
        else{
            if(maxEnemies>=5){
            maxInfo = maxEnemies/10+1;
            }
            if (infoSet.countLiving()<maxInfo){
                var info = infoSet.getFirstExists(false);
                info.reset(game.rnd.integerInRange(0, 780), game.rnd.integerInRange(0, 580));
            }
            if (enemies.countLiving()<maxEnemies){
                var enemy = enemies.getFirstExists(false);
                enemy.body.collideWorldBounds=true;
                enemy.reset(game.rnd.integerInRange(0, 780), game.rnd.integerInRange(0, 580));
            }
            if (player.alpha == 0){
                if (directionTimer<game.time.now){
                    enemies.forEachAlive(function(enemy){
                        enemy.body.velocity.x = game.rnd.integerInRange(-1,1)*150;
                        enemy.body.velocity.y = game.rnd.integerInRange(-1,1)*150;
                    });
                directionTimer = game.time.now + 1000;
                }
            }
            else{
                enemies.forEachAlive(function(enemy){
                    game.physics.arcade.moveToObject(enemy,player, 255);
                });
            }
            if(player.body.velocity.x > 0){
                player.body.velocity.x -=15;
            }
            if(player.body.velocity.x < 0){
                player.body.velocity.x +=15;
            }
            if(player.body.velocity.y > 0){
                player.body.velocity.y -=15;
            }
            if(player.body.velocity.y < 0){
                player.body.velocity.y +=15;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
                if(Math.abs(player.body.velocity.x)<200){
                    player.body.velocity.x = -225;
                }
                player.frame = 0;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
                player.body.velocity.x = 225;
                player.frame = 1;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
                player.body.velocity.y = -225;
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
                player.body.velocity.y = 225;
            }
            if(Math.abs(player.body.velocity.x)>Math.abs(player.body.velocity.y)){
                player.alpha = Math.abs(player.body.velocity.x)/225;
            }
            else{
                player.alpha = Math.abs(player.body.velocity.y)/225;
            }
            game.physics.arcade.overlap(player, infoSet, getInfo, null, this);
            game.physics.arcade.overlap(player, enemies, playerHit, null, this);
        }
    }
    function getInfo(player, info){
        info.kill();
        maxEnemies += 1;
        score +=1;
    }
    function playerHit(player, enemy){
        if(player.alpha !=0){
            player.kill();
            endGame();
        }
    }
    function endGame(){
        gameOver = true;
        endTxt.visible = true;
        enemies.callAll('kill');
        infoSet.callAll('kill');
    }
    function restart(){
        maxEnemies = 1
        score = 0;
        gameOver = false;
        endTxt.visible = false;
        player.reset(0, game.world.height/2);
    }
};
