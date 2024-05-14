import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";
import TaskFormContext from "../../../contexts/TaskFormContext";
import * as projectAPI from "../../../api/projects"
import * as taskAPI from "../../../api/tasks"
import { useCookies } from "react-cookie";
import { Plus } from "react-bootstrap-icons";
import TaskForm from "./TaskForm";
import TaskListContext from "../../../contexts/TaskListContext";
import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";

export default function TasksKanban(props) {
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(['token'])
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)
    const [showTaskForm, setTaskFormShow] = useState(false)
    const [taskFormData, setTaskFormData] = useState(null)
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        async function fetchData() {
            if (selectedProject) {
                const projectData = await projectAPI.getProject(cookies.token, selectedProject.id)
                let taskAcc = []
                for (let i = 0; i < projectData.tasks.length; i++) {
                    const task = projectData.tasks[i];
                    taskAcc.push(await taskAPI.getTask(cookies.token, task.projectId, task.id))
                }
                setTaskList(taskAcc)
            }
            setLoading(false)
        }
        fetchData()
    }, [selectedProject])

    const handleCreateTask = () => {
        setTaskFormShow(true)
        setTaskFormData(null)
    }

    if (loading) return <div
        style={{ display: 'grid', placeItems: "center", height: "90vh" }}
    >
        <Spinner animation="border" variant="primary" />
    </div>

    if (!selectedProject) return <div
        style={{ display: 'grid', placeItems: "center", height: "90vh" }}
    >
        <h3>Select a project to see it's tasks!</h3>
    </div>

    if (selectedProject && taskList.length === 0) return <TaskListContext.Provider value={[taskList, setTaskList]}>
        <TaskFormContext.Provider value={[showTaskForm, setTaskFormShow, taskFormData, setTaskFormData]}>
            <div
                style={{ display: 'grid', placeItems: "center", height: "90vh" }}
            >
                <div className="d-flex flex-column align-items-center gap-3">
                    <h3>This project has no tasks!</h3>
                    <div className="d-flex flex-row justify-content-evenly align-items-center border border-dark border-width-1 rounded p-2 m-1 gap-2">
                        <Button variant="none" onClick={handleCreateTask}>
                            <Plus fontSize={"200%"} />
                            <div className='fs-4'>Create task</div>
                        </Button>
                    </div>
                </div>
            </div>
            <TaskForm />
        </TaskFormContext.Provider>
    </TaskListContext.Provider>

    return <TaskListContext.Provider value={[taskList, setTaskList]}>
        <TaskFormContext.Provider value={[showTaskForm, setTaskFormShow, taskFormData, setTaskFormData]}>
            <Container style={{ width: "200%" }}>
                <Row>
                    <div className="d-flex flex-row justify-content-evenly align-items-center border border-dark border-width-1 rounded p-2 m-1 gap-2">
                        <Button variant="none" onClick={handleCreateTask}>
                            <Plus fontSize={"200%"} />
                            <div className='fs-4'>Create task</div>
                        </Button>
                    </div>
                </Row>
                <Row>
                    <Col xs={4}>
                        <h3>Pending</h3>
                        <TaskColumn loading={loading} tasks={taskList.filter(t => t.status === "pending")} />
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <h3>Ongoing</h3>
                        <TaskColumn loading={loading} tasks={taskList.filter(t => t.status === "ongoing")} />
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <h3>Done</h3>
                        <TaskColumn loading={loading} tasks={taskList.filter(t => t.status === "done")} />
                    </Col>
                </Row>
            </Container>
            <TaskForm />
        </TaskFormContext.Provider>
    </TaskListContext.Provider>
}