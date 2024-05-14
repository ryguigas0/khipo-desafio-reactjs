import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";
import TaskFormContext from "../../../contexts/TaskFormContext"
import TaskListContext from "../../../contexts/TaskListContext"
import * as taskAPI from "../../../api/tasks"

export default function TaskCard({ task, loading }) {
    const [cookies, setCookies] = useCookies(['token'])
    const [taskFormShow, setTaskFormShow, taskFormData, setTaskFormData] = useContext(TaskFormContext)
    const [taskList, setTaskList] = useContext(TaskListContext)

    const handleEdit = () => {
        setTaskFormShow(true)
        setTaskFormData(task)
    }

    const handleDelete = async () => {
        console.log('DELETING TASK')
        await taskAPI.deleteTask(cookies.token, task.id, task.projectId)
        setTaskList(taskList.filter(t => t.id != task.id))
    }

    if (loading) return <Card className="placeholder-glow">
        <Card.Body>
            <Card.Title><span className="placeholder col-9"></span></Card.Title>
            <Card.Subtitle><span className="placeholder col-8"></span></Card.Subtitle>
            <Card.Text>
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Subtitle className="pt-1"><span className="placeholder col-9"></span></Card.Subtitle>
        </Card.Footer>
        <Card.Footer className="d-flex flex-row justify-content-evenly">
            <Button disabled>Edit</Button>
            <Button variant="danger" disabled>Delete</Button>
        </Card.Footer>
    </Card>

    return <Card>
        <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Subtitle>Assigned to {task.assignedMember ? task.assignedMember.name : "none"}</Card.Subtitle>
            <Card.Text style={{ minHeight: "72px" }}>
                {task.description}
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Subtitle className="pt-1">{(new Date(task.createdAt)).toLocaleDateString()} {(new Date(task.createdAt)).toLocaleTimeString()}</Card.Subtitle>
        </Card.Footer>
        <Card.Footer>
            <Card.Subtitle className="pt-1 d-flex flex-row flex-wrap gap-1">
                {task.tags.map((t) => <Badge pill bg="primary" key={t.id}>{t.title}</Badge>)}
            </Card.Subtitle>
        </Card.Footer>
        <Card.Footer className="d-flex flex-row justify-content-evenly">
            {task.status !== "done" && <Button onClick={handleEdit}>Edit</Button>}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Card.Footer>
    </Card>
}