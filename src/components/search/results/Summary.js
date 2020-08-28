import React, { PureComponent } from "react";
import { Container, Row, Col } from 'react-bootstrap';

class Summary extends PureComponent {
    renderRegions(data){
        const regions = Object.keys(data).map(key => (
            <li className='mb-1'>
                {key!==''?key:'None'}: {data[key]}
            </li>
        ));

        return <ul>
            {regions}
        </ul>;
    }

    render(){
        const {
            searchConfig,
            lastQuery,
            lastType,
            numResults,
            regionResults,
            subregionResults,
        } = this.props;

        const regionBody = regionResults ? this.renderRegions(regionResults) : null;
        const subregionBody = subregionResults ? this.renderRegions(subregionResults) : null;

        const numResultsStrFull = (numResults !== 0 ? numResults : 'No') + ' ' + ( numResults !==1 ? 'countries' : 'country' )
        + ' found matching ' + searchConfig.searchTypeButtonTexts[lastType] + ' \'' + lastQuery + '\'';

        return (
            <Container className="mt-5">
                <Row>
                    <h5 className="lead pb-5">
                            {numResultsStrFull}
                    </h5>
                </Row>
                <Row>
                    <Col>
                        <h6> Number of countries by Region:</h6> {regionBody}
                    </Col>
                    <Col>
                        <h6> Number of countries by Subregion: </h6> {subregionBody}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Summary;
