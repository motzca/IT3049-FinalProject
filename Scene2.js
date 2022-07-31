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
}