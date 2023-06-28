import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as toastr from "toastr";
import { User } from "../../models/users";
import { PersonPage } from "./page.form";
import { GET_USER, UPDATE_USER } from "./user.query";

const Edit = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User>({
    id: "", // Fix: Initialize id property with an empty string
    name: "",
    email: "",
  });

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data && data.getUser) {
      const { id, name, email } = data.getUser;
      setUser({ id, name, email });
    } else if (error) {
      toastr.error(error.message);
      console.log("Error:", error);
    }
  }, [data, error]);

  let onFieldValueChange = (fieldName: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName.toLowerCase()]: value,
    }));
  };

  const onSave = () => {
    updateUser({
      variables: { updateUserId: id, input: { name: user.name } },
    })
      .then(() => {
        toastr.success("Member saved.");
        history.goBack();
      })
      .catch((error) => {
        toastr.error(error.message);
        console.log("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PersonPage user={user} onChange={onFieldValueChange} onSave={onSave} />
    </div>
  );
};
export default Edit;
