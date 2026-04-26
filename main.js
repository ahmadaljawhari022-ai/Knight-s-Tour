const size = 8;
const board = Array(size)
  .fill()
  .map(() => Array(size).fill(-1));
const cells = [];

// رسم الرقعة
const boardDiv = document.getElementById("board");
for (let r = 0; r < size; r++) {
  cells[r] = [];
  for (let c = 0; c < size; c++) {
    const cell = document.createElement("div");
    cell.className = `cell ${(r + c) % 2 === 0 ? "white" : "black"}`;
    boardDiv.appendChild(cell);
    cells[r][c] = cell;
  }
}

// حركات الحصان الـ 8 الممكنة
const dr = [2, 1, -1, -2, -2, -1, 1, 2];
const dc = [1, 2, 2, 1, -1, -2, -2, -1];

// دالة النوم للتأثير البصري
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function solveGame() {
  board[0][0] = 0; // البداية من الزاوية
  if (await backtrack(0, 0, 1)) {
    alert("تم الحل بنجاح!");
  } else {
    alert("لا يوجد حل.");
  }
}

async function backtrack(r, c, moveCount) {
  // تحديث الواجهة
  cells[r][c].innerText = moveCount;
  cells[r][c].classList.add("visited");
  await sleep(50); // سرعة العرض

  if (moveCount === size * size) return true;

  for (let i = 0; i < 8; i++) {
    const nextR = r + dr[i];
    const nextC = c + dc[i];

    if (isValid(nextR, nextC)) {
      board[nextR][nextC] = moveCount;
      if (await backtrack(nextR, nextC, moveCount + 1)) return true;

      // التراجع (Backtrack)
      board[nextR][nextC] = -1;
      cells[nextR][nextC].innerText = "";
      cells[nextR][nextC].classList.remove("visited");
      await sleep(20);
    }
  }
  return false;
}

function isValid(r, c) {
  return r >= 0 && r < size && c >= 0 && c < size && board[r][c] === -1;
}
