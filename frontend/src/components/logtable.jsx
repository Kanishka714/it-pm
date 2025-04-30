<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Management Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.20.6/babel.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>


      const handleSave = () => {
        onUpdate(task.id, { title, description, status });
        setIsEditing(false);
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Task title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Task description"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {task.status}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    // Task List Component
    const TaskList = ({ tasks, onUpdate, onDelete }) => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      );
    };

    // Add Task Form Component
    const AddTaskForm = ({ onAdd }) => {
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
          onAdd({ title, description, status: 'To Do' });
          setTitle('');
          setDescription('');
        }
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Task title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Task description"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Task
            </button>
          </div>
        </div>
      );
    };

    // Main App Component
    const App = () => {
      const [tasks, setTasks] = useState([]);
      const [filter, setFilter] = useState('All');

      useEffect(() => {
        // Simulate fetching tasks from an API
        const fetchTasks = async () => {
          try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
            const fetchedTasks = response.data.map((todo) => ({
              id: todo.id,
              title: todo.title,
              description: 'Sample description',
              status: todo.completed ? 'Done' : 'To Do',
            }));
            setTasks(fetchedTasks);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
        fetchTasks();
      }, []);

      const addTask = (newTask) => {
        setTasks([...tasks, { id: Date.now(), ...newTask }]);
      };

      const updateTask = (id, updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
      };

      const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
      };

      const filteredTasks = tasks.filter((task) => {
        if (filter === 'All') return true;
        return task.status === filter;
      });

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Task Management Dashboard</h1>
          
          <AddTaskForm onAdd={addTask} />
          
          <div className="mb-6">
            <label className="mr-2">Filter by Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
        </div>
      );
    };

    // Render the app
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>