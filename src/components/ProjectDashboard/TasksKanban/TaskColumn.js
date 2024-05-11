import TaskCard from "./TaskCard";

export default function TaskColumn({ tasks }) {
    return <div className="d-flex flex-column gap-3">
        {
            tasks.map((t, i) => <TaskCard task={t} key={i} />)
        }
        {
            tasks.map((t, i) => <TaskCard task={t} key={i} />)
        }
        {
            tasks.map((t, i) => <TaskCard task={t} key={i} />)
        }
    </div>
}