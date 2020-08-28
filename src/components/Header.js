import React, { PureComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const headerConfig = {
    title: "Country Search",
    subtitle: "Perform country searches by name, fullname, or country code using the REST Countries API",
    link: "https://restcountries.eu/"
}

class Header extends PureComponent {
    render() {
        const { title, subtitle, link } = headerConfig;
        return(
            <header className="component-header mt-5" data-testid="header">
                <Container >
                    <Row>
                        <Col>
                            <h1 className="mt-5" data-testid="header-title">{title}</h1>
                            <p className="mt-2 text-secondary" data-testid="subtitle">{subtitle}</p>
                            <a href={link}>{link}</a>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default Header;
