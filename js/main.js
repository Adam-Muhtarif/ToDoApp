// Tab Click
// ====================================================
let tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    // Remove Active
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add Active
    e.currentTarget.classList.add("active");

    // Hiding All Lists
    document.querySelectorAll(".list").forEach((list) => {
      list.style.display = "none";
    });

    // Showing List
    document.querySelector(e.currentTarget.dataset.type).style.display =
      "block";
  });
});
// ====================================================

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
        <label for="${task.id}"><span>${task.title}</span></label>
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
        <label for="${task.id}"><span>${task.title}</span></label>
      </div>
      <a href="#" class="deleteBtn"><i class="fa fa-trash-alt"></i></a>
    `;
      document.querySelector(".finished").appendChild(li);
    });
  }
}
// ====================================================

// Add To Finished Tasks
// ====================================================
document.querySelectorAll(".tasks .task label").forEach((task) => {
  task.addEventListener("click", (e) => {
    let clickedTask = e.currentTarget.parentElement.parentElement;

    // Add To LocalStorage Finished Tasks
    let id = clickedTask.firstElementChild.firstElementChild.id;
    let title = clickedTask.firstElementChild.lastElementChild.textContent;
    localStorageFinishedTasks.push({
      id: id,
      title: title,
    });
    localStorage.finishedTasks = JSON.stringify(localStorageFinishedTasks);

    // Removing From localStorage And List
    setTimeout(() => {
      clickedTask.remove();
      deleteTask(
        localStorageTasks,
        clickedTask.firstElementChild.firstElementChild.id,
        "task"
      );
    }, 1500);
  });
});
// ====================================================

// Return Finished Task To Tasks
// ====================================================
document.querySelectorAll(".finished .task label").forEach((task) => {
  task.addEventListener("click", (e) => {
    let clickedTask = e.currentTarget.parentElement.parentElement;

    // Add To LocalStorage Tasks Tasks
    localStorageTasks.push({
      id: clickedTask.firstElementChild.firstElementChild.id,
      title: clickedTask.firstElementChild.lastElementChild.textContent,
    });
    localStorage.tasks = JSON.stringify(localStorageTasks);

    // Removing From localStorage And List
    setTimeout(() => {
      clickedTask.remove();
      deleteTask(
        localStorageFinishedTasks,
        clickedTask.firstElementChild.firstElementChild.id,
        "finished"
      );
    }, 1500);
  });
});
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

        // Add New Task To LocalStorage
        localStorageTasks.push({
          id: `task${taskNumber}`,
          title: taskText,
        });
        localStorage.tasks = JSON.stringify(localStorageTasks);

        setTimeout(() => {
          location.reload();
        }, 1500);

        // Show Success Alert
        Toast.fire({
          icon: "success",
          title: "Added successfully",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Failed! Write Some Text",
        });
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
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
        setTimeout(() => {
          task.remove();
          deleteTask(localStorageTasks, taskId, "task");
        }, 1500);
        // Show Success Alert
        Toast.fire({
          icon: "success",
          title: "Deleted successfully",
        });
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
        setTimeout(() => {
          // Delete Task From Browser And LocalStorage
          task.remove();
          deleteTask(localStorageFinishedTasks, taskId, "finished");
        }, 1500);
        // Show Success Alert
        Toast.fire({
          icon: "success",
          title: "Deleted successfully",
        });
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
  }
  if (type === "finished") {
    localStorage.finishedTasks = JSON.stringify(localStorageFinishedTasks);
  }

  location.reload();
}
// ====================================================

// Small Center Alert
// ====================================================
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Toast.fire({
//   icon: "success",
//   title: "Signed in successfully",
// });
// ====================================================
