/*after post created then automatically show root index page shown  */
import React, {Component} from 'react';
//reduxFrom is similar to connect helper in react-redux,
//allows our component to communicate with additional reducers,
//we just wired in.
//reduxForm is responsible for event handler.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
//(field) arg contains event hander of two. So Field
//can be responsible for the chang of <input>.
//field.input, obj contains bunch of event hander, bunch
//of diff props such as onChange, onBlur, onFocus.
//Also, it has value of input.-> all diff props and obj communicated
//as a props to be <input> tag.
//which save codes asf.
//-- follow--
//onChange={field.input.onChange}
//onFocus={field.input.onFocus}
//onBlur={field.input.onBlur}  --end of follow

//field.meta.error automatically show
//the result of function validdate.
//rederField instead of renderTitleField.
renderField(field){
//need clean up 'field' using below: field.meta -> meta
  //const { meta } = field;
  const { meta : { touched, error } } = field;//field.meta.touched..
//  const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
  //const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

/*
onSubmit(values) {
  //this === component
  //console.log(values);
  this.props.createPost(values);
  this.props.history.push('/');  //navigate instantly to
//index root but w/o waiting until API request completed
//(Submit action(post created) completed).
}  */
/*call ..push('/'), after post created.
create call back function -- () => {
  this.props.history.push('/');} --*/
//action creator(cratePost) passed a call back func
//as a 2nd arg
onSubmit(values) {
  this.props.createPost(values, () => {
    this.props.history.push('/');
  });
}

//setting up actual Form inside our component.
//Field is component. in Field, We pass some properties
//such as name(1st property), component(2nd prop)
//First property of compoent Field is "title" of post.
//2nd is the func to display Field component.
//Field comp is responsible for handling any change of
//above <input>.
  render() {
//reduxForm add additional properties to be passed to
//compoent,PostsNew.To reference this.props, pull off
//handleSubmit func, in which this property is passed to
//the component on behalf of reduxForm
//this.onSubmit is callback func, excuted in diff context
//outside of our component. make sure this is our component
//So, .bind(this).
//
//properties passed to compoent
    const { handleSubmit }= this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit_posts_new7
        </button>
        <Link to="/" className="btn btn-danger"> Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
//console.log(values) -> {title: 'asdf',
// categories: 'asdf', content:'asdf'}
 const errors = {};
//validate the inputs from 'values'
//if errors is empty, the form is fine to submit.
//if erros has *any* properties, redux form assume
//form is invalid.
  if(!values.title) {
    errors.title = "Enter a title.";
  }
  if(!values.categories) {
    errors.categories = "Enter some categories.";
  }
  if(!values.content) {
    errors.content = "Enter some content please!";
  }
  return errors;
}
/*ReduxForm allow components to talk directly
to redux store. Let's wire up !  */
export default reduxForm({
  // validate: validate,//key:vallue ->ES6 just one
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
