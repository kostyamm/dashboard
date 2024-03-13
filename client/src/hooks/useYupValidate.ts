import { AnyObject, ObjectSchema, ValidationError } from 'yup';
import { ref } from 'vue';

export const useYupValidate = <T extends AnyObject>(schema: ObjectSchema<T>, form: AnyObject) => {
    const errors = ref<AnyObject>({});
    const isValid = ref(true);

    const setValid = () => {
        isValid.value = true;

        errors.value = {};
    };

    const setErrors = (yupErrors: ValidationError['inner']) => {
        isValid.value = false;
        errors.value = {};

        yupErrors.forEach(yupError => {
            if (yupError.path) {
                errors.value[yupError.path] = yupError.message;
            }
        });
    };

    const validateForm = async () => {
        try {
            await schema.validate(form, { abortEarly: false });
            setValid();
        } catch (e: any) {
            setErrors(e.inner);
        }
    };

    return { validateForm, errors, isValid };
};