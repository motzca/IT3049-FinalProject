class Scene0 extends Phaser.Scene {

    constructor() {
        super({ key: 'titleScene' });
        this.getLoc();
    }

    preload() {

        this.load.image('background', 'assets/MiniPixelPack3/SpaceBG.png');

        
    }

    create() {

        var bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        
        var title = this.add.text(190, 125, 'Space Invaders');
        var text = this.add.text(235, 145, "PLAY")
        var text2 = this.add.text(100, 165, "Current Weather in " + config.userLocation + " is " + config.userTemp)
        console.log(config.userLocation)
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());
    }
    clickButton() {
        this.scene.switch('bootGame');
    }

    getLoc() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.error);
            
        }
        else {
            alert('Geolocation is not supported');
        }
    }
        
    error() {
        alert("Location not found");
    }
    success(position) {
        var Geo = {};
        Geo.lat = position.coords.latitude;
        Geo.lng = position.coords.longitude;
        var key = "647d720e41441fa8ede8a0770f9b4eeb";
        var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + Geo.lat
            + "&lon=" + Geo.lng
            + "&units=imperial"
            + "&appid=" + key;
        
        jQuery.ajax({
            url: api,
            dataType : "json",
            success: function (data) {
                game.config.userLocation = data['name'];
                game.config.userTemp  = data['main']['temp'];
                game.config.userWeather = data['weather']['main'];
            }
            
        });
        
    }
}