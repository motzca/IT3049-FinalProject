import { Alan, Bonbon, Lips } from './Alien';
import { GC, STATE } from './GC';

function deactivateAlien(alien) {
  alien.deactivate();
}

export default class AlienManager {
  constructor(scene, level) {
    this.scene = scene;

    this.maxY = scene.game.canvas.height;
    this.aliensStartVelocity = 40;

    this.alans = scene.physics.add.group({
      maxSize: 26,
      classType: Alien1,
      runChildUpdate: true
    });
    this.bonbons = scene.physics.add.group({
      maxSize: 26,
      classType: Alien2,
      runChildUpdate: true
    });
    this.lips = scene.physics.add.group({
      maxSize: 13,
      classType: Alien3,
      runChildUpdate: true
    });

    this.init(level);
  }

  addColider(other, eventHandler, scene) {
    scene.physics.add.collider(this.alans, other, eventHandler, null, scene);
    scene.physics.add.collider(this.bonbons, other, eventHandler, null, scene);
    scene.physics.add.collider(this.lips, other, eventHandler, null, scene);
  }

  restart(level) {
    this.level = level;
    this.forAllAliens(deactivateAlien);
    this.init(level);
  }

  init(level) {
    this.level = level;
    this.makeAlienRow(0, this.alans);
    this.makeAlienRow(1, this.alans);
    this.makeAlienRow(2, this.bonbons);
    this.makeAlienRow(3, this.bonbons);
    this.makeAlienRow(4, this.lips);

    this.aliensVelocity = this.aliensStartVelocity + (5 * (level - 1));
    this.alans.setVelocityX(this.aliensVelocity);
    this.bonbons.setVelocityX(this.aliensVelocity);
    this.lips.setVelocityX(this.aliensVelocity);

    this.alienThrowsBombInFuture();
  }

  makeAlienRow(row, aliens) {
    for (var column = 0; column <= 12; column++) {
      let x = 100 + (column * 54);
      let y = 70 + (row * 50);
      aliens.get().activate(x, y);
    }
  }

  countAliensDetailed() {
    const nrOfAlans = this.alans.countActive();
    const nrOfBonbons = this.bonbons.countActive();
    const nrOfLips = this.lips.countActive();
    const nrOfAliens = nrOfAlans + nrOfBonbons + nrOfLips;
    return {
      all: nrOfAliens,
      alans: nrOfAlans,
      bonbons: nrOfBonbons,
      lips: nrOfAlans
    }
  }

  testAllAliensDead() {
    return this.countAliensDetailed().all === 0;
  }

  getRandomAlien() {
    const count = this.countAliensDetailed();
    if (count.all > 0) {
      let alienIndex = Math.floor(Math.random() * count.all);
      let aliens = this.alans;
      if (alienIndex >= count.alans) {
        aliens = this.bonbons;
        alienIndex -= count.alans;
      }
      if (alienIndex >= count.bonbons) {
        aliens = this.lips;
        alienIndex -= count.bonbons;
      }
      //const alien = aliens.getChildren()[alienIndex];
      const alien = aliens.getFirstNth(alienIndex, true, false);
      return alien;
    }
    // return undefined
  }

  alienThrowsBombInFuture() {
    let delay = 400 + Math.random() * 4000;
    this.scene.time.addEvent({
      delay: delay,
      callback: this.alienThrowsBomb,
      callbackScope: this
    });
  }

  alienThrowsBomb() {
    if (this.scene.state == STATE.RUN) {
      const alien = this.getRandomAlien();
      if (alien !== undefined && alien !== null) {
        this.scene.bombs.get().throw(alien.x, alien.y+10);
      }
    }
    this.alienThrowsBombInFuture();
  }

  onWorldbounds(body) {
    let gameover = false;
    if (body.gameObject.active) {
      const isAlien = this.alans.contains(body.gameObject)
                   || this.bonbons.contains(body.gameObject)
                   || this.lips.contains(body.gameObject);
      if (isAlien) {
        this.aliensVelocity = -this.aliensVelocity * 1.02;
        this.alans.setVelocityX(this.aliensVelocity);
        this.bonbons.setVelocityX(this.aliensVelocity);
        this.lips.setVelocityX(this.aliensVelocity);

        const isLanded = (function(alien) {
          return(alien.y+5 > this.maxY);
        }).bind(this);

        function moveAlienDown(alien) {
          alien.y += 5;
        }

        //TODO: remove expensive call!
        gameover =
          this.alans.getChildren().find(isLanded)
          || this.bonbons.getChildren().find(isLanded)
          || this.lips.getChildren().find(isLanded);
        if (!gameover) {
          this.forAllAliens(moveAlienDown);
        }
      }
    }
    return gameover;
  }

  forAllAliens(f) {
    this.alans.getChildren().forEach(f);
    this.bonbons.getChildren().forEach(f);
    this.lips.getChildren().forEach(f);
  }

  gameover() {
    this.alans.setVelocityX(0);
    this.alans.setVelocityY(0);
    this.bonbons.setVelocityX(0);
    this.bonbons.setVelocityY(0);
    this.lips.setVelocityX(0);
    this.lips.setVelocityY(0);
  }
}