import { InputGroup, FloatingLabel, Form, Modal } from "react-bootstrap"

import * as formik from 'formik'
import * as yup from 'yup'
import LoginFormFooter from "./LoginFormFooter"
import Feedback from "react-bootstrap/esm/Feedback"

export default function LoginForm({ createUser, changePassword }) {
    const { Formik } = formik

    let shape = {
        email: yup.string().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).required(),
    }

    let initialValues = {
        email: ''
    }

    if (createUser) {
        shape.password = yup.string().min(8).required()
        shape.confirmPassword = yup.string().min(8).required()

        initialValues.password = ''
        initialValues.confirmPassword = ''
    } else if (changePassword) {
        shape.newPassword = yup.string().min(8).required()
        shape.oldPassword = yup.string().min(8).required()

        initialValues.newPassword = ''
        initialValues.oldPassword = ''
    } else {
        shape.password = yup.string().min(8).required()
        initialValues.password = ''
    }

    const schema = yup.object(shape)

    const validateSchema = (values) => {
        console.log({ values })

        return []
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={initialValues}
            validateOnChange={validateSchema}>
            {
                ({ handleSubmit, handleChange, values, touched, errors }) => <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <InputGroup className="pb-3" hasValidation>
                            <FloatingLabel
                                controlId="email"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="User's email"
                                    aria-label="User's email"
                                    aria-describedby="basic-addon2"
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                />
                                {errors.email && <div>
                                    Email inválido!
                                </div>}
                            </FloatingLabel>

                        </InputGroup>
                        {
                            changePassword ?
                                <>
                                    <InputGroup className="mb-3">
                                        <FloatingLabel
                                            controlId="oldPassword"
                                            label="Old password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                placeholder="User's old password"
                                                aria-label="User's old password"
                                                aria-describedby="basic-addon2"
                                                type='password'
                                                value={values.oldPassword}
                                                onChange={handleChange}
                                                isValid={touched.oldPassword && !errors.oldPassword}
                                            />
                                            {errors.oldPassword && <div>
                                                Min. 8 caracteres
                                            </div>}
                                        </FloatingLabel>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <FloatingLabel
                                            controlId="newPassword"
                                            label="New password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                placeholder="User's new password"
                                                aria-label="User's new password"
                                                aria-describedby="basic-addon2"
                                                type='password'
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                isValid={touched.newPassword && !errors.newPassword}
                                            />
                                            {errors.newPassword && <div>
                                                Min. 8 caracteres
                                            </div>}
                                        </FloatingLabel>
                                    </InputGroup>
                                </>
                                : <InputGroup className="mb-3">
                                    <FloatingLabel
                                        controlId="password"
                                        label="Password"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            placeholder="User's password"
                                            aria-label="User's password"
                                            aria-describedby="basic-addon2"
                                            type='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            isValid={touched.password && !errors.password}
                                        />
                                        {errors.password && <div>
                                            Min. 8 caracteres
                                        </div>}
                                    </FloatingLabel>
                                </InputGroup>
                        }
                        {
                            changePassword || createUser ?
                                <InputGroup className="mb-3">
                                    <FloatingLabel
                                        controlId="confirmPassword"
                                        label="confirmPassword"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            placeholder="Confirm password"
                                            aria-label="Confirm password"
                                            aria-describedby="basic-addon2"
                                            type='password'
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isValid={touched.confirmPassword && !errors.confirmPassword}
                                        />
                                        {errors.confirmPassword && <div>
                                            Min. 8 caracteres
                                        </div>}
                                    </FloatingLabel>
                                </InputGroup> : null
                        }
                    </Modal.Body>
                    <LoginFormFooter
                        createUser={createUser}
                        changePassword={changePassword} />
                </Form>}
        </Formik>)
}