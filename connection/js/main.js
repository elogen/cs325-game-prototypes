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
        game.load.image('background', 'assets/background.png');
        
        game.load.image('cardBack', 'assets/cardback.png');
        game.load.image('startSpot', 'assets/startspot.png');
        
        game.load.image( 'aceC', 'assets/aceclub.png' );
        game.load.image( 'aceS', 'assets/acespade.png' );
        game.load.image( 'aceD', 'assets/acediamond.png' );
        game.load.image( 'aceH', 'assets/aceheart.png' );
        
        game.load.image( 'twoC', 'assets/twoclub.png' );
        game.load.image( 'twoS', 'assets/twospade.png' );
        game.load.image( 'twoD', 'assets/twodiamond.png' );
        game.load.image( 'twoH', 'assets/twoheart.png' );
        
        game.load.image( 'threeC', 'assets/threeclub.png' );
        game.load.image( 'threeS', 'assets/threespade.png' );
        game.load.image( 'threeD', 'assets/threediamond.png' );
        game.load.image( 'threeH', 'assets/threeheart.png' );
        
        game.load.image( 'fourC', 'assets/fourclub.png' );
        game.load.image( 'fourS', 'assets/fourspade.png' );
        game.load.image( 'fourD', 'assets/fourdiamond.png' );
        game.load.image( 'fourH', 'assets/fourheart.png' );
        
        game.load.image( 'fiveC', 'assets/fiveclub.png' );
        game.load.image( 'fiveS', 'assets/fivespade.png' );
        game.load.image( 'fiveD', 'assets/fivediamond.png' );
        game.load.image( 'fiveH', 'assets/fiveheart.png' );
        
        game.load.image( 'sixC', 'assets/sixclub.png' );
        game.load.image( 'sixS', 'assets/sixspade.png' );
        game.load.image( 'sixD', 'assets/sixdiamond.png' );
        game.load.image( 'sixH', 'assets/sixheart.png' );
        
        game.load.image( 'sevenC', 'assets/sevenclub.png' );
        game.load.image( 'sevenS', 'assets/sevenspade.png' );
        game.load.image( 'sevenD', 'assets/sevendiamond.png' );
        game.load.image( 'sevenH', 'assets/sevenheart.png' );
        
        game.load.image( 'eightC', 'assets/eightclub.png' );
        game.load.image( 'eightS', 'assets/eightspade.png' );
        game.load.image( 'eightD', 'assets/eightdiamond.png' );
        game.load.image( 'eightH', 'assets/eightheart.png' );
        
        game.load.image( 'nineC', 'assets/nineclub.png' );
        game.load.image( 'nineS', 'assets/ninespade.png' );
        game.load.image( 'nineD', 'assets/ninediamond.png' );
        game.load.image( 'nineH', 'assets/nineheart.png' );
        
        game.load.image( 'tenC', 'assets/tenclub.png' );
        game.load.image( 'tenS', 'assets/tenspade.png' );
        game.load.image( 'tenD', 'assets/tendiamond.png' );
        game.load.image( 'tenH', 'assets/tenheart.png' );
        
        game.load.image( 'jackC', 'assets/jclub.png' );
        game.load.image( 'jackS', 'assets/jspade.png' );
        game.load.image( 'jackD', 'assets/jdiamond.png' );
        game.load.image( 'jackH', 'assets/jheart.png' );
        
        game.load.image( 'queenC', 'assets/qclub.png' );
        game.load.image( 'queenS', 'assets/qspade.png' );
        game.load.image( 'queenD', 'assets/qdiamond.png' );
        game.load.image( 'queenH', 'assets/qheart.png' );
        
        game.load.image( 'kingC', 'assets/kclub.png' );
        game.load.image( 'kingS', 'assets/kspade.png' );
        game.load.image( 'kingD', 'assets/kdiamond.png' );
        game.load.image( 'kingH', 'assets/kheart.png' );
    }
    
    var background;
    var card;
    var deck;
    var cardSelected;
    var startSpot;
    var startCard;
    var cardBack;
    var cardsLeft = false;
    var avCards = new Array();
    var cardsInHand = new Array();
    var c1;
    var c2;
    var c3;
    
    function create() {
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
        
        deck = game.add.group();
        card = game.make.sprite(0,0,'aceC');
        card.cVal = 0;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'aceS');
        card.cVal = 0;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'aceD');
        card.cVal = 0;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'aceH');
        card.cVal = 0;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'twoC');
        card.cVal = 1;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'twoS');
        card.cVal = 1;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'twoD');
        card.cVal = 1;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'twoH');
        card.cVal = 1;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'threeC');
        card.cVal = 2;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'threeS');
        card.cVal = 2;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'threeD');
        card.cVal = 2;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'threeH');
        card.cVal = 2;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'fourC');
        card.cVal = 3;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fourS');
        card.cVal = 3;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fourD');
        card.cVal = 3;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fourH');
        card.cVal = 3;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'fiveC');
        card.cVal = 4;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fiveS');
        card.cVal = 4;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fiveD');
        card.cVal = 4;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'fiveH');
        card.cVal = 4;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'sixC');
        card.cVal = 5;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sixS');
        card.cVal = 5;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sixD');
        card.cVal = 5;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sixH');
        card.cVal = 5;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'sevenC');
        card.cVal = 6;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sevenS');
        card.cVal = 6;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sevenD');
        card.cVal = 6;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'sevenH');
        card.cVal = 6;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'eightC');
        card.cVal = 7;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'eightS');
        card.cVal = 7;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'eightD');
        card.cVal = 7;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'eightH');
        card.cVal = 7;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'nineC');
        card.cVal = 8;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'nineS');
        card.cVal = 8;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'nineD');
        card.cVal = 8;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'nineH');
        card.cVal = 8;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'tenC');
        card.cVal = 9;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'tenS');
        card.cVal = 9;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'tenD');
        card.cVal = 9;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'tenH');
        card.cVal = 9;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'jackC');
        card.cVal = 10;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'jackS');
        card.cVal = 10;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'jackD');
        card.cVal = 10;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'jackH');
        card.cVal = 10;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'queenC');
        card.cVal = 11;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'queenS');
        card.cVal = 11;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'queenD');
        card.cVal = 11;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'queenH');
        card.cVal = 11;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        card = game.make.sprite(0,0,'kingC');
        card.cVal = 12;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'kingS');
        card.cVal = 12;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'kingD');
        card.cVal = 12;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        card = game.make.sprite(0,0,'kingH');
        card.cVal = 12;
        card.inDeck = true;
        card.discarded = false;
        card.inHand = false;
        card.inputEnabled = true;
        card.events.onInputDown.add(cardClicked,this);
        deck.add(card);
        card.kill();
        
        cardBack = game.add.sprite(game.world.width-64,game.world.height/2-64,'cardBack');
        cardBack.inputEnabled = true;
        cardBack.events.onInputDown.add(drawCard,this);
        
        startCard = deck.getRandom();
        startCard.reset(game.world.width/2-32,game.world.height/2-64);
        startCard.inDeck = false;
        
        c1 = deck.getRandom();
        c1.reset(game.world.width/2-74,game.world.height/2+128)
        c1.inDeck = false;
        c1.inHand = true;
        
        c2 = deck.getRandom();
        c2.reset(game.world.width/2-32,game.world.height/2+128)
        c2.inDeck = false;
        c2.inHand = true;
        
        c3 = deck.getRandom();
        c3.reset(game.world.width/2+8,game.world.height/2+128)
        c3.inDeck = false;
        c3.inHand = true;
        
        startSpot = game.add.sprite(startCard.x-34,startCard.y,'startSpot');
        startSpot.inputEnabled = true;
        startSpot.events.onInputDown.add(cardSpot,this);
        
        startSpot = game.add.sprite(startCard.x+34,startCard.y,'startSpot');
        startSpot.inputEnabled = true;
        startSpot.events.onInputDown.add(cardSpot,this);
        
        startSpot = game.add.sprite(startCard.x,startCard.y-66,'startSpot');
        startSpot.inputEnabled = true;
        startSpot.events.onInputDown.add(cardSpot,this);
        
        startSpot = game.add.sprite(startCard.x,startCard.y+66,'startSpot');
        startSpot.inputEnabled = true;
        startSpot.events.onInputDown.add(cardSpot,this);
        
        
        
        var style = { font: "15px Verdana", fill: "#fff", align: "left" };
        var style2 = { font: "15px Verdana", fill: "#fff", align: "center" };
    }
    
    function update() {
    }
    function cardClicked(card){
        if (card.inHand){
            cardSelected = card;
        }
        else{
            var lowBound = card.cVal-1;
            if (lowBound<0){
                lowBound = 12;
            }
            if (cardSelected != 0){
                if ((card.cVal+1)%13 == cardSelected.cVal || lowBound == cardSelected.cVal){
                    cardSelected.inHand = false;
                    replaceCard(cardSelected);
                    cardSelected.reset(card.x,card.y);
                    card.kill();
                    cardSelected = 0;
                }
             }
        }
    }
    function cardSpot (startSpot){
        if (cardSelected != 0){
            if ((startCard.cVal+1)%13 == cardSelected.cVal || (startCard.cVal-1)%13 == cardSelected.cVal){
                cardSelected.inHand = false;
                replaceCard(cardSelected);
                cardSelected.reset(startSpot.x,startSpot.y);
                startSpot.kill();
                cardSelected = 0;
            }
        }
    }
    function replaceCard(card){
        for (var i = 0, len = deck.children.length; i < len; i++) {
            if (deck.children[i].inDeck){
                cardsLeft = true;
            }
        }
        if (!cardsLeft){
            for (var i = 0, len = deck.children.length; i < len; i++) {
                if (deck.children[i].discarded){
                    deck.children[i].inDeck = true;
                }
            }
        }
        avCards = new Array;
        for (var i = 0, len = deck.children.length; i < len; i++) {
            if (deck.children[i].inDeck){
                 avCards.push(deck.children[i]);
            }
        }
        var index = game.rnd.integerInRange(0, avCards.length-1);
        var newCard = avCards[index];
        newCard.reset(card.x,card.y);
        newCard.inDeck = false;
        newCard.inHand = true;
        cardsLeft = false;
    }
    function drawCard(cardBack){
        var count = 0;
        for (var i = 0, len = deck.children.length; i < len; i++) {
            if (deck.children[i].inDeck){
                cardsLeft = true;
                count++;
            }
        }
        if (!cardsLeft || count<4){
            for (var i = 0, len = deck.children.length; i < len; i++) {
                if (deck.children[i].discarded){
                    deck.children[i].inDeck = true;
                    deck.children[i].discarded = false;
                }
            }
        }
        avCards = new Array;
        cardsInHand = new Array;
        for (var i = 0, len = deck.children.length; i < len; i++) {
                if (deck.children[i].inDeck){
                    avCards.push(deck.children[i]);
                }
                if (deck.children[i].inHand){
                    cardsInHand.push(deck.children[i]);
                }
            }
        var index = game.rnd.integerInRange(0, avCards.length-1);
        var newCard = avCards[index];
        avCards.splice(index, 1);
        newCard.reset(cardsInHand[0].x,cardsInHand[0].y);
        newCard.inDeck = false;
        newCard.inHand = true;
        index = game.rnd.integerInRange(0, avCards.length-1);
        newCard = avCards[index];
        avCards.splice(index, 1);
        newCard.reset(cardsInHand[1].x,cardsInHand[1].y);
        newCard.inDeck = false;
        newCard.inHand = true;
        index = game.rnd.integerInRange(0, avCards.length-1);
        newCard = avCards[index];
        avCards.splice(index, 1);
        newCard.reset(cardsInHand[2].x,cardsInHand[2].y);
        newCard.inDeck = false;
        newCard.inHand = true;
        
        cardsInHand[0].inHand = false;
        cardsInHand[1].inHand = false;
        cardsInHand[2].inHand = false;
        cardsInHand[0].discarded = true;
        cardsInHand[1].discarded = true;
        cardsInHand[2].discarded = true;
        cardsInHand[0].kill();
        cardsInHand[1].kill();
        cardsInHand[2].kill();
        cardsLeft = false;
    }
};
