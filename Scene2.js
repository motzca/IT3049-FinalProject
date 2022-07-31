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


        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
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

    update(){
        this.moveAlien(this.Allen, 1);
        this.moveAlien(this.BonBon, 2);
        this.moveAlien(this.Lips, 3);

        this.backgrounf.tilePostionY -= 0.5;
    }
}