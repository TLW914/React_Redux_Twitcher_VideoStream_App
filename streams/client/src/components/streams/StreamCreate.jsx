import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderInput(formProps){
        console.log('props from field component in render func', formProps)
        return (
            <div className="field">
            <label>{formProps.label}</label>
                <input 
                    //shortcut version 
                        //takes formProps input property and ALL values
                        //adds them as props to the input element
                        //or destructure {input} arg and use {...input}
                    {...formProps.input}
                    //longhand version
                        // onChange={formProps.input.onChange} 
                        // value={formProps.input.value}
                />
            </div>
        );
    }

    render() {
        console.log('props on reduxForm reducer', this.props)
        return (
        <div>
            <form className="ui form">
                {/* name property is required, need text input to appear, 
                Field does not know how to render anything in DOM unless 
                asign a prop to it as component or a function for the field to call 
                that returns an element for the field to show
                Field element also doesn't know what to do with props label so passes
                it into renderInput and can receive it as a property
                 */}
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
            </form>
        </div>
        );
    }
}

// reduxForm works same way connect works--do not need reducers or map state to props - handles that
// takes in configuration object
export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);