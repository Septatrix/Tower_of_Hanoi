function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Hanoi {
  constructor(nDisks, nRods) {
    this.rods = [];
    this.numDisks = nDisks;

    for (var i = 0; i < nRods; i++) {
      this.rods.push(
        new Rod((width / (nRods * 2)) * ((i * 2 ) + 1))
      );
    }

    for (var i = 0; i < nDisks; i++) {
      this.rods[0].unshift(
        new Disk(i+1)
      );
    }
  }

  solve(timeout) {
    this.moveDisks(this.numDisks, 0, 1, 2, timeout);
  }

  moveDisks(n, start, help, end, timeout) {
    if (n>1) this.moveDisks(n-1, start, end, help);
    this.moveDisk(start, end);
    if (n>1) this.moveDisks(n-1, help, start, end);
  }

  moveDisk(start, end) {
    if(this.rods[start].top().size < this.rods[end].top().size) {
      this.rods[end].push(this.rods[start].pop());
      console.log('Move disk from rod ' + start + ' to rod ' + end);
      redraw();
    } else {console.log('Invalid move');}
  }
  // TODO: reset
}

class Rod {
  constructor(x) {
    this.x = x;
    this.disks = [];
  }

  top() {
    return this.disks[this.disks.length-1] || {size: Infinity};
  }

  push(obj) {
    return this.disks.push(obj);
  }

  pop(obj) {
    return this.disks.pop(obj);
  }

  unshift(obj) {
    return this.disks.unshift(obj);
  }
}

class Disk {
  constructor(size) {
    this.size = size;
  }
}

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
