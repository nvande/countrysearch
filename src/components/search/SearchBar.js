import React, { PureComponent } from "react";
import { Form, InputGroup, Button, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    handleSearch(event) {
        this.props.onSearch();
        event.preventDefault();
    }

    handleSearchTypeChange(t) {
        this.props.onSearchTypeChange(t);
    }

    render() {
        const searchConfig = this.props.searchConfig;
        const placeholder = searchConfig.placeholder;
        const query = this.props.query;
        const searchType = this.props.searchType;

        const searchTypeMenuItems = searchConfig.searchTypes.map((type) => (
            <Dropdown.Item
                onClick={() => this.handleSearchTypeChange(type)}
                active={searchType===type}
                key={type}
            >
                {searchConfig.searchTypeDropdownTexts[type]}
            </Dropdown.Item>
        ));
       
        return(
            <Form
                className="component-searchBar"
                data-testid="search-bar"
                onSubmit={this.handleSearch}>
                <Row>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                className="form-control"
                                type="text"
                                placeholder={placeholder}
                                aria-label="Search"
                                value={query}
                                onChange={this.handleChange}
                                
                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                id="searchType"
                                title={searchConfig.searchTypeButtonTexts[searchType]}>
                                {searchTypeMenuItems}
                            </DropdownButton>
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                    onClick={this.handleSearch}>
                                    Go!
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Check
                            className="mt-1 float-right"
                            type="switch"
                            id="custom-switch"
                            label="Search by Full Name"
                            checked={searchType===searchConfig.searchTypes[1]}
                            disabled={searchType===searchConfig.searchTypes[2]}
                            onChange={() => this.handleSearchTypeChange( searchType === 'fullName' ? "name" : "fullName")}
                        />
                    </Col>
                </Row>  
            </Form>
       );
   }
}

export default SearchBar;
