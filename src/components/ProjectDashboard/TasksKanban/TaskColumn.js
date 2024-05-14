import TaskCard from "./TaskCard";

export default function TaskColumn({ tasks, loading }) {
    console.log({ tasks })
    return <div className="d-flex flex-column gap-3">
        {
            tasks.map(t => <TaskCard loading={loading} task={t} key={t.id} />)
        }
    </div>
}