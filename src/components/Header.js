import React, { PureComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const headerConfig = {
    title: "Country Search"
}

class Header extends PureComponent {
    render() {
        const title = headerConfig.title;
        return(
            <header className="component-header mt-5">
                <Container >
                    <Row>
                        <Col>
                            <h1 className="mt-5">{title}</h1>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;
