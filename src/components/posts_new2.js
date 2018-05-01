import React, {Component} from 'react';
//reduxFrom is similar to connect helper in react-redux,
//allows our component to communicate with additional reducers,
//we just wired in.
//reduxForm is responsible for event handler.
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
//(field) arg contains event hander of two. So Field
//can be responsible for the chang of <input>
//field.input,obj contains bunch of event hander, bunch
//of diff props such as onChange, onBlur, onFocus.
//Also, it has value of input.-> all diff props and obj communicated
//as a props to be <input> tag.
//which save codes asf.
//-- follow--
//onChange={field.input.onChange}
//onFocus={field.input.onFocus}
//onBlur={field.input.onBlur}  --end of follow

//common module for renderTitleField, renderTagField
  renderTitleField(field){
    return (
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }


//setting up actual Form inside our component.
//Field is component. in Field, We pass some properties
//such as name(1st property), component(2nd prop)
//First property of compoent Field is "title" of post.
//2nd is the func to display Field component.
//Field comp is responsible for handling any change of
//above <input>.
  render() {
    return(
      <form>
        <Field
          name="title"
          component={this.renderTitleField}
        />
      </form>
    );
  }
}
/*ReduxForm allow components to talk directly
to redux store. Let's wire up !  */
export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
