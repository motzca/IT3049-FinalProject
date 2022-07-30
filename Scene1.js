class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        //this.load.image("Alan", "assets/MiniPixelPack3/Enemies/Alan.png");
        //this.load.image("BonBon", "assets/MiniPixelPack3/Enemies/Bon_Bon.png");
        //this.load.image("Lips", "assets/MiniPixelPack3/Enemies/Lips.png");
    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");
    }
}