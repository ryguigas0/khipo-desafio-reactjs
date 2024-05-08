import { useContext } from "react"
import { Button, FloatingLabel, Form, FormLabel, InputGroup, Modal } from "react-bootstrap"
import * as formik from 'formik'
import * as yup from 'yup'
import { useCookies } from "react-cookie"
import TaskFormContext from "../../../contexts/TaskFormContext"

export default function TaskForm(props) {
    const [taskFormShow, setTaskFormShow, taskFormData, setTaskFormData] = useContext(TaskFormContext)

    const { Formik } = formik

    const handleClose = () => {
        setTaskFormShow(false)
    }

    let initialValues = {
        title: taskFormData ? taskFormData.name : "",
        description: taskFormData ? taskFormData.description : "",
        // tags: taskFormData ? taskFormData.tags : "",
        // assignedMemberId
    }

    let schema = {
        name: yup.string().min(1).max(255),
        description: yup.string().notRequired().min(1)
    }

    let taskSchema = yup.object(schema)

    const handleSave = (values) => {
        console.log("SAVING TASK")
        console.log({ values })
    }

    const handleDelete = (values) => {
        console.log("DELETING TASK")
        console.log({ values })
    }


    return <Modal show={taskFormShow} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>{taskFormData ? "Editing task" : "Create new task"}</Modal.Title>
        </Modal.Header>
        <Formik
            validationSchema={taskSchema}
            initialValues={initialValues}>
            {
                ({ handleChange, values, touched, errors, status }) => <>
                    <Modal.Body>
                        <Form noValidate validated={false}>
                            <InputGroup className="pb-3">
                                <FloatingLabel
                                    controlId="name"
                                    label="Task name"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Task name"
                                        aria-label="Task name"
                                        aria-describedby="basic-addon2"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                    />
                                    {errors.name && <div>
                                        Invalid task name
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="flex flex-row justify-content-center gap-5">
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleSave(values)}>
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