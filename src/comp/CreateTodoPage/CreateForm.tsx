// Shape of form values
import {Field, Form, FormikErrors, FormikProps, withFormik} from "formik";
import React from "react";
import {User} from "../../types/User";
import {NavLink} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import classes from "./CreateForm.module.css";

export interface FormValues {
    userId: number;
    title: string,
    completed: boolean,
}

interface OtherProps {
    message: string;
}

function Alert(props :any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & Sendiable & FormikProps<FormValues & Sendiable>) => {
    const { touched, errors, isSubmitting, message, values } = props;
    return (
        <Form className={classes.form}>
            <h1>{message} todo</h1>
            <Field type="text" name="title" style={errors.title ? {borderBottomColor : "red"} : {}} placeholder={"Title"} autocomplete={false}/>
            {touched.title && errors.title && <div className={classes.error}>{errors.title}</div>}

            <Field name="userId" as="select" placeholder="Choose user">
                {props.userArr.map(user => {
                    return (<option value={user.id}>{user.name}</option>)
                })}
            </Field>

            <h3>Is completed:</h3>
            <Field component="div" name="completed">
                <input
                    type="radio"
                    id="completedTrue"
                    defaultChecked={values.completed}
                    name="completed"
                    value={String(true)}
                />
                <label htmlFor="completedTrue">True</label>

                <input
                    type="radio"
                    id="completedFalse"
                    defaultChecked={!values.completed}
                    name="completed"
                    value={String(false)}
                />
                <label htmlFor="completedFalse">False</label>
            </Field>
            <button type="submit" disabled={isSubmitting}>
                {message}
            </button>
            <Snackbar open={isSubmitting} autoHideDuration={6000}>
                <Alert severity="success">
                    <NavLink to={"/"}>
                        <div style={{color : "white"}}>
                            Task sucessfully {message.toLowerCase() === "create" ? message.toLowerCase() + "d." : message.toLowerCase() + "ed."}
                        </div>
                    </NavLink>
                </Alert>
            </Snackbar>
        </Form>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialTitle: string;
    initialCompleted: boolean;
    initialId: number;
    message: string; // if this passed all the way through you might do this or make a union type
}

interface Sendiable {
    sendData: (data : FormValues) => void
    userArr : Array<User>
}

// Wrap our form with the withFormik HoC
// @ts-ignore
const CreateForm = withFormik<MyFormProps & Sendiable, FormValues & Sendiable>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            title : props.initialTitle,
            completed : props.initialCompleted,
            userId : props.initialId,
            sendData : props.sendData,
            userArr : props.userArr
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (!values.userId) {
            errors.userId = 'Choose user';
        }
        return errors;
    },

    handleSubmit: values => {
        values.sendData(values);
    },
})(InnerForm);

export default CreateForm;
