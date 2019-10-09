import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../input/input";
import Select from "../select/select";

class Form extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = input => {
    // Вычисляемый ключ объекта
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleFileChange = ({ target: input }) => {
    /*const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];*/

    const data = { ...this.state.data };
    data[input.name] = input.files[0];
    this.setState({ data /*, errors */ });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        placeholder={label}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderFileInput(name) {
    const { data, errors } = this.state;
    return (
      <Input
        type="file"
        id={name}
        name={name}
        label="Выберите аудио"
        encType="multipart/form-data"
        onChange={this.handleFileChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton = label => {
    return <button disabled={this.validate()}>{label}</button>;
  };
}

export default Form;
