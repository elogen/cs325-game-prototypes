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
        // Load an image and call it 'logo'.
        game.load.image( 'background', 'assets/spacebackground.jpg' );
        game.load.image( 'player', 'assets/blackhatplayer.png');
        game.load.image( 'shot', 'assets/meteorshot.png');
        game.load.image( 'enemy', 'assets/whitehat.png');
        game.load.image( 'enemyshot', 'assets/enemyshot.png');
    }
    
    var background;
    var player;
    var shots;
    var shotTime = 0;
    var fireButton;
    var enemies;
    var nextEnemyAt = 0;
    var enemyDelay1 = game.rnd.integerInRange(1200, 1600);
    var enemyDelay2 = game.rnd.integerInRange(800, 1000);
    var enemyDelay3 = game.rnd.integerInRange(300, 600);
    var gameTime = 0;
    var timeText;
    var score = 0;
    var scoreText;
    var lives;
    var gameover = false;
    var gameoverText;
    var enemyShots;
    var enemyFiringTimer = 2000;
    var fireDelay = game.rnd.integerInRange(1000, 2500);
    var livingEnemies = [];
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
        
        
        
        shots = game.add.group();
        shots.enableBody = true;
        shots.physicsBodyType = Phaser.Physics.ARCADE;
        shots.createMultiple(30, 'shot');
        shots.setAll('anchor.x', 0.5);
        shots.setAll('anchor.y', 0.5);
        shots.setAll('outOfBoundsKill', true);
        shots.setAll('checkWorldBounds', true);
        
        enemyShots = game.add.group();
        enemyShots.enableBody = true;
        enemyShots.physicsBodyType = Phaser.Physics.ARCADE;
        enemyShots.createMultiple(50, 'enemyshot');
        enemyShots.setAll('anchor.x', 0.5);
        enemyShots.setAll('anchor.y', 0.5);
        enemyShots.setAll('outOfBoundsKill', true);
        enemyShots.setAll('checkWorldBounds', true);
        
        player = game.add.sprite(0, game.world.height / 2,'player');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 0;
        player.body.colliderWorldBounds = true;
        
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(80, 'enemy');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('outOfBoundsKill',true);
        enemies.setAll('checkWorldBounds',true);
        
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        var style = { font: "15px Verdana", fill: "#fff", align: "left" };
        var style2 = { font: "15px Verdana", fill: "#fff", align: "center" };
        timeText = game.add.text( 20, 15, "Time: " + gameTime, style);
        scoreText = game.add.text(680, 15, "Score: " + score, style);
        gameoverText = game.add.text(game.world.width / 2 - 50, game.world.height / 2, "Game Over\nHit R to restart", style2);
        gameoverText.visible = false;
        lives = game.add.group();
        game.add.text(game.world.width / 2 - 50, 15, 'Lives', style);
        for (var i = 0; i < 3; i++) 
        {
            var asteroid = lives.create(game.world.width / 2 + 80  - (33 * i), 25, 'player');
            asteroid.anchor.setTo(0.5, 0.5);
            asteroid.alpha = 0.4;
        }
    }
    
    function update() {
        //if the player is out of lives, gameover is true, the player can hit R to start a new game
        if (gameover){
            if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
                restart();
            }
        }
        //as long as the player is not dead and the gameover variable is false, run the game
        if (!gameover){
            //moves the background, giving the illusion that the player is flying through space
            background.tilePosition.x -= 2;
            //if no input, player velocity is set to 0
            player.body.velocity.setTo(0,0);
            //player moves left when A is pressed down
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)){ 
                player.body.velocity.x = -150;
            }
            //player moves right when D is pressed down
            else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
                player.body.velocity.x = 75;
            }
            //player moves up when W is pressed down
            if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
                player.body.velocity.y = -150;
            }
            //player moves down when S is pressed down
            else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
                player.body.velocity.y = 150;
            }
            //when spacebar is hit, the player shoots one shot and the shotTime is reset. (borrowed and modified from the invader phaser example)
            if (fireButton.isDown){
                if (game.time.now > shotTime){
                    var shot = shots.getFirstExists(false);

                    if (shot){
                        shot.reset(player.x + 38, player.y + 24);
                        shot.body.velocity.x = 400;
                        shotTime = game.time.now + 600;
                    }  
                }
            }
            //updates game time in seconds, trimed to two decimal points
            gameTime = game.time.totalElapsedSeconds().toFixed(2);
            //updates timer text
            timeText.text = 'Time: ' + gameTime;
            //updates score text
            scoreText.text = 'Score: ' + score;
            //checks if the next enemy can be spawned
            if (nextEnemyAt < game.time.now &&           enemies.countDead() > 0) {
                //if the game has lasted for 3 minutes, spawn enemies more often
                if(gameTime > 180){
                    nextEnemyAt = game.time.now + enemyDelay3;
                }
                //if the game has lasted for 1.5 minutes, spawn enemies more often
                else if(gameTime > 90){
                    nextEnemyAt = game.time.now + enemyDelay2;
                }
                //spawn enemies at the random rate of enemyDelay1
                else nextEnemyAt = game.time.now + enemyDelay1;
                //gets the first enemy that is not alive(on screen) from the enemies group
                var enemy = enemies.getFirstExists(false);
                //create the enemy just off screen to the right with a random height
                enemy.reset(810, game.rnd.integerInRange(20, 580));
                //give the enemy a random velocity
                enemy.body.velocity.x = game.rnd.integerInRange(-80, -120);
                }
            if(game.time.now > enemyFiringTimer){
                enemyShoot();
            }
            //calls hitEnemy if a player shot hits an enemy
            game.physics.arcade.overlap(shots, enemies, hitEnemy, null, this);
            //calls enemyPlayerCollision if the player runs into an enemy
            game.physics.arcade.overlap(player, enemies, enemyPlayerCollision, null, this);
            game.physics.arcade.overlap(player, enemyShots, hitPlayer, null,this);
        }
    }
    //called if the players shot hits an enemy. destroys both the enemy and the shot, and adds 5 to the players score
    function hitEnemy (shot, enemy){
        shot.kill();
        enemy.kill();
        score += 5;
    }
    //called if the player runs into an enemy. Destroys the enemy and subtracts a life from the player. If the player is out of lives, endGame is called.
    function enemyPlayerCollision(player, enemy){
        enemy.kill();
        var live = lives.getFirstAlive();
        
        if (live){
            live.kill();
        }
        if (lives.countLiving()<1){
            endGame();
        }
    }
    function hitPlayer(player, enemyShot){
        enemyShot.kill();
        var live = lives.getFirstAlive();
        if (live){
            live.kill();
        }
        if (lives.countLiving()<1){
            endGame();
        }
    }
    //destroys all assets on screen and stops background scroll and the timer. Also makes gameover text visible.
    function endGame(){
        player.kill();
        gameover = true;
        enemies.callAll('kill');
        shots.callAll('kill');
        enemyShots.callAll('kill');
        gameoverText.visible = true;
    }
    //resets game components and starts new game
    function restart(){
        score = 0;
        game.time.reset();
        gameTime = 0;
        player.reset(0, game.world.height / 2);
        for (var i = 0; i < 3; i++) 
        {
            lives.children[i].reset(game.world.width / 2 + 80  - (33 * i), 25);
        }
        gameover = false;
        gameoverText.visible = false;
    }
    function enemyShoot(){
        var enemyShot = enemyShots.getFirstExists(false);
        livingEnemies.length=0;
        enemies.forEachAlive(function(enemy){
        livingEnemies.push(enemy);
        });
        if(livingEnemies.length > 1){
            var random = game.rnd.integerInRange(0,livingEnemies.length-1);

            // randomly select one of them
            var shooter = livingEnemies[random];
            // And fire the bullet from this enemy
            enemyShot.reset(shooter.body.x, shooter.body.y);
            var radians = game.physics.arcade.angleBetween(shooter, player);
            var degrees = radians * (180/Math.PI);                       game.physics.arcade.velocityFromAngle(degrees, 200, enemyShot.body.velocity);
            enemyFiringTimer = game.time.now + fireDelay;
        } 
    }
};
