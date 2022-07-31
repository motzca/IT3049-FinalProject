class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        this.load.spritesheet("Alan", "assets/MiniPixelPack3/Enemies/Alan.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("BonBon", "assets/MiniPixelPack3/Enemies/Bon_Bon.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("Lips", "assets/MiniPixelPack3/Enemies/Lips.png",  {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");
    }
}