import { InputGroup, FloatingLabel, Form, Modal, Alert } from "react-bootstrap"

import { useNavigate } from "react-router-dom";

import * as formik from 'formik'
import * as yup from 'yup'
import LoginFormFooter from "./LoginFormFooter"
import * as userAPI from "../../api/users"
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export default function LoginForm({ createUser, changePassword }) {
    const { Formik } = formik
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])

    let shape = {
        email: yup.string().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).required(),
    }

    let initialValues = {
        email: ''
    }

    if (createUser) {
        shape.password = yup.string().min(8).required()
        shape.confirmPassword = yup.string().min(8).required()
        shape.name = yup.string().min(1).required()

        initialValues.password = ''
        initialValues.confirmPassword = ''
        initialValues.name = ''
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

    const onSubmit = async ({
        email,
        name,
        password,
        newPassword,
        oldPassword,
        confirmPassword
    }, { setStatus }) => {
        if (changePassword) {
            if (confirmPassword !== newPassword) return setStatus({
                message: "Confirm password doesnt match new password",
                variant: "danger"
            })

            const resp = await userAPI.changePassword(email, oldPassword, newPassword)

            if (resp.error) return setStatus({
                message: resp.error,
                variant: "danger"
            })

            return setStatus({
                message: "Password changed",
                variant: "primary"
            })
        } else if (createUser) {
            if (confirmPassword !== password) return setStatus({
                message: "Confirm password doesnt match password",
                variant: "danger"
            })

            const resp = await userAPI.createUser(name, email, password)

            if (resp.error) return setStatus({
                message: resp.error,
                variant: "danger"
            })

            navigate("/")
        } else {
            const resp = await userAPI.loginUser(email, password)

            if (resp.error) return setStatus({
                message: resp.error,
                variant: "danger"
            })

            const decoded = jwtDecode(resp.token)
            console.log({decoded})

            setCookie('token', resp.token, {
                path: "/",
                // expires: new Date(decoded.exp + resp.duration)
            })

            navigate("/dashboard")
        }
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={initialValues}>
            {
                ({ handleSubmit, handleChange, values, touched, errors, status }) => {
                    return <Form
                        noValidate
                        onSubmit={handleSubmit}>
                        <Modal.Body>
                            {status && <Alert variant={status.variant}> {status.message} </Alert>}
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
                                        Invalid Email
                                    </div>}
                                </FloatingLabel>
                            </InputGroup>
                            {
                                createUser ?
                                    <InputGroup className="pb-3" hasValidation>
                                        <FloatingLabel
                                            controlId="name"
                                            label="Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                placeholder="User's name"
                                                aria-label="User's name"
                                                aria-describedby="basic-addon2"
                                                value={values.name}
                                                onChange={handleChange}
                                                isValid={touched.name && !errors.name}
                                            />
                                            {errors.name && <div>
                                                Invalid username!
                                            </div>}
                                        </FloatingLabel>
                                    </InputGroup> : null
                            }
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
                                                    Minimum 8 characters
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
                                                    Minimum 8 characters
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
                                            label="Confirm password"
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
                                                Minimum 8 characters
                                            </div>}
                                        </FloatingLabel>
                                    </InputGroup> : null
                            }
                        </Modal.Body>
                        <LoginFormFooter
                            createUser={createUser}
                            changePassword={changePassword} />
                    </Form>
                }
            }
        </Formik>)
}