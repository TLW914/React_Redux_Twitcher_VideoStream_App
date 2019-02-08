import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderError(meta){
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            )
        }
    }

    renderInput = (formProps) => {
        //console.log('props from renderInput from field component in render func', formProps)
        //console.log('meta property in renderInput', formProps.meta)
        return (
            <div className="field">
            <label>{formProps.label}</label>
                <input 
                    //shortcut version 
                        //takes formProps input property and ALL values
                        //adds them as props to the input element
                        //or destructure {input} arg and use {...input}
                    {...formProps.input}
                    autoComplete="off"
                    //longhand version
                        // onChange={formProps.input.onChange} 
                        // value={formProps.input.value}
                />
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    onSubmit(formValues){
        console.log('form values formValue object in onSubmit method', formValues)
    }

    render() {
        //console.log('props on reduxForm', this.props)
        return (
        <div>
            {/* handleSubmit is callback function that is a property on reduxForm
            pass in our own callback into handleSubmit */}
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/* name property is required, need text input to appear, 
                Field does not know how to render anything in DOM unless 
                asign a prop to it as component or a function for the field to call 
                that returns an element for the field to show
                Field element also doesn't know what to do with props label so passes
                it into renderInput and can receive it as a property
                 */}
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        </div>
        );
    }
}

//define validation function for reduxForm
const validate = (formValues) => {
    //create empty errors object
    //empty object informs redux that everything is okay
    const errors = {};

    if (!formValues.title){
        errors.title = 'Please Enter a Title'
    }
    if (!formValues.description){
        errors.description = 'Please Enter a Description'
    }
    return errors
};

// reduxForm works same way connect works--do not need reducers or map state to props - handles that
// takes in configuration object
export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);