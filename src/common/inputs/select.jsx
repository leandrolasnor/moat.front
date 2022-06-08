import Form from "react-bootstrap/Form";

export default ({
  input,
  options,
  label,
  type,
  meta: { touched, error }
}) => (
  <span>
    <Form.Control size="sm" className="mb-2" {...input} as="select">
      <option value="">Select a role...</option>
      {options.map(option => (
        <option value={option.value} key={option.id}>
          {option.label}
        </option>
      ))}
    </Form.Control>
    {touched && error && <span>{error}</span>}
  </span>
);