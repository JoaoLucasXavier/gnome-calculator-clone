/*
    ----------------------------------
    - Makes the calculator draggable -
    ----------------------------------
*/

(() => {
  var position1 = 0, position2 = 0, position3 = 0, position4 = 0;
  if (document.getElementById(element.id + "header")) {
    // se presente, o cabeçalho é onde você move o DIV
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
  } else {
    // caso contrário, mova o DIV de qualquer lugar dentro do DIV
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // obtenha a posição do cursor do mouse na inicialização:
    position3 = e.clientX;
    position4 = e.clientY;
    document.onmouseup = closeDragElement;
    // chame uma função sempre que o cursor se mover:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calcule a nova posição do cursor
    position1 = position3 - e.clientX;
    position2 = position4 - e.clientY;
    position3 = e.clientX;
    position4 = e.clientY;
    // defina a nova posição do elemento
    element.style.top = (element.offsetTop - position2) + "px";
    element.style.left = (element.offsetLeft - position1) + "px";
  }

  function closeDragElement() {
    // pare de se mover quando o botão do mouse for liberado
    document.onmouseup = null;
    document.onmousemove = null;
  }
})(element = document.getElementById("draggable"))

/*
    ------------------------
    - Calculator Algorithm -
    ------------------------
*/

const MAX_VISOR_CHAR = 10;
let count = []

function addNumber(number) {
  if (count.length == 0)
    document.getElementById("visor").innerHTML = "";
  if (document.getElementById("visor").innerHTML.length < MAX_VISOR_CHAR)
    document.getElementById("visor").innerHTML += number
}

function addComma() {
  let currentNumber = document.getElementById("visor").innerHTML;
  if (!currentNumber.includes(".")) {
    document.getElementById("visor").innerHTML += ".";
  }
}

function cleanVisor() {
  document.getElementById("visor").innerHTML = "";
}

function cleanAll() {
  document.getElementById("visor").innerHTML = "";
  document.getElementById("historic").innerHTML = "";
}

function calcAction(action) {
  let currentNumber = document.getElementById("visor").innerHTML;
  if (currentNumber === 0) return;
  count.push(Number(document.getElementById("visor").innerHTML));
  document.getElementById("historic").innerHTML += ` ${document.getElementById("visor").innerHTML} ${action} `;
  count.push(action);
  document.getElementById("visor").innerHTML = "";
}

function result() {
  if (count.length === 0) return;
  count.push(Number(document.getElementById("visor").innerHTML));
  document.getElementById("historic").innerHTML += `${document.getElementById("visor").innerHTML}`;
  proccessResult();
}

function proccessResult() {
  let action = null;
  let current = null;
  let total = 0;

  if (isNaN(count[count.length - 1])) {
    count.pop();
  }

  count.forEach(n => {
    if (!isNaN(n)) {
      if (current == null) {
        current = n;
      } else {
        total = processAction(current, n, action);
        current = null;
      }
    } else {
      action = n;
    }
  });

  if (current != null) {
    total = ProcessAction(total, current, action)
  }

  total = total.toString().substring(0, MAX_VISOR_CHAR);

  document.getElementById("historic").innerHTML += ` = ${total} <br>`;
  document.getElementById("visor").innerHTML = total;
  count = []
}

function processAction(num1, num2, action) {
  switch (action) {
    case '+': return num1 + num2
    case '-': return num1 - num2
    case 'x': return num1 * num2
    case '/': return num1 / num2
  }
}

function Percentage() {
  var currentNumber = document.getElementById("total").innerHTML
  if (currentNumber != "") {
    document.getElementById("total").innerHTML =
      Number(document.getElementById("total").innerHTML) / 100
  }
}
