var hanoi;
var selected1, selected2;

function keyPressed() {
  if (selected1 == undefined) {
    switch (keyCode) {
      case 49: case 97:
        selected1 = 0;
        break;
      case 50: case 98:
        selected1 = 1;
        break;
      case 51: case 99:
        selected1 = 2;
        break;
      default:
        break;
    }
  } else {
    switch (keyCode) {
      case 49: case 97:
        selected2 = 0;
        break;
      case 50: case 98:
        selected2 = 1;
        break;
      case 51: case 99:
        selected2 = 2;
        break;
      default:
        break;
    }
  }
  if (selected1 != undefined && selected2 != undefined) {
    hanoi.moveDisk(selected1, selected2);
    selected1 = selected2 = null;
  }
}

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
