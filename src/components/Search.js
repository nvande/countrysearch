import React, { PureComponent } from "react";
import SearchBar from "./search/SearchBar.js";
import Results from "./search/Results";
import { Container, Row, Col } from 'react-bootstrap';

const searchConfig = {
    inputPlaceholderText: "Search for country by name",
    resultPlaceholderText: "Results are displayed here",
    searchTypes: [
        'name',
        'fullName',
        "code"
    ],
    searchTypeQueries: {
        name: '',
        fullName: '?fullName=true',
        code: '?code=true'
    },
    searchTypeButtonTexts: {
        name: 'Country Name',
        fullName: 'Full Country Name',
        code: 'Country Code'
    },
    searchTypeDropdownTexts: {
        name: 'Search by Name',
        fullName: 'Search by Full Name',
        code: 'Search by Country Code'
    }
}

class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            query: '',
            searchType: searchConfig.searchTypes[0],
            results: [],
            numResults: 0,
            regionResults: null,
            subregionResults: null,
            lastQuery: '',
            lastType: searchConfig.searchTypes[0],
            error: null,
            loading: false,
            doneSearch: false,
        };

        this.clearError=this.clearError.bind(this);
    }

    async fetchData(query, type) {
        var params = searchConfig.searchTypeQueries[type];
        const apiUrl = 'http://localhost:8765/'+query+params;
        console.log(apiUrl);
        this.setState({loading: true});
            if(query !== ''){
                    fetch(apiUrl).then(res => res.json())
                        .then((json) => { 
                            if(json['status']){
                                this.setState({
                                    results: [],
                                    doneSearch: true,
                                    loading: false,
                                    lastQuery: query,
                                    lastType: type,
                                    error: json,
                                });
                                this.clearResults();
                            }
                            else {
                                const data = json['data'];
                                const empty = (data.length === 0);
                
                                this.setState({
                                    results: data,
                                    doneSearch: true,
                                    loading: false,
                                    lastQuery: query,
                                    lastType: type,
                                    error: null,
                                });
                                if(empty){
                                    this.setError('No Results');
                                    this.clearResults();
                                }
                                else this.computeResultSummary(data);
                            }
                        }).catch((error) => {
                            this.setError('Invalid');
                            this.clearResults();
                        })
            }
            else {
                this.setError('Empty');
                this.clearResults();
            }
    }

    clearResults(){
        this.setState({
            loading: false,
            doneSearch: false,
            results: []
        });
    }

    clearError() {
        this.setState({
            error: null
        });
    }

    setError(message) {
        this.setState({
            error: {"status":null,"message":message}
        });
    }

    handleChange(e) {
        this.setState({
            query: e
        });
    }

    handleSearchTypeChange(t) {
        this.setState({
            searchType: t
        });
    }

    handleSearch() {
        const query = this.state.query;
        const searchType = this.state.searchType;
        this.clearError();
        this.fetchData(query, searchType);
    }

    computeResultCount(results, key){
        var regions = {};
        Object.keys(results).forEach(row => (
            Object.keys(results[row]).forEach((col) => {
                if(col === key){
                    const region = results[row][col];
                    if(!regions[region])regions[region] = 1;
                    else regions[region]++;
                }
            })
        ));
        return regions;
    }

    computeResultSummary(results){
        const numResults = Object.keys(results).length;
        const regions = this.computeResultCount(results, 'region');
        const subregions = this.computeResultCount(results, 'subregion');
        
        this.setState({
            numResults: numResults,
            regionResults: regions,
            subregionResults: subregions
        })

    }

    render() {
        const query = this.state.query;
        const searchType = this.state.searchType;
        const results = this.state.results;
        const numResults = this.state.numResults;
        const regionResults = this.state.regionResults;
        const subregionResults = this.state.subregionResults;
        const lastQuery = this.state.lastQuery;
        const lastType = this.state.lastType;
        const error = this.state.error;
        const loading = this.state.loading;
        const doneSearch = this.state.doneSearch;

        return(
            <div className="component-search">
                <Container>
                    <Row>
                        <Col>
                            <SearchBar
                                searchConfig = {searchConfig}
                                query = {query}
                                searchType = {searchType}
                                onSearch = {this.handleSearch}
                                onChange = {this.handleChange}
                                onSearchTypeChange = {(t) => this.handleSearchTypeChange(t)} />
                            <Results
                                searchConfig = {searchConfig}
                                searchType = {searchType}
                                results = {results}
                                numResults = {numResults}
                                regionResults = {regionResults}
                                subregionResults = {subregionResults}
                                lastQuery = {lastQuery}
                                lastType = {lastType}
                                error = {error}
                                loading = {loading}
                                doneSearch = {doneSearch}
                                clearError = {this.clearError} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;
