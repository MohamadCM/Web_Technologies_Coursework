const imageUploadElement = document.getElementById('imageUpload');
const puzzleContainer = document.getElementById('puzzle-container');
let tiles = [];
const ROWS = 4;
const COLS = 4;
let EMPTY_TILE_INDEX = ROWS * COLS - 1;

imageUploadElement.addEventListener('change', loadImage);

// Upload image and create the puzzle
function loadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const image = new Image();
    image.src = e.target.result;
    image.onload = function() {
      createPuzzle(image);
    };
  };

  reader.readAsDataURL(file);
}

function createPuzzle(image) {
  puzzleContainer.innerHTML = '';
  tiles = [];

  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.width = `${100}%`;
    tile.style.height = `${100}%`;

    if (i < ROWS * COLS - 1) {
      const x = (i % ROWS) * 100;
      const y = Math.floor(i / COLS) * 100;
      tile.style.backgroundImage = `url(${image.src})`;
      tile.style.backgroundPosition = `-${x}px -${y}px`;
      tile.dataset.index = i;
      tile.addEventListener('click', moveTile);
    } else {
      tile.classList.add('blank');
    }

    tiles.push(tile);
    puzzleContainer.appendChild(tile);
  }

  EMPTY_TILE_INDEX = ROWS * COLS - 1;
  shuffleTiles();
}

function shuffleTiles() {
  tiles = tiles.sort(() => Math.random() - 0.5);

  puzzleContainer.innerHTML = '';
  tiles.forEach((tile, index) => {
    tile.dataset.index = index;
    puzzleContainer.appendChild(tile);
    if (tile.classList.contains('blank')) EMPTY_TILE_INDEX = index;
  });
}

function moveTile(event) {
  const clickedIndex = parseInt(event.target.dataset.index);
  if (isAdjacent(clickedIndex, EMPTY_TILE_INDEX)) {
    [tiles[clickedIndex], tiles[EMPTY_TILE_INDEX]] = [tiles[EMPTY_TILE_INDEX], tiles[clickedIndex]];
    puzzleContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
      tile.dataset.index = index;
      puzzleContainer.appendChild(tile);
      if (tile.classList.contains('blank')) EMPTY_TILE_INDEX = index;
    });
    if (checkWin()) alert('You solved the puzzle!');
  }
}

function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / ROWS), col1 = index1 % ROWS;
  const row2 = Math.floor(index2 / ROWS), col2 = index2 % ROWS;
  return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
}

function checkWin() {
  return false;
  // return tiles.every((tile, index) => tile.dataset.index == index);
}
