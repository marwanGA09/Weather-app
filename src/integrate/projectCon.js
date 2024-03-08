import Project from "../app/Project";
import TaskClass from "../app/task";
import CreateProjectItem from "../dom/createProjectItem";
import { defaultRender, renderTasks } from "./createCardContainer";
import { addItemEventLister, clearForm } from "./taskCreator";

const projectItems = document.querySelector(".project-items");
function createProjectItemFunction(projectObjectName) {
  const project1 = new Project(projectObjectName);
  const ul = new CreateProjectItem().createLI(
    project1.name,
    Project.setProjects.length
  );
  projectItems.appendChild(ul);

  const addItems = document.querySelectorAll(".add-item");
  addItemEventLister(addItems);

  const projectItemsArray = document.querySelectorAll(".project-item");
  projectItemsArray.forEach((item) => {
    item.addEventListener("click", (ev) => {
      renderTasks(ev);

      const card = document.querySelectorAll(".card");
      card.forEach((ca) => {
        ca.addEventListener("click", (event) => {
          // console.log("target", event.target);
          // console.log("currentTarget", event.currentTarget);
          const objIndex = event.currentTarget.dataset.objectIndex;
          const proIndex = event.currentTarget.dataset.projectIndex;
          if (event.target.className === "is-done") {
            Project.setProjects[proIndex]
              .getOriginalProjectItem()
              [objIndex].isDoneChanger();
            Project.setProjects[proIndex].setOriginalProjectItem();
          }
          if (event.target.className === "btn-del-elm") {
            console.log(Project.setProjects[proIndex].getOriginalProjectItem());

            Project.setProjects[proIndex]
              .getOriginalProjectItem()
              .splice(objIndex, 1);

            // console.log(Project.setProjects[proIndex].getOriginalProjectItem());
            Project.setProjects[proIndex].setOriginalProjectItem();
            renderTasks(proIndex);
          }
          if (event.target.className === "view") {
            const modal = document.querySelector(".modal");
            const formData = document.querySelector(".item-form");

            const cancelBtn = document.querySelector(".cancel-task");
            const addTask = document.querySelector(".add-task");
            cancelBtn.textContent = "Exit";
            addTask.textContent = "Save and Exit";

            modal.showModal();

            const tittle = document.querySelector("#tittle");
            const description = document.querySelector("#description");
            const dueDate = document.querySelector("#due-date");
            tittle.value =
              Project.setProjects[proIndex].projectsItem[objIndex].tittle;
            description.value =
              Project.setProjects[proIndex].projectsItem[objIndex].description;

            const date =
              Project.setProjects[proIndex].projectsItem[objIndex].dueDate;
            dueDate.value = new Date(date).toISOString().slice(0, 16);
            cancelBtn.addEventListener("click", () => {
              clearForm(modal);
              modal.close();
            });

            addTask.addEventListener(
              "click",
              () => {
                const dataInput = Object.fromEntries(new FormData(formData));
                Project.setProjects[proIndex]
                  .getOriginalProjectItem()
                  [objIndex].updateTittle(dataInput.tittle);
                Project.setProjects[proIndex]
                  .getOriginalProjectItem()
                  [objIndex].updateDescription(dataInput.description);

                // my code is not updating Date and Priority

                // Project.setProjects[proIndex]
                //   .getOriginalProjectItem()
                //   [objIndex].updateDate(dataInput["due-date"]);

                Project.setProjects[proIndex].setOriginalProjectItem();
                renderTasks(proIndex);
              },
              { once: true }
            );
          }
        });
      });
    });
  });
}

const dialog2 = document.querySelector(".dialog2");
function createProjectEvent() {
  const addDialog2 = document.querySelector(".add-dialog2");
  addDialog2.addEventListener("click", () => {
    const inp = document.querySelector("#dialog2");
    if (inp.value) {
      createProjectItemFunction(inp.value);
    }
    inp.value = "";
    dialog2.close();
  });
}

const addProject = document.querySelector(".add-project");
addProject.addEventListener("click", () => {
  dialog2.showModal();
  createProjectEvent();
  document.querySelector(".cancel-modal").addEventListener("click", () => {
    dialog2.close();
  });
});

/* eslint-disable max-len */
const defaultData = [
  [
    {
      tittle:
        "Complete JavaScript Algorithms and Data Structures Certification on freeCodeCamp",
      description:
        "Finish the remaining challenges and projects to earn the certification. Cover topics like ES6, Regular Expressions, Debugging, Data Structures, and Algorithms.",
      dueDate: "2024-03-15T23:59:59",
      priority: 2,
      category: "study",
      isDone: false,
    },
    {
      tittle: "Read 'Clean Code: A Handbook of Agile Software Craftsmanship'",
      description:
        "Explore best practices for writing clean, maintainable code. Learn about principles such as meaningful names, functions, comments, formatting, error handling, and refactoring.",
      dueDate: "2024-03-10T18:00:00",
      priority: 3,
      category: "study",
      isDone: false,
    },
    {
      tittle: "Attend Machine Learning Workshop",
      description:
        "Participate in a workshop organized by the local tech community. Gain insights into machine learning concepts, algorithms, and applications.",
      dueDate: "2024-03-08T09:00:00",
      priority: 1,
      category: "study",
      isDone: false,
    },
    {
      tittle: "Study Arabic Grammar",
      description:
        "Dedicate time to review Arabic grammar rules, focusing on verb conjugations, sentence structure, and vocabulary.",
      dueDate: "2024-03-20T20:00:00",
      priority: 4,
      category: "study",
      isDone: false,
    },
    {
      tittle: "Complete React Native Project",
      description:
        "Work on developing a mobile application using React Native. Implement features such as user authentication, data fetching, and UI components.",
      dueDate: "2024-03-25T15:30:00",
      priority: 2,
      category: "study",
      isDone: false,
    },
    {
      tittle: "Prepare for Computer Science Exam",
      description:
        "Review lecture notes, textbooks, and practice problems to ensure thorough understanding of key concepts in computer science. Focus areas include algorithms, data structures, and programming languages.",
      dueDate: "2024-03-12T12:00:00",
      priority: 3,
      category: "study",
      isDone: false,
    },
  ],
  [
    {
      tittle: " Buy Ingredients for Homemade Pizza Night",
      description:
        "Make a list of fresh produce, cheese, sauce, and toppings needed to create delicious homemade pizzas. Don't forget everyone's favorite toppings and extra cheese!",
      dueDate: "2024-03-05T16:00:00",
      priority: 2,
      category: "shopping",
      isDone: false,
    },
    {
      tittle: " Purchase New Video Games",
      description:
        "Browse online stores for the latest video game releases. Add favorite titles to the cart and check for any discounts or special offers. Get ready for hours of gaming fun!",
      dueDate: "2024-03-08T20:00:00",
      priority: 3,
      category: "shopping",
      isDone: false,
    },
    {
      tittle: " Update Wardrobe for Spring",
      description:
        "Visit local clothing stores or browse online for trendy outfits and accessories. Look for lightweight fabrics, floral prints, and pastel colors to welcome the spring season in style.",
      dueDate: "2024-03-12T12:00:00",
      priority: 1,
      category: "shopping",
      isDone: false,
    },
    {
      tittle: "Buy Gardening Supplies",
      description:
        "Head to the hardware store or garden center to stock up on gardening essentials. Purchase soil, seeds, pots, and tools needed for planting flowers, herbs, and vegetables.",
      dueDate: "2024-03-18T10:00:00",
      priority: 4,
      category: "shopping",
      isDone: false,
    },
    {
      tittle: "Upgrade Home Entertainment System",
      description:
        "Research the latest tech gadgets for enhancing the home entertainment experience. Explore options for smart TVs, sound systems, streaming devices, and gaming accessories. Transform movie nights and gaming sessions!",
      dueDate: "2024-03-20T15:30:00",
      priority: 2,
      category: "shopping",
      isDone: false,
    },
    {
      tittle: " Stock Up on Pet Food and Toys",
      description:
        "Visit the pet store to replenish supplies for furry friends. Purchase nutritious food, treats, and toys to keep pets happy and healthy. Don't forget to check for any special promotions or new products!",
      dueDate: "2024-03-15T14:00:00",
      priority: 3,
      category: "shopping",
      isDone: false,
    },
  ],

  [
    {
      tittle:
        "Family Movie Night: Watch 'Harry Potter and the Sorcerer's Stone'",
      description:
        "Gather the family for a cozy movie night at home. Enjoy the magical world of Harry Potter as you follow the adventures of Harry, Hermione, and Ron in their first year at Hogwarts School of Witchcraft and Wizardry.",
      dueDate: "2024-03-05T20:00:00",
      priority: 2,
      category: "entertainment",
      isDone: false,
    },
    {
      tittle: "Game Night with Friends: Play 'Among Us' Online",
      description:
        "Organize an online game session with friends. Join together to solve the mystery of who among you is the impostor in the popular multiplayer game 'Among Us'. Prepare for laughter, accusations, and epic betrayals!",
      dueDate: "2024-03-08T19:00:00",
      priority: 3,
      category: "entertainment",
      isDone: false,
    },
    {
      tittle: "Weekend Picnic in the Park",
      description:
        "Plan a delightful picnic outing with family and friends. Pack delicious snacks, sandwiches, and refreshing beverages. Enjoy the fresh air, scenic views, and quality time together amidst nature.",
      dueDate: "2024-03-12T12:30:00",
      priority: 1,
      category: "entertainment",
      isDone: false,
    },
    {
      tittle: "Family Board Game Tournament",
      description:
        "Host a friendly competition featuring a variety of classic board games. Set up a tournament bracket and challenge family members to games like Monopoly, Scrabble, and Clue. May the best player win!",
      dueDate: "2024-03-18T16:00:00",
      priority: 4,
      category: "entertainment",
      isDone: false,
    },
    {
      tittle:
        "Virtual Concert Viewing: 'BTS Permission to Dance on Stage' Live",
      description:
        "Join millions of fans worldwide for a virtual concert experience with the global superstars BTS. Enjoy electrifying performances, captivating visuals, and unforgettable moments with the beloved K-pop group.",
      dueDate: "2024-03-20T02:00:00",
      priority: 2,
      category: "entertainment",
      isDone: false,
    },
    {
      tittle: "DIY Craft Night with Family",
      description:
        "Get creative with a DIY craft night at home. Gather art supplies and work together on fun projects like homemade greeting cards, painted rocks, or personalized photo frames. Let imaginations soar!",
      dueDate: "2024-03-15T18:30:00",
      priority: 3,
      category: "entertainment",
      isDone: false,
    },
  ],
];
/* eslint-enable max-len */

// console.log(JSON.parse(localStorage.getItem(Project.setProjects[0].name)));
const localStorageKey = JSON.parse(localStorage.getItem("localStorageKey"));
// console.log(localStorageKey);
function assignTask(data) {
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      const currentTask = data[i][j];

      const task = new TaskClass(
        currentTask.tittle,
        currentTask.description,
        new Date(currentTask.dueDate),
        currentTask.category,
        currentTask.priority,
        currentTask.isDone
      );
      Project.setProjects[i].projectsItem = task.getObject();
    }
    // Project.setProjects[i].setOriginalProjectItem();
  }
  // console.log("after assign", Project.setProjects[0].projectItems);
}
// console.log(localStorageKey);
// console.log(localStorageKey[0]);
if (localStorageKey != null) {
  // console.log("local");
  // console.log(localStorage.getItem("localStorageKey"));
  const dataContainer = [];

  for (let i = 0; i < localStorageKey.length; i += 1) {
    // console.log(JSON.parse(localStorage.getItem(localStorageKey[i])));
    dataContainer.push(JSON.parse(localStorage.getItem(localStorageKey[i])));
  }
  const local = JSON.parse(localStorage.getItem("localStorageKey"));
  for (let i = 0; i < local.length; i += 1) {
    createProjectItemFunction(local[i]);
  }
  // console.log('########## datacontainer', dataContainer);
  assignTask(dataContainer);
  // console.log('from local storage');
} else {
  // console.log('from default');
  createProjectItemFunction("study");
  createProjectItemFunction("shopping");
  createProjectItemFunction("entertainment");
  // console.log('$$$$$$$$$$$defaultdata', defaultData);
  assignTask(defaultData);
}

defaultRender();

const card = document.querySelectorAll(".card");
card.forEach((ca) => {
  ca.addEventListener("click", (ev) => {
    console.log("target", ev.target);
    console.log("currentTarget", ev.currentTarget);
    const objIndex = ev.currentTarget.dataset.objectIndex;
    const proIndex = ev.currentTarget.dataset.projectIndex;
    if (ev.target.className === "is-done") {
      Project.setProjects[proIndex]
        .getOriginalProjectItem()
        [objIndex].isDoneChanger();
      Project.setProjects[proIndex].setOriginalProjectItem();
    }
    if (ev.target.className === "btn-del-elm") {
      console.log(Project.setProjects[proIndex].getOriginalProjectItem());
      console.log(
        Project.setProjects[proIndex]
          .getOriginalProjectItem()
          .splice(objIndex, 1)
      );
      console.log(Project.setProjects[proIndex].getOriginalProjectItem());
      Project.setProjects[proIndex].setOriginalProjectItem();
      renderTasks(proIndex);
    }

    if (ev.target.className === "view") {
      const modal = document.querySelector(".modal");
      const formData = document.querySelector(".item-form");

      const cancelBtn = document.querySelector(".cancel-task");
      const addTask = document.querySelector(".add-task");
      cancelBtn.textContent = "Exit";
      addTask.textContent = "Save and Exit";

      modal.showModal();

      const tittle = document.querySelector("#tittle");
      const description = document.querySelector("#description");
      const dueDate = document.querySelector("#due-date");
      tittle.value =
        Project.setProjects[proIndex].projectsItem[objIndex].tittle;
      description.value =
        Project.setProjects[proIndex].projectsItem[objIndex].description;

      const date = Project.setProjects[proIndex].projectsItem[objIndex].dueDate;
      dueDate.value = new Date(date).toISOString().slice(0, 16);
      cancelBtn.addEventListener("click", () => {
        clearForm(modal);
        modal.close();
      });

      addTask.addEventListener(
        "click",
        () => {
          const dataInput = Object.fromEntries(new FormData(formData));
          Project.setProjects[proIndex]
            .getOriginalProjectItem()
            [objIndex].updateTittle(dataInput.tittle);
          Project.setProjects[proIndex]
            .getOriginalProjectItem()
            [objIndex].updateDescription(dataInput.description);

          Project.setProjects[proIndex].setOriginalProjectItem();
          renderTasks(proIndex);
        },
        { once: true }
      );
    }
  });
});
