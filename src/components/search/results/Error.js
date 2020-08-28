import React, { PureComponent } from "react";
import { Alert } from 'react-bootstrap';

class Error extends PureComponent {
    renderErrorText(message){
        const { searchConfig, lastType } = this.props;

        switch(message) {
            case 'Not Found':
            case 'No Results':
                return 'No countries found.'
            case 'Empty':
                return 'Please enter a '+searchConfig.searchTypeButtonTexts[lastType]+' to search for.';
            case 'Invalid':
            case 'Bad Request':
                if(lastType==='code')return 'No countries found matching that code'
                return 'Invalid Search. Please enter a '+searchConfig.searchTypeButtonTexts[lastType]+' to search for.';
            default:
                return 'Something went wrong. Please try again.';
        }
    }

    render(){
        const { error, clearError } = this.props;

        const errorMsg = Object.keys(error).map(key => (
            key==='message' &&
            <span>
                {this.renderErrorText(error[key])}     
            </span>
        ));

        return <Alert variant='danger' className="mt-2" onClose={() => clearError()} dismissible>
            {errorMsg}
        </Alert>;
    }
}

export default Error;
