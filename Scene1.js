class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        
        // Alien spritesheets
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
        
        // explosion and power-up spritesheets
        this.load.spritesheet("explosion", "assets/MiniPixelPack3/Effects/Explosion", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("power-up", "assets/MiniPixelPack3/Items/Power_Item.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // ship + booster spritesheets
        this.load.spritesheet("player", "assets/MiniPixelPack3/Player ship/Player_ship.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        //animations
        this.animes.create({
            key: "Alan_anim",
            frames: this.animes.generateFramedNumbers("Alan"),
            frameRate: 20,
            repeat: -1
        });
        this.animes.create({
            key: "BonBon_anim",
            frames: this.animes.generateFramedNumbers("BonBon"),
            frameRate: 20,
            repeat: -1
        });
        this.animes.create({
            key: "Lips_anim",
            frames: this.animes.generateFramedNumbers("Lips"),
            frameRate: 20,
            repeat: -1
        });
        this.animes.create({
            key: "explode",
            frames: this.animes.generateFramedNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "pill",
            frames: this.animes.generateFramedNumbers("power-up", {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
        this.animes.create({
            key: "movement",
            frames: this.anims.generateFramedNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");
    }
}