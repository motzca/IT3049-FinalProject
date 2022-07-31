class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
        this.background.setOrigin(0,0);


        this.Alan = this.add.sprite(config.width / 2 - 50, config.height / 2, "Alan");
        this.BonBon = this.add.sprite(config.width / 2, config.height / 2, "BonBon");
        this.Lips = this.add.sprite(config.width / 2 + 50, config.height / 2, "Lips");


        this.Alan.play("Alan_anim");
        this.BonBon.play("BonBon_anim");
        this.Lips.play("Lips_anim");

        this.Alan.setInteractive();
        this.BonBon.setInteractive();
        this.Lips.setInteractive();

        this.input.on("gameobjectdown", this.destroyAlien, this);

        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});


        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for(var i = 0; i <= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            powerUp.setVelocity(100, 100);
            powerUp.setColliderWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("movement");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setColliderWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        this.moveAlien(this.Allen, 1);
        this.moveAlien(this.BonBon, 2);
        this.moveAlien(this.Lips, 3);

        this.backgrounf.tilePostionY -= 0.5;

        this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Fire!");
        }
    }

    moveAlien(alien, speed){
        alien.y += speed;
        if (alien.y > config.height){
            this.resetAlienPos(alien);
        }
    }

    resetAlienPos(alien){
        alien.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyAlien(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }
}