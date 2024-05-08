import { useContext, useState } from "react"
import ProjectFormContext from "../../../contexts/ProjectFormContext"
import ProjectListContext from "../../../contexts/ProjectListContext"
import { Button, FloatingLabel, Form, FormLabel, InputGroup, Modal } from "react-bootstrap"
import * as formik from 'formik'
import * as yup from 'yup'
import * as projectAPI from '../../../api/projects'
import { useCookies } from "react-cookie"

export default function ProjectForm() {
    const [cookies, setCookie] = useCookies(['token'])
    const [showProjectForm, setShowProjectForm, projectFormData, setProjectFormData] = useContext(ProjectFormContext)
    const [projectList, setProjectList] = useContext(ProjectListContext)

    const { Formik } = formik

    let initialValues = {
        name: projectFormData ? projectFormData.name : "",
        description: projectFormData ? projectFormData.description : ""
    }

    let schema = {
        name: yup.string().min(1),
        description: yup.string().notRequired().min(1)
    }

    let projectSchema = yup.object(schema)

    const handleClose = () => setShowProjectForm(false)
    const handleSave = async (values) => {
        console.log("saving")
        if (projectFormData === null) {
            const resp = await projectAPI.createProject(cookies.token, values.name, values.description)
            setProjectList([].concat(projectList, [resp]))
            handleClose()
        } else {
            const resp = await projectAPI.updateProject(cookies.token, projectFormData.id, values.name, values.description)

            const newProjectList = projectList.map(proj => {
                if (proj.id === projectFormData.id) {
                    return resp
                }

                return proj
            })

            setProjectList(newProjectList)
            handleClose()
        }
    }
    const handleDelete = async (values) => {
        console.log("delete")
        console.log({ submit: values })
    }

    return <Modal show={showProjectForm} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{projectFormData ? "Editing project" : "Create new project"}</Modal.Title>
        </Modal.Header>

        <Formik
            validationSchema={projectSchema}
            initialValues={initialValues}>
            {
                ({ handleChange, values, touched, errors, status }) => <>
                    <Modal.Body>
                        <Form noValidate validated={false}>
                            <InputGroup className="pb-3">
                                <FloatingLabel
                                    controlId="name"
                                    label="Project name"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Project name"
                                        aria-label="Project name"
                                        aria-describedby="basic-addon2"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                    />
                                    {errors.name && <div>
                                        Invalid project name
                                    </div>}
                                </FloatingLabel>
                            </InputGroup>
                            <InputGroup className="pb-3">
                                <FormLabel
                                    itemID="description"
                                    label="Project description"
                                    className="mb-3"
                                />
                                <Form.Control
                                    id="description"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Project description"
                                    aria-label="Project description"
                                    aria-describedby="basic-addon2"
                                    value={values.description}
                                    onChange={handleChange}
                                    isValid={touched.description && !errors.description}
                                />
                                {errors.description && <div>
                                    Invalid project descirption
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
                        {projectFormData && <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>}
                    </Modal.Footer>
                </>
            }
        </Formik >
    </Modal >
}