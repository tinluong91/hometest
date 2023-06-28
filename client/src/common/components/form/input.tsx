import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
  disabled?: boolean; 
}

export const Input: React.FunctionComponent<Props> = (props) => {
  const { name, label, placeholder, value, onChange, error, disabled } = props;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const wrapperClass = error ? "form-group has-error" : "form-group";

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChangeInput}
          disabled={disabled}
        />
      </div>
      <div className="help-block">{error}</div>
    </div>
  );
};
