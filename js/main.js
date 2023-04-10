// Tab Click
// ====================================================
let tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    // Remove Active
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add Active
    tab.classList.add("active");

    // Hiding All Lists
    document.querySelectorAll(".list").forEach((ele) => {
      ele.style.display = "none";
    });

    // Showing Tasks List
    document.querySelector(tab.dataset.cont).style.display = "block";
  });
});
// ====================================================

// Click On Task Move It To Finished Tasks
// ====================================================
// document.querySelector(".tasks .task").forEach((task) => {
//   task.onclick = function (e) {
//     console.log(task);
//   }
// })
// document.querySelectorAll(".tasks .task").forEach((task) => {
// console.log(task);
// task.addEventListener("click", (e) => {
// console.log(e);

// For Input Id In Finished Tasks
// let finishedTaskNumber = 0;
// document.querySelectorAll(".finished .task").forEach((ele) => {
//   finishedTaskNumber++;
// });

// Add Task To Finished Tasks
// setTimeout(() => {
//   finishedTaskNumber++;
//   task.firstElementChild.id = `finish${finishedTaskNumber}`;
//   task.firstElementChild.setAttribute("checked", "");
//   task.lastElementChild.setAttribute("for", `finish${finishedTaskNumber}`);
//   document.querySelector(".finished").appendChild(task);
// }, 1000);
//   });
// });
// ====================================================

// Click On Finished Task Move It Back To Tasks
// ====================================================
// let finishedTasks = document
//   .querySelectorAll(".finished .task")
//   .forEach((task) => {
//     task.addEventListener("click", (e) => {
//       console.log(task);
//       alert()
//       // For Input Id In Tasks
//       // let taskNumber = 0;
//       // document.querySelectorAll(".tasks .task").forEach((ele) => {
//         // taskNumber++;
//       // });

//       // Return Finished To Tasks
//       // setTimeout(() => {
//       //   taskNumber++;
//       //   task.firstElementChild.id = `task${taskNumber}`;
//       //   task.firstElementChild.removeAttribute("checked");
//       //   task.lastElementChild.setAttribute("for", `task${taskNumber}`);
//       //   document.querySelector(".tasks").appendChild(task);
//       // }, 1000);
//     });
//   });
// ====================================================

// =======================Local Storage============================

// Get Tasks From LocalStorage And Print It
// ====================================================
let localStorageTasks = [];
let localStorageFinishedTasks = [];
if (localStorage.tasks) {
  localStorageTasks = JSON.parse(localStorage.tasks);
  if (localStorageTasks.length !== 0) {
    localStorageTasks.forEach((task) => {
      let li = document.createElement("li");
      li.classList.add("task");
      li.innerHTML = `
      <div>
        <input type="checkbox" id="${task.id}" />
        <label for="${task.id}">${task.title}</label>
      </div>
      <a href="#" class="deleteBtn"><i class="fa fa-trash-alt"></i></a>
    `;
      document.querySelector(".tasks").appendChild(li);
    });
  }
}
if (localStorage.finishedTasks) {
  localStorageFinishedTasks = JSON.parse(localStorage.finishedTasks);
  if (localStorageFinishedTasks.length !== 0) {
    localStorageFinishedTasks.forEach((task) => {
      let li = document.createElement("li");
      li.classList.add("task");
      li.innerHTML = `
      <div>
        <input checked type="checkbox" id="${task.id}" />
        <label for="${task.id}">${task.title}</label>
      </div>
      <a href="#" class="deleteBtn"><i class="fa fa-trash-alt"></i></a>
    `;
      document.querySelector(".finished").appendChild(li);
    });
  }
}
// ====================================================

// Add New Task
// ====================================================
document.querySelector(".add").addEventListener("click", (e) => {
  Swal.fire({
    title: "Write Your Task",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: (taskText) => {
      if (taskText) {
        let taskNumber = 1;
        document.querySelectorAll(".tasks .task").forEach((ele) => {
          taskNumber++;
        });

        console.log(taskNumber);
        // Add New Task To LocalStorage
        localStorageTasks.push({
          id: `task${taskNumber}`,
          title: taskText,
        });
        localStorage.tasks = JSON.stringify(localStorageTasks);

        setTimeout(() => {
          location.reload();
        }, 1500);

        // Create Element For New Task And Add To Browser
        // let li = document.createElement("li");
        // li.classList.add("task");
        // li.innerHTML = `
        //   <div>
        //     <input type="checkbox" id="task${taskNumber}" />
        //     <label for="task${taskNumber}">${taskText}</label>
        //   </div>
        //   <a href="#" class="deleteBtn"><i class="fa fa-trash-alt"></i></a>
        // `;
        // document.querySelector(".tasks").appendChild(li);

        // Show Success Alert
        Swal.fire("Good job!", "You Added New Task", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You Can not Add Empty Task!",
        });
      }

      //   return alert(login);
    },
    // allowOutsideClick: () => !Swal.isLoading(),
  });
});
// ====================================================

// Delete Task
// ====================================================
document.querySelectorAll(".tasks .deleteBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let task = e.currentTarget.parentElement;
    let taskId = task.firstElementChild.firstElementChild.id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete Task From Browser And LocalStorage
        task.remove();
        deleteTask(localStorageTasks, taskId, "task");
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  });
});
// ====================================================

// Delete Finished Task
// ====================================================
document.querySelectorAll(".finished .deleteBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let task = e.currentTarget.parentElement;
    console.log(task);
    let taskId = task.firstElementChild.firstElementChild.id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete Task From Browser And LocalStorage
        task.remove();
        deleteTask(localStorageFinishedTasks, taskId, "finished");
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  });
});

// ====================================================

// Search And Delete From LocalStorage Array
// ====================================================
function deleteTask(array, id, type) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      array.splice(i, 1);
    }
  }
  if (type === "task") {
    localStorage.tasks = JSON.stringify(localStorageTasks);
    console.log("task");
  }
  if (type === "finished") {
    localStorage.finishedTasks = JSON.stringify(localStorageFinishedTasks);
  }
  setTimeout(() => {
    location.reload();
  }, 1500);
}
// ====================================================

// Add To Finished Tasks
// ====================================================
// ====================================================
document.querySelectorAll(".tasks .task label").forEach((task) => {
  task.addEventListener("click", (e) => {
    let clickedTask = task.parentElement.parentElement;

    // Add To LocalStorage Finished Tasks
    localStorageFinishedTasks.push({
      id: clickedTask.firstElementChild.firstElementChild.id,
      title: clickedTask.firstElementChild.lastElementChild.textContent,
    });
    localStorage.finishedTasks = JSON.stringify(localStorageFinishedTasks);

    setTimeout(() => {
      // Removing From localStorage And Page
      task.parentElement.parentElement.remove();
      deleteTask(
        localStorageTasks,
        clickedTask.firstElementChild.firstElementChild.id,
        "task"
      );
    }, 1000);
  });
});
// ====================================================
