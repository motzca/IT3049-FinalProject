class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/Mini Pixel Pack 3/Space_BG.png");
        this.load.image("Alan", "assets/Mini Pixel Pack 3/Enemies/Alan (16 x 16).png");
        this.load.image("BonBon", "assets/Mini Pixel Pack 3/Enemies/Bon_Bon (16 x 16).png");
        this.load.image("Lips", "assets/Mini Pixel Pack 3/Enemies/Lips (16 x 16).png");
    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");
    }
}