let onGround;
let gameOver;

function setup() {
  createCanvas(600, 400);
  bruineEend = new eend(150, 241, 20, 4, 75, 50, 25);
  obstakel = new Obstakel(width, 260, 30, 9)
  vogel = new Vogel(450, 100, 40, 7)
}

function draw() {
  background(100, 145, 230);

  bruineEend.tekenEend();
  bruineEend.loopEend();
  bruineEend.springEend2();

  noStroke();
  fill('green');
  rect(0, 310, 600, 90);

  obstakel.tekenen();
  obstakel.bewegen();

  vogel.tekenen1();
  vogel.bewegen1();

  bruineEend.botsCheck(obstakel);
}
//Inges code
class eend {
  constructor(x, y, straal, xSpd, rood, groen, blauw) {
    this.xCor = x;
    this.yCor = y;
    this.beginyCor = y;
    this.straal = straal;
    this.xSpeed = xSpd;
    this.rood = rood;
    this.groen = groen;
    this.blauw = blauw;

    this.yloopSpeed = this.straal / 20
    this.xloopSpeed = this.straal / 20
    this.ySpeedLvoet = this.yloopSpeed * 0.02
    this.xSpeedLvoet = this.xloopSpeed * 2
    this.ySpeedRvoet = this.yloopSpeed * 2
    this.xSpeedRvoet = this.xloopSpeed * 0.2

    this.lengteSnavel = this.straal * (11 / 7);
    this.roodSnavel = 155;
    this.groenSnavel = 88;
    this.blauwSnavel = 0;

    this.yLpootOnder = this.yCor + (this.straal * (64 / 20));
    this.yRpootOnder = this.yCor + (this.straal * (64 / 20));
    this.xLpoot = this.xCor - this.straal * 1.5;
    this.xRpoot = this.xCor;
    this.yPootBoven = this.yCor + (2 * this.straal + (this.straal * (5 / 8)))
    this.maxHeigth = this.yCor + (2 * this.straal + (this.straal * (5 / 8)))

    this.lengtePoot = this.straal * (23 / 40);
    this.lengteVoet = (this.xCor - this.straal * 1) - ((this.xCor - this.straal * 1.5) + this.straal * 0.1)

    this.xLvoetR = this.xCor - this.straal;
    this.xRvoetR = this.xCor + this.straal * 0.5;

    this.yLvoetR = this.yCor + (this.straal * (64 / 20));
    this.yRvoetR = this.yCor + (this.straal * (64 / 20));

    this.springfactor = 0;
    this.springhoogte = this.yCor - this.springfactor * 50
    this.afremming = 1
  }

  tekenEend() {

    //linkerpoot
    stroke(this.roodSnavel, this.groenSnavel, this.blauwSnavel);
    strokeWeight(this.straal * 0.5);
    line(this.xLpoot, this.yLpootOnder, this.xCor - this.straal * 1.5, this.yPootBoven);

    //linkervoet
    stroke(this.roodSnavel, this.groenSnavel, this.blauwSnavel);
    strokeWeight(this.straal * 0.5)
    line(this.xLpoot, this.yLpootOnder, this.xLvoetR, this.yLvoetR);

    //rechterpoot
    stroke(this.roodSnavel, this.groenSnavel, this.blauwSnavel);
    strokeWeight(this.straal * 0.5);
    line(this.xRpoot, this.yRpootOnder, this.xCor, this.yPootBoven);

    //rechtervoet
    stroke(this.roodSnavel, this.groenSnavel, this.blauwSnavel);
    strokeWeight(this.straal * 0.5)
    line(this.xRpoot, this.yRpootOnder, this.xRvoetR, this.yRvoetR);

    //lichaam
    noStroke();
    fill(this.rood, this.groen, this.blauw);
    ellipse(this.xCor - this.straal * (3 / 4), this.yCor + this.straal + (this.straal * (5 / 8)), this.straal * (3 + 1 / 2), this.straal * 2);

    //Kop
    noStroke();
    fill(this.rood, this.groen, this.blauw);
    ellipse(this.xCor, this.yCor, this.straal * 2, this.straal * 2);

    //Oog
    stroke(255);
    strokeWeight(this.straal * (3 / 20));
    fill(0);
    ellipse(this.xCor - this.straal * (1 / 5), this.yCor - this.straal * (7 / 20), this.straal * (7 / 20), this.straal * (7 / 20));

    //Snavel
    noStroke();
    fill(this.roodSnavel, this.groenSnavel, this.blauwSnavel);
    ellipse(this.xCor + this.lengteSnavel * (3 / 7), this.yCor + this.lengteSnavel * (11 / 35), this.lengteSnavel, this.lengteSnavel * (4 / 7));
  }

  //het bewegen van de voetjes op en neer
  loopEend() {
    this.yLpootOnder -= this.yloopSpeed
    this.xLpoot -= this.xloopSpeed
    this.yRpootOnder -= this.yloopSpeed
    this.xRpoot += this.xloopSpeed
    this.xLvoetR -= this.xSpeedLvoet
    this.yLvoetR -= this.ySpeedLvoet
    this.xRvoetR += this.xSpeedRvoet
    this.yRvoetR -= this.ySpeedRvoet

    if (this.yLpootOnder < this.maxHeigth || this.yRvoetR < this.maxHeigth || this.xLpoot < (this.xCor - this.straal * 1.5) - this.lengtePoot && this.xRpoot > (this.xCor) - this.lengtePoot || this.yLpootOnder > this.yCor + (this.straal * (64 / 20)) && this.yRpootOnder > this.yCor + (this.straal * (64 / 20)) || this.xLpoot > this.xCor - this.straal * 1.5 && this.xRpoot < this.xCor) {
      this.yloopSpeed = -this.yloopSpeed;
      this.ySpeedLvoet = -this.ySpeedLvoet
      this.ySpeedRvoet = -this.ySpeedRvoet
      this.xloopSpeed = -this.xloopSpeed
      this.xSpeedLvoet = -this.xSpeedLvoet
      this.xSpeedRvoet = -this.xSpeedRvoet
    }
  }

  //wordt niet gebruikt
  beweegEend() {
    this.xCor += this.xSpeed;
    this.xLpoot += this.xSpeed
    this.xRpoot += this.xSpeed;
    this.xLvoetR += this.xSpeed;
    this.xRvoetR += this.xSpeed;

    if (this.xCor > width - this.lengteSnavel * (6 / 7) || this.xCor < (this.straal * (145 / 40)) - this.straal) {
      this.xSpeed = -this.xSpeed;
    }
  }

  //poging om Eend te laten springen 1 (wordt niet gebruikt)
  springEend1() {
    if (keyIsDown(32)) {
      this.yLpootOnder = this.yCor + (this.straal * (64 / 20))
      this.yRpootOnder = this.yCor + (this.straal * (64 / 20))
      this.yPootBoven = this.yCor + (2 * this.straal + (this.straal * (5 / 8)))
      this.yLvoetR = this.yCor + (this.straal * (64 / 20));
      this.yRvoetR = this.yCor + (this.straal * (64 / 20));
      this.xLpoot = this.xCor - this.straal * 1.5;
      this.xRpoot = this.xCor;
      this.xLvoetR = this.xCor - this.straal;
      this.xRvoetR = this.xCor + this.straal * 0.5;

      for (let i = this.springfactor; this.yCor < this.beginyCor || this.yCor === this.beginyCor; i -= this.afremming) {
        if (this.yCor === this.springhoogte) {
          this.afremming = -this.afremming
        }
        this.yCor -= i
        this.maxHeigth -= i
        this.yLpootOnder -= i
        this.yRpootOnder -= i
        this.yPootBoven -= i
        this.yLvoetR -= i
        this.yRvoetR -= i
      }
    } else {
      this.yLpootOnder -= this.yloopSpeed
      this.xLpoot -= this.xloopSpeed
      this.yRpootOnder -= this.yloopSpeed
      this.xRpoot += this.xloopSpeed
      this.xLvoetR -= this.xSpeedLvoet
      this.yLvoetR -= this.ySpeedLvoet
      this.xRvoetR += this.xSpeedRvoet
      this.yRvoetR -= this.ySpeedRvoet

      if (this.yLpootOnder < this.maxHeigth || this.yRvoetR < this.maxHeigth || this.xLpoot < (this.xCor - this.straal * 1.5) - this.lengtePoot && this.xRpoot > (this.xCor) - this.lengtePoot || this.yLpootOnder > this.yCor + (this.straal * (64 / 20)) && this.yRpootOnder > this.yCor + (this.straal * (64 / 20)) || this.xLpoot > this.xCor - this.straal * 1.5 && this.xRpoot < this.xCor) {
        this.yloopSpeed = -this.yloopSpeed;
        this.ySpeedLvoet = -this.ySpeedLvoet
        this.ySpeedRvoet = -this.ySpeedRvoet
        this.xloopSpeed = -this.xloopSpeed
        this.xSpeedLvoet = -this.xSpeedLvoet
        this.xSpeedRvoet = -this.xSpeedRvoet
      }
    }
  }

  //poging om Eend te laten springen 2
  springEend2() {
    if (this.yCor < this.beginyCor) {
      onGround = false
      this.springfactor = 3
      this.yLpootOnder = this.yCor + (this.straal * (64 / 20))
      this.yRpootOnder = this.yCor + (this.straal * (64 / 20))
      this.yPootBoven = this.yCor + (2 * this.straal + (this.straal * (5 / 8)))
      this.yLvoetR = this.yCor + (this.straal * (64 / 20));
      this.yRvoetR = this.yCor + (this.straal * (64 / 20));
      this.xLpoot = this.xCor - this.straal * 1.5;
      this.xRpoot = this.xCor;
      this.xLvoetR = this.xCor - this.straal;
      this.xRvoetR = this.xCor + this.straal * 0.5;
    } else {
      onGround = true
      this.springfactor = 0;
    }
    if (keyIsDown(32)) {
      if (onGround) {
        this.springfactor -= 100
      }
    }
    this.yCor += this.springfactor
    this.maxHeigth += this.springfactor
    this.yLpootOnder += this.springfactor
    this.yRpootOnder += this.springfactor
    this.yPootBoven += this.springfactor
    this.yLvoetR += this.springfactor
    this.yRvoetR += this.springfactor
  }

  //wordt er gebotst?
  botsCheck(obstakel) {
    if (!(obstakel.xPos > this.xCor + this.straal || this.xCor > obstakel.xPos + obstakel.breedte || obstakel.yPos > this.yCor + this.straal * 3 || this.yCor > obstakel.yPos + this.hoogte)) {
      gameOver = true;
    }

    if (gameOver) {
      background(0);
      textSize(50);
      fill(255)
      text('Game Over', 150, 200);
    }
  }
}
//Manous code
class Obstakel {

  constructor(x, y, breedte, xspd) {
    this.xPos = x;
    this.yPos = y;
    this.breedte = random(15, 20);
    this.hoogte = random(30, 50);
    this.xspd = xspd;

    this.rood = random(0, 255)
    this.groen = random(0, 255)
    this.blauw = random(0, 255)
  }

  tekenen() {

    //kleuren strook
    noStroke();
    fill(this.rood, this.groen, this.blauw);
    rect(this.xPos, this.yPos, this.breedte, this.hoogte);



  }

  bewegen() {

    if (this.xPos < 0 - this.breedte) {

      this.breedte = random(30, 100);
      this.hoogte = random(10, 50);

      this.rood = random(0, 255)
      this.groen = random(0, 255)
      this.blauw = random(0, 255)
      this.xPos = width

    }
    this.xPos -= this.xspd;
  }
}

class Vogel {

  constructor(x, y, radius, xspd) {

    this.xPos = x;
    this.yPos = y;
    this.xspd = xspd;
    this.radius = radius;



    this.rood = random(0, 255);
    this.groen = random(0, 255);
    this.blauw = random(0, 255);
  }


  tekenen1() {

    noStroke();
    fill(this.rood, this.blauw, this.groen);
    ellipse(this.xPos, this.yPos, this.radius);

    noStroke();




  }

  bewegen1() {

    if (this.xPos < 0 - this.radius) {
      this.xPos = width


      this.rood = random(0, 255);
      this.groen = random(0, 255);
      this.blauw = random(0, 255);


    }
    this.xPos -= this.xspd

  }
}
