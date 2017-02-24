var hanoi;
var selected;

function setup() {
  createCanvas(600, 300);
  hanoi = new Hanoi(3, 3);
  noLoop();
}

function draw() {
  background(200);
  hanoi.draw();
}

function keyPressed() {
  if (selected == undefined) {
    switch (keyCode) {
      case 49: case 97:
        selected = 0;
        break;
      case 50: case 98:
        selected = 1;
        break;
      case 51: case 99:
        selected = 2;
        break;
      default:
    }
  } else {
    switch (keyCode) {
      case 49: case 97:
        hanoi.moveDisk(selected, 0);
        selected = null;
        break;
      case 50: case 98:
        hanoi.moveDisk(selected, 1);
        selected = null;
        break;
      case 51: case 99:
        hanoi.moveDisk(selected, 2);
        selected = null;
        break;
      default:
    }
  }
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
        new Disk(i)
      );
    }
  }

  solve() {
    this.moveDisks(this.numDisks, 0, 1, 2);
  }

  moveDisks(n, start, help, end) {
    if (n>1) this.moveDisks(n-1, start, end, help);
    this.moveDisk(start, end);
    if (n>1) this.moveDisks(n-1, help, start, end);
  }

  moveDisk(start, end) {
    this.rods[end].push(this.rods[start].pop());
    console.log('Move disk from rod ' + start + ' to rod ' + end);
    redraw();
  }

  draw() {
    for (let rod of this.rods) {
      rod.draw();
    }
  }

  // TODO: reset
}

class Rod {
  constructor(x) {
    this.x = x;
    this.disks = [];
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

  draw() {
    rect(this.x-10, height/4, 20, height/4*3);
    let drawHeight = height;
    for (let disk of this.disks) {
      disk.draw(this.x, drawHeight-=30);
    }
  }
}

class Disk {
  constructor(size) {
    this.size = (size+1)*50;
  }

  draw(x, y) {
    rect(x-this.size/2, y, this.size, 30);
  }
}
