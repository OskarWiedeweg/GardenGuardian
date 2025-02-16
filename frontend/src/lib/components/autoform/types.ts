type BaseField = {
    cols?: 1 | 2;
}

type BaseInput = {
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    dependent?: {
        field: string;
        value: any;
    };
}

export type FieldVariations = ({
    type: 'text' | 'number' | 'textarea' | 'checkbox' | 'date';
} | {
    type: 'select';
    options: { label: string; value: string }[];
} | {
    type: 'object';
    children: SpecificField<FieldVariations['type']>[]
}) & BaseInput

export type Field = BaseField & (FieldVariations | {
    type: 'submit',
    label: string
})

export type SpecificField<T extends Field['type']> = Field & {type: T}

export type Layout = {
    fields: Field[],
    head?: {
        title: string,
        description?: string
    }
}

export type FormLayout = {
    main: Layout[],
    side?: Layout
}