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
    }

    update(){
        this.moveAlien(this.Allen, 1);
        this.moveAlien(this.BonBon, 2);
        this.moveAlien(this.Lips, 3);

        this.backgrounf.tilePostionY -= 0.5;
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
}