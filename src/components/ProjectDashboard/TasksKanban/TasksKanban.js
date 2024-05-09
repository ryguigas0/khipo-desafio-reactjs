import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";
import TaskFormContext from "../../../contexts/TaskFormContext";
import * as projectAPI from "../../../api/projects"
import { useCookies } from "react-cookie";
import { Plus } from "react-bootstrap-icons";
import TaskForm from "./TaskForm";
import TaskListContext from "../../../contexts/TaskListContext";

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
                setTaskList(projectData.tasks)
            }
            setLoading(false)
        }
        fetchData()
        return () => { }
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
            <div className='loginContainer'>
                <Container className='p-4'>
                    <Row>
                        <Col>
                            {JSON.stringify(selectedProject)}
                            {JSON.stringify(taskList)}
                            <div
                                className="modal show"
                                style={{ display: 'block', position: 'initial' }}
                            >
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada diam ac ante egestas ullamcorper. Praesent egestas condimentum orci eget elementum. Maecenas ex turpis, ullamcorper a mollis vitae, auctor non massa. Pellentesque tincidunt elit non orci pulvinar, vel ultrices est malesuada. Duis justo tortor, gravida nec sollicitudin sed, blandit id tellus. Vestibulum vitae mollis lacus, tempor viverra tortor. Nunc turpis nisl, dignissim eu libero sit amet, dapibus hendrerit libero. Duis eleifend massa sapien, sit amet ullamcorper dui pharetra eu. Aliquam rutrum libero non nisi ultrices ultrices. Curabitur sit amet est eget est interdum fringilla.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </TaskFormContext.Provider>
    </TaskListContext.Provider>
}