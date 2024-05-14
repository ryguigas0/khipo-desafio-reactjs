import { useContext } from "react"
import { Button, FloatingLabel, Form, FormGroup, FormLabel, InputGroup, Modal } from "react-bootstrap"
import * as formik from 'formik'
import * as yup from 'yup'
import { useCookies } from "react-cookie"
import TaskFormContext from "../../../contexts/TaskFormContext"
import MemberListContext from "../../../contexts/MemberListContext"
import TagListInput from "./TaskListInput/TagListInput"
import * as taskAPI from "../../../api/tasks"
import * as tagsAPI from "../../../api/tags"
import SelectedProjectContext from "../../../contexts/SelectedProjectContext"
import TaskListContext from "../../../contexts/TaskListContext"

export default function TaskForm(props) {
    const [taskFormShow, setTaskFormShow, taskFormData, setTaskFormData] = useContext(TaskFormContext)
    const [memberList, setMemberList] = useContext(MemberListContext)
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)
    const [taskList, setTaskList] = useContext(TaskListContext)
    const [cookies, setCookies] = useCookies(['token'])

    const { Formik } = formik

    const handleClose = () => {
        setTaskFormShow(false)
    }

    let initialValues = {
        title: taskFormData ? taskFormData.title : "",
        description: taskFormData ? taskFormData.description : "",
        assignedMember: taskFormData ? taskFormData.assignedMemberId : -1,
        tagsString: taskFormData ? JSON.stringify(taskFormData.tags) : "[]",
        tagsRemoveString: JSON.stringify("[]"),
        status: taskFormData ? taskFormData.status : "pending"
    }

    let schema = {
        title: yup.string().min(1).max(255).required(),
        description: yup.string().notRequired().min(1),
        assignedMember: yup.number().min(-1).required(),
        tagsString: yup.string().notRequired(),
        tagsRemoveString: yup.string().notRequired(),
        status: yup.string().notRequired()
    }

    let taskSchema = yup.object(schema)

    const handleSave = async (values) => {
        if (taskFormData) {
            const removedTags = JSON.parse(values.tagsRemoveString)

            const newTags = JSON.parse(values.tagsString)
                .map(t => t.title)
                .filter(t => taskFormData.tags.findIndex(prevTag => prevTag.title === t) === -1)

            for (let i = 0; i < removedTags.length; i++) {
                const removedTag = removedTags[i];
                await tagsAPI.deleteTag(cookies.token, removedTag.id, taskFormData.id, selectedProject.id)
            }

            for (let i = 0; i < newTags.length; i++) {
                const newTag = newTags[i];
                await tagsAPI.createTag(cookies.token, newTag, taskFormData.id, selectedProject.id)
            }

            const resp = await taskAPI.updateTask(
                cookies.token,
                taskFormData.id,
                selectedProject.id,
                values.title,
                values.description,
                values.assignedMember === -1 ? null : values.assignedMember,
                values.taskStatus
            )

            const newTaskList = Array.from(taskList).map(t => {
                if (t.id === taskFormData.id) {
                    return resp
                }
                return t
            })

            setTaskList(newTaskList)
        } else {
            const newTags = JSON.parse(values.tagsString).map(t => t.title)

            const resp = await taskAPI.createTask(
                cookies.token,
                selectedProject.id,
                values.title,
                values.description,
                newTags,
                values.assignedMember === -1 ? null : values.assignedMember
            )

            const newTaskList = [].concat(taskList, [resp])
            setTaskList(newTaskList)
        }
        handleClose()
    }

    return <Modal show={taskFormShow} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>{taskFormData ? "Editing task" : "Create new task"}</Modal.Title>
        </Modal.Header>
        <Formik
            validationSchema={taskSchema}
            initialValues={initialValues}>
            {
                ({ handleChange, setFieldValue, values, touched, errors, status }) => <>
                    <Modal.Body>
                        <Form noValidate validated={false}>
                            <InputGroup className="pb-3">
                                <FloatingLabel
                                    controlId="title"
                                    label="Task title"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Task title"
                                        aria-label="Task title"
                                        aria-describedby="basic-addon2"
                                        value={values.title}
                                        onChange={handleChange}
                                        isValid={touched.title && !errors.title}
                                    />
                                    {errors.title && <div>
                                        Invalid task title
                                    </div>}
                                </FloatingLabel>
                            </InputGroup>
                            <InputGroup className="pb-3">
                                <FormLabel
                                    itemID="description"
                                    label="Task description"
                                    className="mb-3"
                                />
                                <Form.Control
                                    id="description"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Task description"
                                    aria-label="Task description"
                                    aria-describedby="basic-addon2"
                                    value={values.description}
                                    onChange={handleChange}
                                    isValid={touched.description && !errors.description}
                                />
                                {errors.description && <div>
                                    Invalid task descirption
                                </div>}
                            </InputGroup>
                            {
                                taskFormData && <Form.Group className="pb-3">
                                    <FormLabel htmlFor="taskStatus">
                                        Current task status
                                    </FormLabel>
                                    <formik.Field className="form-select" as="select" name="taskStatus" id="taskStatus" aria-label="Select current task status">
                                        <option value="pending">Pending</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="done">Done</option>
                                    </formik.Field>
                                </Form.Group>
                            }
                            <Form.Group className="pb-3">
                                <FormLabel htmlFor="assignedMember">
                                    Member assigned to task
                                </FormLabel>
                                <formik.Field className="form-select" as="select" name="assignedMember" id="assignedMember" aria-label="Select assigned member for task">
                                    <option value={-1}>None</option>
                                    {
                                        memberList.map(m =>
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        )
                                    }
                                </formik.Field>
                            </Form.Group>
                            <TagListInput
                                initialValue={values.tagsString}
                                setFieldValue={setFieldValue} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="flex flex-row justify-content-center gap-5">
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleSave(values)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </>
            }
        </Formik >
    </Modal>
}