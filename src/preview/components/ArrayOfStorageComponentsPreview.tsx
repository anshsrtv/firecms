import React from "react";

import { PreviewComponentProps, PreviewSize } from "../../preview";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useStyles } from "./styles";
import { PreviewComponent } from "../PreviewComponent";
import { Property } from "../../models";


export function ArrayOfStorageComponentsPreview({
                                                    name,
                                                    value,
                                                    property,
                                                    size}: PreviewComponentProps<any[]> ) {

    if (property.dataType !== "array" || !property.of || property.of.dataType !== "string")
        throw Error("Picked wrong preview component ArrayOfStorageComponentsPreview");

    const childSize: PreviewSize = size === "regular" ? "small" : "tiny";
    const classes = useStyles();

    return <div className={classes.arrayRoot}>
        {value &&
        value.map((v, index) =>
            <div className={classes.arrayItem}
                 key={`preview_array_storage_${name}_${index}`}>
                <ErrorBoundary>
                    <PreviewComponent
                        name={name}
                        value={v}
                        property={property.of as Property}
                        size={childSize}/>
                </ErrorBoundary>
            </div>
        )}
    </div>;
}
