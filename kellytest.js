<!DOCTYPE html>
<html>
<head>
  <title>JavaScript</title>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    var canvas = document.getElementById("canvas");
    var processing = new Processing(canvas, function(processing) {
        processing.size(400, 400);
        processing.background(0xFFF);

        var mouseIsPressed = false;
        processing.mousePressed = function () { mouseIsPressed = true; };
        processing.mouseReleased = function () { mouseIsPressed = false; };

        var keyIsPressed = false;
        processing.keyPressed = function () { keyIsPressed = true; };
        processing.keyReleased = function () { keyIsPressed = false; };

        function getImage(s) {
            var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
            processing.externals.sketch.imageCache.add(url);
            return processing.loadImage(url);
        }

        // use degrees rather than radians in rotate function
        var rotateFn = processing.rotate;
        processing.rotate = function (angle) {
            rotateFn(processing.radians(angle));
        };

        with (processing) {
          var keys = [];
          var gameScore = 0;
          var level = 0;

          keyPressed = function(){
              keys[keyCode] = true;
          };
          keyReleased = function(){
              keys[keyCode] = false;
          };

          //Player Constructor
          var Player = function(x,y,size, speed){
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
          };


          //Player update method
          Player.prototype.update = function(){
              fill(199, 133, 199);
              ellipse(this.x, this.y, this.size, this.size);
              if(keyIsPressed && keys[UP]){
                  this.y -= this.speed;
              }
              if(keyIsPressed && keys[DOWN]){
                  this.y += this.speed;
              }
              if(keyIsPressed && keys[RIGHT]){
                  this.x += this.speed;
              }
              if(keyIsPressed && keys[LEFT]){
                  this.x -= this.speed;
              }
              if(this.x < 10){
                  this.x = 10;
              }
              if(this.x > 390){
                  this.x =390;
              }
              if(this.y<10){
                  this.y = 10;
              }
              if(this.y > 390){
                  this.y = 390;
              }
          };

          //Player instance
          var player1 = new Player (200,200,30,2);

          //Dot constructor
          var Dot = function(x,y,size,speed, blueDot){
              this.x = x;
              this.y = y;
              this.xVel = random(-speed,speed);
              this.yVel = random(-speed, speed);
              this.size = size;
              this.speed = speed;
              this.blueDot = blueDot;
          };

          //Dot update method
          Dot.prototype.update = function(purpleDot){
              fill(85, 116, 207);
              ellipse(this.x, this.y, this.size, this.size);
              if(this.x < purpleDot.x){
                  this.xVel = this.xVel - 0.05 * level ;
              }
              if(this.x > purpleDot.x){
                  this.xVel = this.xVel + 0.05 * level ;
              }
              if(this.x < 0 || this.x > 400 || this.y < 0 || this.y > 400){
                  //something went wrong- lost dots
                  this.x = 10;
                  this.y = 10;
              }
              this.x += this.xVel;
              this.y += this.yVel;
              if(this.x < 10 || this.x > 390){
               this.xVel = -this.xVel;
              }
              if(this.y < 10 || this.y > 390){
               this.yVel = -this.yVel;
              }
          };

          //Dot instances
          var allTheDots = [];
          for(var i = 0; i< 10; i++){
              allTheDots.push (new Dot (random(10,390),
                                        random(10,390),
                                        20,
                                        random(1,2)
                                        )
                              );
          }
          //create variable
          //for loop to run through array
          //distance variable
          //compare distance to sum of radius
          //splice array (i,1)

          var checkForCollisions = function(){
               for(var i = 0; i< allTheDots.length; i++){
                var distance = dist(player1.x, player1.y, allTheDots[i].x, allTheDots[i].y);
                   if(distance <= player1.size/2 + allTheDots[i].size/2){
                   allTheDots.splice(i,1);
                    gameScore ++;
               }
               if(distance < 100){
                  allTheDots[i].size = allTheDots[i].size * 0.99;

                  //prevent it from getting too big
                  if(allTheDots[i].size < 10){
                      allTheDots[i].size = 10;
                  }
               }
            }
          };



          draw = function() {
              background(0,0,0);
              player1.update();
              for(var i in allTheDots){
               allTheDots[i].update(player1);
              }
            checkForCollisions(player1,allTheDots);
            if(allTheDots.length === 0){
                for(var i = 0; i< 10; i++){
                          allTheDots.push (new Dot (random(10,390),
                                        random(10,390),
                                        20,
                                        random(1,2)
                                        )
                              );
              }
          level = level +1;
            }
            text("score: " + gameScore + "    Level: " + level, 50, 50);


          };

            // INSERT YOUR KHAN ACADEMY PROGRAM HERE


        }
        if (typeof draw !== 'undefined') processing.draw = draw;
    });
  </script>
</body>
</html>
