import React, { PureComponent } from "react";
import { Table, Alert, Container, Row, Col, Image } from 'react-bootstrap';

const tableHeaderTexts = {
    name: 'Country Name',
    alpha2Code:'Alpha Code 2',
    alpha3Code:'Alpha Code 3',
    region:'Region',
    subregion: 'Subregion',
    population: 'Population',
    languages: 'Languages',
    flag: 'Country Flag'
}

class Results extends PureComponent {

    renderStandardCell(data){
        return data.toLocaleString();
    }

    renderLanguagesCell(data){
        const langs = Object.keys(data).map(lang => (
            this.renderLanguage(data[lang])
        ));
        return <ul className="pl-4">{langs}</ul>;
    }

    renderLanguage(data){
        const traits = Object.keys(data).map(trait => (
            this.renderLanguageData(trait, data[trait])
        ));
        return traits;
    }

    renderLanguageData(trait, value){
        switch(trait) {
            case 'name':
                return <li> {value} </li>
            default:
                return null;
        }
    }

    renderFlagCell(url){
        return <Image
            src={url}
            className="img-fluid p-2-m"
        />;
    }

    renderTableCell(label, data) {
        const standardClass = "standard-cell";
        switch(label) {
            case 'alpha2Code':
            case 'alpha3Code':
            case 'region':
            case 'subregion':
            case 'population':
            case 'name':
                return <td className={standardClass}> {this.renderStandardCell(data)} </td>;
            case 'languages':
                return <td className={standardClass}> {this.renderLanguagesCell(data)} </td>;
            case 'flag':
                return <td> {this.renderFlagCell(data)} </td>;
            default:
                return null;
        }
    }

    renderTableHeadCell(label) {
        switch(label) {
            case 'name':     
            case 'alpha2Code':
            case 'alpha3Code':
            case 'region':
            case 'subregion':
            case 'population':
            case 'languages':
                return <th> {tableHeaderTexts[label]} </th>
            case 'flag':
                return <th className = 'flag-header'> {tableHeaderTexts[label]} </th>;
            default:
                return null;
        }
    }

    renderTablebody(results){
        const body = Object.keys(results).map(row => (
            <tr>
                {Object.keys(results[row]).map(col => (
                    this.renderTableCell(col, results[row][col])
                ))}
            </tr>
        ));
        return body;
    }

    renderTablehead(results){
        const keys = Object.keys(results);
        const firstKey = keys ? keys[0] : null;
        const head = firstKey ? Object.keys(results[firstKey]).map(colLabel => (
                    this.renderTableHeadCell(colLabel)
        )) : null;
        return head;
    }

    renderErrorText(message){
        const searchConfig = this.props.searchConfig;
        const searchType = this.props.lastType;

        console.log(message);

        switch(message) {
            case 'Not Found':
            case 'No Results':
                return 'No countries found.'
            case 'Empty':
                return 'Please enter a '+searchConfig.searchTypeButtonTexts[searchType]+' to search for.';
            case 'Invalid':
            case 'Bad Request':
                if(searchType==='code')return 'No countries found matching that code'
                return 'Invalid Search. Please enter a '+searchConfig.searchTypeButtonTexts[searchType]+' to search for.';
            default:
                return 'Something went wrong. Please try again.';
        }
    }

    renderError(data){
        const clearError = this.props.clearError;
        const error = Object.keys(data).map(key => (
            key==='message' &&
            <span>
                {this.renderErrorText(data[key])}     
            </span>
        ))
        return <Alert variant='danger' className="mt-2" onClose={() => clearError()} dismissible>
            {error}
        </Alert>;
    }

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

    render() {
        const {
            searchConfig,
            results,
            lastQuery,
            lastType,
            error, 
            loading,
            numResults,
            regionResults,
            subregionResults,
            doneSearch
        } = this.props;

        const tableHead = this.renderTablehead(results);
        const tableBody = this.renderTablebody(results);

        const regionBody = regionResults ? this.renderRegions(regionResults) : null;
        const subregionBody = subregionResults ? this.renderRegions(subregionResults) : null;


        const numResultsStr = (numResults !== 0 ? numResults : 'No') + ' ' + ( numResults !==1 ? 'results' : 'result' );

        const numResultsStrFull = (numResults !== 0 ? numResults : 'No') + ' ' + ( numResults !==1 ? 'countries' : 'country' )
        + ' found matching ' + searchConfig.searchTypeButtonTexts[lastType] + ' \'' + lastQuery + '\'';

        return(
           <div className="component-results" data-testid="results">
               <div className={"d-flex justify-content-center loading-wrap " + (loading ? "loading" : '')}>
                {loading &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                </div>
                {doneSearch && !error &&
                    <p className="text-muted">
                        {numResultsStr}
                    </p>
                }
                {error &&
                    <h4>
                        {this.renderError(error)}
                    </h4>
                }
                <Table striped bordered hover size="sm" className="result-table table-responsive-md mt-3">
                    {results && tableHead}
                    {results && tableBody}
                </Table>
                
                {results && doneSearch && !error &&
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
                }
            </div>
       );
   }
}

export default Results;
