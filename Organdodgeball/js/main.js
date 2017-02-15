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
    
    var game = new Phaser.Game( 1000, 256, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'background', 'assets/Background.png' );
        game.load.image( 'ground', 'assets/ground.png' );
        game.load.image( 'eyeball', 'assets/eyeball.png' );
        game.load.image( 'heart', 'assets/heart.png' );
        game.load.image( 'kidney', 'assets/kidney.png' );
        game.load.spritesheet( 'doctor', 'assets/doctor.png', 42, 66);
        game.load.spritesheet( 'evildoctor', 'assets/evildoctor.png', 42, 66);
        game.load.spritesheet( 'donor', 'assets/donor.png', 80, 30);
    }
    var background;
    var ground;
    var player1;
    var player2;
    var donors;
    var organs;
    var jumpHeight = -200;
    var moveSpeed = 200;
    var p1HasOrgan = false;
    var p2HasOrgan = false;
    var p1LaunchVelocity = 20;
    var p2LaunchVelocity = 20;
    var p1Score = 0;
    var p2Score = 0;
    var p1ScoreTxt;
    var p2ScoreTxt;
    var p1WinnerText;
    var p2WinnerText;
    var gameOver = false;
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0, 0,'background');
        ground = game.add.sprite(0, game.world.height - 9,'ground');
        game.physics.arcade.enable(ground);
        ground.enableBody = true;
        ground.body.immovable = true;
        
        donors = game.add.group();
        donors.enableBody = true;
        donors.physicsBodyType = Phaser.Physics.ARCADE;
        var donor = donors.create(game.world.width/2-90,game.world.height - 39, 'donor');
        donor = donors.create(game.world.width/2+10,game.world.height - 39, 'donor');
        donor = donors.create(game.world.width-130,game.world.height - 39, 'donor');
        donor = donors.create(50,game.world.height - 39, 'donor');
        
        organs = game.add.group();
        organs.enableBody = true;
        organs.physicsBodyType = Phaser.Physics.ARCADE;
        organs.createMultiple(1, 'heart');
        organs.createMultiple(1, 'kidney');
        organs.createMultiple(2, 'eyeball');
        organs.setAll('body.collideWorldBounds', true);
        organs.setAll('body.gravity.y', 300);
        organs.setAll('body.bounce.x', .4);
        organs.setAll('safe', false);
        
        player1 = game.add.sprite(0, game.world.height-75,'doctor');
        game.physics.arcade.enable(player1);
        player1.body.gravity.y = 300;
        player1.body.collideWorldBounds = true;
        
        player2 = game.add.sprite(game.world.width - 42, game.world.height-75,'evildoctor');
        game.physics.arcade.enable(player2);
        player2.body.gravity.y = 300;
        player2.body.collideWorldBounds = true;
        
        var style = { font: "12px Verdana", fill: "#000", align: "left" };
        var style2 = { font: "15px Verdana", fill: "#000", align: "center" };
        p1WinnerText = game.add.text(game.world.width / 2 - 50, 20, "Player 1 Wins!\nHit R to restart", style2);
        p1WinnerText.visible = false;
        p2WinnerText = game.add.text(game.world.width / 2 - 50, 20, "Player 2 Wins!\nHit R to restart", style2);
        p2WinnerText.visible = false;
        p1ScoreTxt = game.add.text(10, 10, "Player1: " + p1Score, style);
        p2ScoreTxt = game.add.text(game.world.width - 70, 10, "Player2: " + p2Score, style);
    }
    
    function update() {
        var p1HitGround = game.physics.arcade.collide(player1, ground);
        var p2HitGround = game.physics.arcade.collide(player2, ground);
        if(gameOver){
            if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
                restart();
            }
        }
        else{
            player1.body.velocity.x=0;
            player2.body.velocity.x=0;
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)){ 
                player1.body.velocity.x = -moveSpeed;
                player1.frame = 1;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
                player1.body.velocity.x = moveSpeed;
                player1.frame = 0;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){ 
                player2.body.velocity.x = -moveSpeed;
                player2.frame = 1;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                player2.body.velocity.x = moveSpeed;
                player2.frame = 0;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.W) && p1HitGround){
                player1.body.velocity.y += jumpHeight;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && p2HitGround){
                player2.body.velocity.y += jumpHeight;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.E)&& p1HasOrgan){
                if (p1LaunchVelocity < 800){
                    p1LaunchVelocity +=20;
                }
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)&& p2HasOrgan){
                if (p2LaunchVelocity < 800){
                    p2LaunchVelocity +=20;
                }
            }
            game.input.keyboard.onUpCallback = function( e ){
                if(e.keyCode == Phaser.Keyboard.E && p1HasOrgan){ 
                    var organ = organs.getFirstExists(false);
                    if(player1.frame == 0){
                        organ.reset(player1.x + 44, player1.y + 24);
                        organ.body.velocity.x = p1LaunchVelocity;
                        organ.body.velocity.y = -150;
                    }
                    else{
                        organ.reset(player1.x-20, player1.y + 24);
                        organ.body.velocity.x = -p1LaunchVelocity;
                        organ.body.velocity.y = -150;
                    }
                    p1LaunchVelocity = 20;
                    p1HasOrgan = false;
                    organ.safe = false;
                }
                if(e.keyCode == Phaser.Keyboard.SHIFT&& p2HasOrgan){ 
                    var organ = organs.getFirstExists(false);
                    if(player2.frame == 0){
                        organ.reset(player2.x + 44, player2.y + 24);
                        organ.body.velocity.x = p2LaunchVelocity;
                        organ.body.velocity.y = -150;
                    }
                    else{
                        organ.reset(player2.x-20, player2.y + 24);
                        organ.body.velocity.x = -p2LaunchVelocity;
                        organ.body.velocity.y = -150;
                    }
                    p2LaunchVelocity = 20;
                    p2HasOrgan = false;
                    organ.safe = false;
                }
            };
            p1ScoreTxt.text = 'Player1: ' + p1Score;
            p2ScoreTxt.text = 'Player2: ' + p2Score;
            game.physics.arcade.overlap(player1, donors, p1Donor, null, this);
            game.physics.arcade.overlap(player2, donors, p2Donor, null, this);
            game.physics.arcade.overlap(player1, organs, p1Organ, null, this);
            game.physics.arcade.overlap(player2, organs, p2Organ, null, this);
            game.physics.arcade.collide(ground, organs, organsGrounded, null, this);
        }
    }
    function p1Donor(player,donor){
        if (game.input.keyboard.isDown(Phaser.Keyboard.S) && donor.frame != 1 && !p1HasOrgan){
            donor.frame = 1;
            p1HasOrgan = true;
        }
    }
    function p2Donor(player,donor){
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && donor.frame != 1 && !p2HasOrgan){
            donor.frame = 1;
            p2HasOrgan = true;
        }
    }
    function organsGrounded(ground, organ){
        organ.body.velocity.x = 0;
        organ.safe = true;
    }
    function p1Organ(player, organ){
        if (organ.safe){
            if (game.input.keyboard.isDown(Phaser.Keyboard.S) && !p1HasOrgan){
            organ.kill();
            p1HasOrgan = true;
            }
        }
        else{
            p2Score +=1;
            organ.safe = true;
            if (p2Score>=5){
                endGame();
            }
        }
    }
    function p2Organ(player, organ){
        if (organ.safe){
            if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !p2HasOrgan){
            organ.kill();
            p2HasOrgan = true;
            }
        }
        else{
            p1Score +=1;
            organ.safe = true;
            if (p1Score>=5){
                endGame();
            }
        }
    }
    function endGame(){
        gameOver = true;
        if(p1Score>=5){
            p1WinnerText.visible = true;
        }
        else{
            p2WinnerText.visible = true;
        }
        organs.callAll('kill');
    }
    function restart(){
        p1Score = 0;
        p2Score = 0;
        player1.reset(0, game.world.height-75);
        player2.reset(game.world.width - 42, game.world.height-75);
        donors.setAll('frame', 0)
        gameOver = false;
        p1WinnerText.visible = false;
        p2WinnerText.visible = false;
    }
};
