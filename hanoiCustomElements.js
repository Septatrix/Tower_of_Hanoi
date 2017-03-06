"use-strict";

var selected1, selected2;

function setup() {
  noCanvas(); noLoop();
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
    document.getElementsByTagName('septatrix-hanoi-game')[0].moveDisk(selected1, selected2);
    selected1 = selected2 = null;
  }
}

class HanoiGame extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    for (var i = 0; i < 3; i++) {
      let rod = document.createElement('septatrix-hanoi-rod');
      this.appendChild(rod);
    }
    for (var i = this.disks; i > 0; i--) {
      let disk = document.createElement('septatrix-hanoi-disk');
      disk.size = i;
      this.firstElementChild.push(disk);
    }
  }

  get disks() {
    return this.getAttribute('disks') || 0;
  }
  set disks(val) {
    this.setAttribute('disks', val);
  }

  solve() {
    this.moveDisks(this.nDisks, 0, 1, 2);
  }
  moveDisks(n, start, help, end) {
    if (n>1) this.moveDisks(n-1, start, end, help);
    this.moveDisk(start, end);
    if (n>1) this.moveDisks(n-1, help, start, end);
  }
  moveDisk(start, end) {
    if(
      this.getElementsByTagName('septatrix-hanoi-rod')[start].top().size
      < this.getElementsByTagName('septatrix-hanoi-rod')[end].top().size
    ) {
      this.getElementsByTagName('septatrix-hanoi-rod')[end].push(this.getElementsByTagName('septatrix-hanoi-rod')[start].pop());
    } else {
      console.log('Invalid move');
    }
  }

  // TODO: reset
}
customElements.define('septatrix-hanoi-game', HanoiGame);

class HanoiRod extends HTMLElement {
  constructor() {
    super();

    // for (var i = 0; i < 3; i++) {
    //   this.appendChild(new HanoiDisk(i+1));
    // }
  }
  connectedCallback() {
    this.style.backgroundColor = 'hsl(' + Math.floor(Math.random()*256) + ', 50%, 75%)';
  }

  push(ele) {
    this.appendChild(ele);
  }
  pop() {
    return this.lastElementChild;
  }
  top() {
    return this.lastElementChild || {size: Infinity};
  }
}
customElements.define('septatrix-hanoi-rod', HanoiRod);

class HanoiDisk extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.style.backgroundColor = 'hsl(' + Math.floor(Math.random()*256) + ', 75%, 50%)';
    this.style.width = 'calc(10% * ' + this.size + ')';
    this.style.height = 'calc(10% * ' + 1 + ')';
    // TODO: Make responsive
  }

  get size() {
    return this.dataset.size || Infinity;
  }
  set size(val) {
    this.dataset.size = val;
  }
}
customElements.define('septatrix-hanoi-disk', HanoiDisk);
