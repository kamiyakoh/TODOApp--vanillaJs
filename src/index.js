//import "./styles.css";
let taskChecks = document.getElementsByName("taskCheck");
let count = 1;

const taskInputs = document.getElementById("taskInputs");
const addTask = document.getElementById("js-addTask");
addTask.addEventListener("click", () => {
  count++;
  const addInput = document.createElement("input");
  addInput.type = "text";
  addInput.name = "task";
  const addBr = document.createElement("br");

  taskInputs.appendChild(addInput);
  taskInputs.appendChild(addBr);
});

const delTask = document.getElementById("js-delTask");
delTask.addEventListener("click", () => {
  if (count > 1) {
    count--;
    for (let i = 0; i < 2; i++) {
      const lastInput = taskInputs.lastElementChild;
      lastInput.remove();
    }
  }
  console.log(taskChecks.length);
});

const createActiveBoard = document.getElementById("js-submit__new");
createActiveBoard.addEventListener("click", (event) => {
  event.preventDefault();

  const actives = document.getElementById("js-actives");
  const title = document.getElementById("newTitle");
  const tasks = document.getElementsByName("task");
  const activeBoard = document.createElement("div");
  activeBoard.className = "c-board p-activeBoard";
  activeBoard.innerHTML = `<h3 class="p-title">${title.value}</h3>`;
  actives.appendChild(activeBoard);

  const activeBoardCount = document.getElementsByClassName("p-activeBoard")
    .length;
  const checkLists = document.createElement("form");
  checkLists.action = "";
  checkLists.method = "GET";
  checkLists.id = `checkList${activeBoardCount}`;
  checkLists.className = "c-checkList";
  activeBoard.appendChild(checkLists);

  const addDiv = document.createElement("div");
  checkLists.appendChild(addDiv);

  tasks.forEach((item) => {
    if (item.value) {
      const checkList = document.createElement("input");
      checkList.type = "checkbox";
      checkList.name = "taskCheck";
      const checkListText = document.createTextNode(item.value);
      const addBr = document.createElement("br");

      addDiv.appendChild(checkList);
      addDiv.appendChild(checkListText);
      addDiv.appendChild(addBr);
    }
  });

  const addDivRight = document.createElement("div");
  checkLists.appendChild(addDivRight);

  const delBoard = document.createElement("input");
  delBoard.type = "button";
  delBoard.id = `delBoard${activeBoardCount}`;
  delBoard.className = "c-btn__board p-btn__board--del";
  delBoard.value = "削除";
  addDivRight.appendChild(delBoard);

  taskChecks = document.getElementsByName("taskCheck");
  for (let taskCheck of taskChecks) {
    taskCheck.addEventListener("change", () => {
      let flag = false;
      const thisFormID = taskCheck.parentElement.parentElement.id;
      const thisForm = document.getElementById(thisFormID);
      const thisFormTasks = thisForm.querySelectorAll(
        'div input[name="taskCheck"]'
      );
      for (let i of thisFormTasks) {
        if (i.checked) {
          flag = true;
        } else {
          flag = false;
          const btnCompId = `btn_wrapper${thisFormID}`;
          const btnComp = document.getElementById(btnCompId);
          if (btnComp) {
            btnComp.remove();
          }
          break;
        }
      }
      if (flag) {
        const thisFormDivLeft = thisForm.firstElementChild;
        const btnComplete = document.createElement("div");
        btnComplete.id = `btn_wrapper${thisFormID}`;
        btnComplete.innerHTML = `<input type="button" class="p-btn__complete js-btn__complete" value="完了">`;
        thisFormDivLeft.appendChild(btnComplete);
      }
    });
  }
  const btnBoardDels = document.getElementsByClassName("p-btn__board--del");
  for (let btnBoardDel of btnBoardDels) {
    btnBoardDel.addEventListener("click", () => {
      const boardDel = btnBoardDel.closest(".c-board");
      boardDel.remove();
    });
  }
});
