function setup() {
  createCanvas(windowWidth, windowHeight);
  hanoi = new Hanoi(3, 3);
  noLoop();
}

function draw() {
  background(200);
  hanoi.draw();
}

Hanoi.prototype.draw = function() {
  for (let rod of this.rods) {
    rod.draw();
  }
}

Rod.prototype.draw = function() {
  rect(this.x-10, height/4, 20, height/4*3);
  let drawHeight = height;
  for (let disk of this.disks) {
    disk.draw(this.x, drawHeight-=30);
  }
}

Disk.prototype.draw = function(x, y) {
  rect(x-this.size*50/2, y, this.size*50, 30);
}
