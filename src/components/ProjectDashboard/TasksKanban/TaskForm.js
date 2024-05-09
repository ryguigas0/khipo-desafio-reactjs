import { useContext } from "react"
import { Button, FloatingLabel, Form, FormGroup, FormLabel, InputGroup, Modal } from "react-bootstrap"
import * as formik from 'formik'
import * as yup from 'yup'
import { useCookies } from "react-cookie"
import TaskFormContext from "../../../contexts/TaskFormContext"
import MemberListContext from "../../../contexts/MemberListContext"
import TagListInput from "./TaskListInput/TagListInput"

export default function TaskForm(props) {
    const [taskFormShow, setTaskFormShow, taskFormData, setTaskFormData] = useContext(TaskFormContext)
    const [memberList, setMemberList] = useContext(MemberListContext)

    const { Formik } = formik

    const handleClose = () => {
        setTaskFormShow(false)
    }

    let initialValues = {
        title: taskFormData ? taskFormData.name : "",
        description: taskFormData ? taskFormData.description : "",
        assignedMember: taskFormData ? taskFormData.assignedMemberId : -1,
        tagsString: ""
    }

    let schema = {
        title: yup.string().min(1).max(255).required(),
        description: yup.string().notRequired().min(1),
        assignedMember: yup.number().min(-1).required(),
        tagsString: yup.string().notRequired()
    }

    let taskSchema = yup.object(schema)

    const handleSave = (values) => {
        console.log("SAVING TASK")
        console.log(values)
    }

    const handleDelete = (values) => {
        console.log("DELETING TASK")
        console.log(values)
    }


    return <Modal show={taskFormShow} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>{taskFormData ? "Editing task" : "Create new task"}</Modal.Title>
        </Modal.Header>
        <Formik
            validationSchema={taskSchema}
            initialValues={initialValues}
            onSubmit={handleSave}>
            {
                ({ handleChange, handleSubmit, setFieldValue, values, touched, errors, status }) => <>
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
                            <Form.Group className="pb-3">
                                <FormLabel htmlFor="assignedMember">
                                    Member assigned to task
                                </FormLabel>
                                <Form.Select id="assignedMember" aria-label="Select assigned member task">
                                    <option value={-1}>None</option>
                                    {
                                        memberList.map(m =>
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                            <TagListInput
                                values={values}
                                setFieldValue={setFieldValue} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="flex flex-row justify-content-center gap-5">
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                        {taskFormData && <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>}
                    </Modal.Footer>
                </>
            }
        </Formik >
    </Modal>
}