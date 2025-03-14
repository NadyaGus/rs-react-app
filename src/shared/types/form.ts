import { InferType } from 'yup';
import { formSchema } from '../formHandlers/validateSchemas';

export type FormType = InferType<typeof formSchema>;
