import Task from "../models/Task";
export const renderTasks = async (req, res) => {
    const tasks = await Task.find().lean();
    //console.log(tasks);
    res.render("index", { tasks: tasks });
  };
  
   export const createTask = async (req, res) => {
    try {
      const task = Task(req.body);
      //const taskSaved = await task.save();
      await task.save();
      //console.log(taskSaved);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  export const renderTaskEdit = async (req, res) => {
    //console.log(req.params.id);
    try {
      const task = await Task.findById(req.params.id).lean();
      res.render("edit", { task });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const editTask = async (req, res) => {
    //console.log(req.body);
    //console.log(req.params.id);
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, req.body);
    res.redirect("/");
  };

 export const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  };

  export const taskToggleDone = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.done = !task.done;
    await task.save();
    res.redirect("/");
  }