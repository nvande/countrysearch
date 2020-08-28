import React, { PureComponent } from "react";
import { Table, Image } from 'react-bootstrap';

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

class ResultsTable extends PureComponent {
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

    render(){
        const {
            results,
        } = this.props;

        const tableHead = this.renderTablehead(results);
        const tableBody = this.renderTablebody(results);

        return(
            <Table striped bordered hover size="sm" className="result-table table-responsive-md mt-3">
                {results && tableHead}
                {results && tableBody}
            </Table>
        );

    }

}

export default ResultsTable;
