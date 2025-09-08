
const tasks = {
  todo: [
    { title: "UI/UX Design in the age of AI", tag: "Important", progress: 0, comments: 11, views: 187, users: ["A", "B"] },
    { title: "Responsive Website Design for 23 more clients", tag: "Meh", progress: 0, comments: 32, views: 115, users: ["C", "D", "E"] },
    { title: "Blog Copywriting (Low priority 😅)", tag: "OK", progress: 0, comments: 987, views: "21.8K", users: ["F"] },
    { title: "Landing page for Azunyan senpai", tag: "Not that important", progress: 0, comments: 5, views: 11, users: ["G"] },
  ],
  inProgress: [
    { title: "Machine Learning Progress", tag: "Important", progress: 52, comments: 11, views: 187, users: ["A", "B"] },
    { title: "Learn Computer Science", tag: "Meh", progress: 30, comments: 32, views: 115, users: ["C", "D", "E"] },
  ],
  completed: [
    { title: "User flow confirmation for fintech App", tag: "Important", progress: 100, comments: 11, views: "2.2K", users: ["A", "B"] },
    { title: "Do some usual chores", tag: "High Priority", progress: 100, comments: 1, views: 87, users: ["C"] },
    { title: "Write a few articles for slothUI", tag: "OK", progress: 100, comments: 987, views: "21.8K", users: ["D"] },
    { title: "Transform into a cyborg", tag: "OK", progress: 100, comments: 987, views: "21.8K", users: ["E", "F"] },
    { title: "Design 100 landing page for client", tag: "Not that important", progress: 100, comments: 5, views: 11, users: ["G"] },
  ],
};

const Tag = ({ label }) => {
  const colors = {
    Important: "bg-blue-100 text-blue-600",
    Meh: "bg-purple-100 text-purple-600",
    OK: "bg-yellow-100 text-yellow-600",
    "High Priority": "bg-red-100 text-red-600",
    "Not that important": "bg-gray-100 text-gray-600",
  };
  return <span className={`text-xs px-2 py-1 rounded-md ${colors[label]}`}>{label}</span>;
};

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3">
    <Tag label={task.tag} />
    <h3 className="font-semibold text-gray-700">{task.title}</h3>

    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${task.progress === 100 ? "bg-green-500" : "bg-orange-400"}`}
        style={{ width: `${task.progress}%` }}
      ></div>
    </div>

    <div className="flex justify-between text-sm text-gray-500">
      <span>💬 {task.comments}</span>
      <span>👀 {task.views}</span>
    </div>
  </div>
);

const Column = ({ title, tasks }) => (
  <div className="w-80 flex-shrink-0 bg-gray-50 p-4 rounded-xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-gray-800">{title}</h2>
      <span className="text-xs text-gray-500">+</span>
    </div>
    <div className="space-y-4">
      {tasks.map((t, i) => (
        <TaskCard key={i} task={t} />
      ))}
    </div>
  </div>
);

export default function Board() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex space-x-6 overflow-x-auto">
        <Column title="To Do" tasks={tasks.todo} />
        <Column title="In Progress" tasks={tasks.inProgress} />
        <Column title="Completed" tasks={tasks.completed} />
      </div>
    </div>
  );
}
