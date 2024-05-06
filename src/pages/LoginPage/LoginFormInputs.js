import { InputGroup, FloatingLabel, Form } from "react-bootstrap"

export default function LoginFormInputs({ createUser, changePassword }) {
    return (<>
        <InputGroup className="mb-3">
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control
                    placeholder="User's email"
                    aria-label="User's email"
                    aria-describedby="basic-addon2"
                />
            </FloatingLabel>
        </InputGroup>
        {
            changePassword ?
                <>
                    <InputGroup className="mb-3">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Old password"
                            className="mb-3"
                        >
                            <Form.Control
                                placeholder="User's old password"
                                aria-label="User's old password"
                                aria-describedby="basic-addon2"
                                type='password'
                            />
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="New password"
                            className="mb-3"
                        >
                            <Form.Control
                                placeholder="User's new password"
                                aria-label="User's new password"
                                aria-describedby="basic-addon2"
                                type='password'
                            />
                        </FloatingLabel>
                    </InputGroup>
                </>
                : <InputGroup className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="User's password"
                            aria-label="User's password"
                            aria-describedby="basic-addon2"
                            type='password'
                        />
                    </FloatingLabel>
                </InputGroup>
        }
        {
            changePassword || createUser ?
                <InputGroup className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Confirm password"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="Confirm password"
                            aria-label="Confirm password"
                            aria-describedby="basic-addon2"
                            type='password'
                        />
                    </FloatingLabel>
                </InputGroup> : null
        }
    </>)
}