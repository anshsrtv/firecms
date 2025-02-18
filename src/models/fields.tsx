import React from "react";
import { CMSType, EntitySchema, EntityValues, Property } from "./models";

/**
 * When building a custom field you need to create a React component that takes
 * this interface as props.
 */
export interface FieldProps<T extends CMSType, CustomProps = any, S extends EntitySchema<Key> = EntitySchema<any>, Key extends string = Extract<keyof S["properties"], string>> {

    /**
     * Name of the property
     */
    name: string;

    /**
     * Current value of this field
     */
    value: T;

    /**
     * Initial value of this field
     */
    initialValue: T | undefined;

    /**
     * Set value of field directly
     */
    setValue: (value: T | null, shouldValidate?: boolean) => void;

    /**
     * Is the form currently submitting
     */
    isSubmitting: boolean;

    /**
     * Should this field show the error indicator.
     * Note that there might be an error (like an empty field that should be
     * filled) but we don't want to show the error until the user has tried
     * saving.
     */
    showError: boolean;

    /**
     * Is there an error in this field. The error field has the same shape as
     * the field, replacing values with a string containing the error.
     * It takes the value `null` if there is no error
     */
    error: any | null;

    /**
     * Has this field been touched
     */
    touched: boolean;

    /**
     * Property related to this field
     */
    property: Property<T>;

    /**
     * Should this field include a description
     */
    includeDescription: boolean;

    /**
     * Flag to indicate that the underlying value has been updated in Firestore
     */
    underlyingValueHasChanged: boolean;

    /**
     * Is this field part of an array
     */
    partOfArray: boolean;

    /**
     * Is this field being rendered in the table
     */
    tableMode: boolean;

    /**
     * Should this field autofocus on mount
     */
    autoFocus: boolean;

    /**
     * Additional properties set by the developer
     */
    customProps: CustomProps

    /**
     * Additional values related to the state of the form or the entity
     */
    context: FormContext<S, Key>;

    /**
     * Flag to indicate if this field should be disabled
     */
    disabled:boolean;

    /**
     * Flag to indicate if this field was built from a property that gets
     * rendered conditionally
     */
    dependsOnOtherProperties:boolean;

}

export interface FormContext<S extends EntitySchema<Key>, Key extends string = Extract<keyof S["properties"], string>> {

    /**
     * Schema of the entity being modified
     */
    entitySchema: S;

    /**
     * Current values of the entity
     */
    values: EntityValues<S, Key>;

    /**
     * Entity, it can be null if it's a new entity
     */
    entityId?: string;
}

/**
 * In case you need to render a field bound to a Property inside your
 * custom field you can call `buildPropertyField` with these props.
 */
export interface CMSFormFieldProps<T extends CMSType, S extends EntitySchema<Key>, Key extends string = Extract<keyof S["properties"], string>> {

    /**
     * The name of the property, such as `age`. You can use nested and array
     * indexed such as `address.street` or `people[3]`
     */
    name: string;

    /**
     * The CMS property you are binding this field to
     */
    property: Property<T>;

    /**
     * The context where this field is being rendered. You get a context as a
     * prop when creating a custom field.
     */
    context: FormContext<S, Key>;

    /**
     * Should the description be included in this field
     */
    includeDescription?: boolean;

    /**
     * Has the value of this property been updated in the database while this
     * field is being edited
     */
    underlyingValueHasChanged?: boolean;

    /**
     * Is this field being rendered in a table
     */
    tableMode?: boolean;

    /**
     * Is this field part of an array
     */
    partOfArray?: boolean;

    /**
     * Should the field take focus when rendered. When opening the popup view
     * in table mode, it makes sense to put the focus on the only field rendered.
     */
    autoFocus?: boolean;

    /**
     * Should this field be disabled
     */
    disabled?: boolean;

    /**
     * This flag is used to avoid using Formik FastField internally, which
     * prevents being updated from the values.
     * Set this value to `true` if you are developing a custom field which
     * value gets updated dynamically based on others.
     */
    dependsOnOtherProperties?: boolean;
}
