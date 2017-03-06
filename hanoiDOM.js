"use-strict";

var hanoi;
var selected1, selected2;

function setup() {
  noCanvas();
  hanoi = new Hanoi(5, 3);
  noLoop();
}

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

class Hanoi {
  constructor(nDisks, nRods) {
    this.rods = [];
    this.numDisks = nDisks;

    this.container = document.createElement('div');
    this.container.id = 'hanoi-container';
    this.container.classList.add('hanoi','container');
    document.body.appendChild(this.container);

    for (var i = 0; i < nRods; i++) {
      this.rods.push(
        new Rod(this.container, i === 0 ? nDisks : 0)
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
    if(this.rods[start].top().size < this.rods[end].top().size) {
      this.rods[end].disks.push(this.rods[start].disks.pop());
      console.log('Move disk from rod ' + start + ' to rod ' + end);
      redraw();
    } else {console.log('Invalid move');}
  }
  // TODO: reset
}

class Rod {
  constructor(element, disks) {
    this.container = document.createElement('div');
    this.container.classList.add('hanoi','container','rod');
    this.container.style.backgroundColor = 'hsl(' + Math.floor(Math.random()*256) + ', 50%, 50%)';
    element.appendChild(this.container);

    for (var i = 0; i < disks; i++) {
      this.disks.unshift(
        new Disk(this.container, i+1)
      );
    }
  }

  get disks() {
    return this.container.getElementsByClassName('disk');
  }

  top() {
    return this.disks[this.disks.length-1] || {size: Infinity};
  }
}

class Disk {
  constructor(element, size) {
    this.container = document.createElement('div');
    this.container.classList.add('hanoi','disk');
    this.container.style.width = 'calc(90% * ' + 1/size + ')';
    this.container.style.height = 'calc(10% * ' + 1/1 + ')';
    this.container.dataset.size = size;
    element.appendChild(this.container);
  }

  get size() {console.log(this.container.dataset.size);return this.container.dataset.size;}
}
