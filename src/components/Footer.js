import React, { PureComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const footerConfig = {
    footerBody: "Created by Nick Vander Woude, 2020"
}


class Footer extends PureComponent {
    render() {
        const footerBody = footerConfig.footerBody;
        return(
            <footer className="component-footer" data-testid="footer">
                <Container>
                    <Row>
                        <Col>
                            <p className="small float-right text-muted" data-testid="footer-body">
                                {footerBody}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
