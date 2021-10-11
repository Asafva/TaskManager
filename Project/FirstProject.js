let tasksArray = []
//תחילת הקוד יצירת מערך חדש שמיועד למשימות
function saveTask() {
    //פונקציית שמירה   
    const taskbox = document.getElementById("task_to_do");
    const datebox = document.getElementById("date_for_task");
    const timebox = document.getElementById("time_for_task");

    const task = taskbox.value;
    const date = datebox.value;
    const time = timebox.value;
    //לקיחת ערכים לפי האיידי שלהם ויצירת סטרינגים לשימוש בוואליו שלהם

    if (task != "" && date != "" && time != "") {
        // לולאת איף שאומרת שאם אחד או כל השדות  *לא ריקים* לשלוח משימה אך אם הם ריקים יש להציג הודעת שגיאה שמבקשת למלא את השדות

        const tasks = {
            task: task,
            date: date,
            time: time
        }
        //יצירת מעריך לפי האובייקטים

        tasksArray.push(tasks)
        //הוספת המערך ממולא לערכים עצמם
        storeTasks();
        restoreTask();

        taskbox.value = "";
        datebox.value = "";
        timebox.value = "";
    }
    else {
        alert("Please fill all task fields")
        //הודעת השגיאה למקרה שאחד או כל השדות ריקים
    }
}
function storeTasks() {
    const json = JSON.stringify(tasksArray);
    localStorage.setItem("tasks", json);
    //פונקציית שמירה של המשימה בלוקל סטורג לפי גייסון
}

function newTask(taskText, taskDate, taskTime) {
    //פונקציית שמירת משימה חדשה:
    // מה שבעצם עשיתי הוא יצרתי דיב חדש שבתוכו יהיו התתי משימות
    const newTask = document.createElement("div");
    //יצירת דיב חדש וככלי
    const deleteButton = document.createElement("button")
    //יצירת כפתור חדש למחיקה
    deleteButton.addEventListener('click', deleteTask, true);
    deleteButton.classList.add(`glyphicon`)
    deleteButton.classList.add(`glyphicon-remove`)
    //יצירת איוונט לכפתור מחיקה שבמקרה לחיצה עושה את פונקיית המחיקה שנמצאת למטה יותר בקוד
    const taskContent = document.createElement("div")
    //יצירת דיב בתוך הדיב החדש שהוא בעצם המשימה עצמה.
    taskContent.append(taskText);
    //קישור הדיב של המשימה
    const taskDateSpan = document.createElement("span")
    //יצירת תגית ספאן לצורך התאריך
    let dateObject = new Date(taskDate);
    //הכנסת התאריך שלנו להשוואה של ניודייט
    taskDateSpan.append(taskDate)
    const taskTimeSpan = document.createElement("span")
    //יצירת תגית לצורך השעה
    taskTimeSpan.append(taskTime)
    newTask.appendChild(deleteButton)
    newTask.appendChild(taskContent)
    newTask.appendChild(taskDateSpan)
    newTask.appendChild(taskTimeSpan)
    document.getElementById("tasks").appendChild(newTask);
    //קישור כל התגיות החדשות לפונקיה ליצירתם
}

function restoreTask() {
    const currentTime = new Date();

    document.getElementById("tasks").innerHTML = "";
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
    if (tasksArray == null)
        tasksArray = [];
    for (i = 0; i < tasksArray.length; i++) {
        let elementDate = new Date(tasksArray[i].date + " " + tasksArray[i].time);
        if (elementDate < currentTime) {
            tasksArray.splice(i, 1)
            i--;
        }
        else {
            newTask(tasksArray[i].task, tasksArray[i].date, tasksArray[i].time);
        }

    }
    storeTasks();
}
//פונקיית שיחזור למשימה בעצם מה שקורה לפי דרישת המשימה ברגע שעובר תאריך של משימה מסויימת היא אמורה להימחק, אז מה שעשיתי היה ליצור לולאת פור שעוברת על כל המערך וברגע שהיא מזהה שעובר התאריך היא מוחקת אותה מהמערך ואז בונים את המערך מחדש

function deleteTask(e) {
    let callerButton = e.target || e.srcElement;
    let taskDiv = callerButton.parentNode;
    let parent = taskDiv.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, taskDiv);
    tasksArray.splice(index, 1)
    storeTasks();
    restoreTask();
    //פונקיית מחיקה שמופעלת ע"י לחיצת כפתור ומוחקת את המשימה מהעמוד ומהמערך
}

