import React, { PureComponent } from "react";
import ResultsTable from "./results/ResultsTable";
import Error from "./results/Error";
import Summary from "./results/Summary";

class Results extends PureComponent {
    render() {
        const {
            searchConfig,
            results,
            lastQuery,
            lastType,
            error,
            clearError,
            loading,
            numResults,
            regionResults,
            subregionResults,
            doneSearch
        } = this.props;

        const numResultsStr = (numResults !== 0 ? numResults : 'No') + ' ' + ( numResults !==1 ? 'results' : 'result' );

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
                    <Error
                        error = {error}
                        clearError = {clearError}
                        searchConfig = {searchConfig}
                        lastType = {lastType}
                    />
                }

                {results &&
                    <ResultsTable
                        results = {results}
                    />
                }
                
                {results && doneSearch && !error &&
                    <Summary
                        searchConfig = {searchConfig}
                        lastQuery = {lastQuery}
                        lastType = {lastType}
                        numResults = {numResults}
                        regionResults = {regionResults}
                        subregionResults = {subregionResults}
                    />
                }
            </div>
       );
   }
}

export default Results;
