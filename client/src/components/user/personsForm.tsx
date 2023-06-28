import * as React from "react";
import { User } from "../../models/users";
import { Button, Input } from "../../common/components/form";


interface Props {
  user: User;
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
}

export const PersonForm: React.FunctionComponent<Props> = (props) => {
  return (
    <form>
      <h1>Manage member</h1>

      <Input
        name="ID"
        label="ID"
        value={props.user.id}
        onChange={props.onChange}
        disabled={true}
      />

      <Input
        name="Email"
        label="Email"
        value={props.user.email}
        onChange={props.onChange}
        disabled={true}
      />

      <Input
        name="Name"
        label="Name"
        value={props.user.name}
        onChange={props.onChange}
      />

      <Button
        label="Save"
        className="btn btn-success mt-2"
        onClick={props.onSave}
      />
      
    </form>
  );
};
