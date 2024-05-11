import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import * as taskAPI from "../../../api/tasks"
import { useCookies } from "react-cookie";

export default function TaskCard({ task }) {
    const [cookies, setCookies] = useCookies(['token'])
    const [taskInfo, setTaskInfo] = useState(task)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const resp = await taskAPI.getTask(cookies.token, task.projectId, task.id)
            console.log(resp)
            setTaskInfo(resp)
            setLoading(false)
        }
        fetchData()
    }, [])

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
            <Card.Title>{taskInfo.title}</Card.Title>
            <Card.Subtitle>Assigned to {taskInfo.assignedMember ? taskInfo.assignedMember : "none"}</Card.Subtitle>
            <Card.Text style={{minHeight: "72px"}}>
                {taskInfo.description}
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Subtitle className="pt-1">{(new Date(taskInfo.createdAt)).toLocaleDateString()} {(new Date(taskInfo.createdAt)).toLocaleTimeString()}</Card.Subtitle>
        </Card.Footer>
        <Card.Footer className="d-flex flex-row justify-content-evenly">
            <Button>Edit</Button>
            <Button variant="danger">Delete</Button>
        </Card.Footer>
    </Card>
}