import {Button, Col, Container, Form, Row} from "react-bootstrap";

function Subscribe(){

    return (
        <div id="sub">
            <h1 id="subs">Join the news letter!</h1>

            <h3 id="subs">Subscribe to get latest content by email</h3>

            <Form id="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" id="subscribeForm"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" className="buttonW">
                    SUBSCRIBE
                </Button>
            </Form>
        </div>
    );

}

export default Subscribe;