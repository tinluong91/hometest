import * as React from 'react';
import { PersonForm } from './personsForm';
import { User } from '../../models/users';

interface IProps {
    user: User;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const PersonPage: React.FunctionComponent<IProps> = (props: IProps) => {  
    return (
        <PersonForm
            user={props.user}
            onChange={props.onChange}
            onSave={props.onSave}
        />
    );
}
