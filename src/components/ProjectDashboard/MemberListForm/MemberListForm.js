import { useContext, useState } from "react"
import MemberListFormContext from "../../../contexts/MemberListFormContext"
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap"
import MemberListItemInput from "./MemberListItemInput"
import { Formik } from "formik"
import * as yup from 'yup'
import * as memberAPI from '../../../api/members'
import { useCookies } from "react-cookie"
import MemberListContext from "../../../contexts/MemberListContext"
import { jwtDecode } from "jwt-decode"

export default function MemberListForm({ project, owner, members }) {
    const [showMemberListForm, setShowMemberListForm] = useContext(MemberListFormContext)
    const [memberList, setMemberList] = useContext(MemberListContext)
    const [cookies, setCookie] = useCookies(['token'])
    const { userId } = jwtDecode(cookies.token)
    
    const handleClose = () => {
        setShowMemberListForm(false)
    }

    const editableMembers = members.filter(m => m.id !== owner.id)

    const handleAddMember = async (values, { setStatus, resetForm }) => {
        const resp = await memberAPI.addMember(cookies.token, project.id, values.addMember)
        console.log({ resp })
        if (!resp.error) {
            setMemberList([].concat(memberList, [resp]))
            resetForm()
            return
        }

        setStatus({
            variant: 'danger',
            message: resp.error
        })
    }

    const schema = yup.object().shape({
        addMember: yup.string()
            .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "Must be a valid email")
            .required("Email is required to add members").typeError("Must be a valid email")
    })

    return (<Modal
        show={showMemberListForm}
        onHide={handleClose}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {project.name}'s members
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{
                    addMember: ''
                }}
                validationSchema={schema}
                onSubmit={handleAddMember}
            >
                {({ handleChange, handleSubmit, values, touched, errors, status }) => (
                    <Form onSubmit={handleSubmit}>
                        <h5>Project owner: {owner.name} ({owner.email})</h5>
                        <h5>Other members</h5>
                        <InputGroup className="d-flex flex-column">
                            <div>
                                {userId === owner.id && <>
                                    <div className="d-flex">
                                        <Form.Control
                                            name="addMember"
                                            placeholder="New member email"
                                            value={values.addMember}
                                            onChange={handleChange}
                                            isValid={touched.addMember && !errors.addMember}
                                        />
                                        <Button variant='primary' type="submit">Add</Button>
                                    </div>
                                </>}
                                {errors.addMember && touched.addMember ? (
                                    <div>{errors.addMember}</div>
                                ) : null}
                                {status && <Alert variant={status.variant}> {status.message} </Alert>}
                                <ul>
                                    {
                                        editableMembers.map(m => <MemberListItemInput key={m.id} member={m} />)
                                    }
                                </ul>
                            </div>
                        </InputGroup>
                    </Form>
                )}
            </Formik>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>)
}