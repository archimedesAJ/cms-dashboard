import { AnyFieldApi } from '@tanstack/react-form';

export const validationTrigger = (field: AnyFieldApi) => {
  return !!(field.state.meta.isTouched && field.state.meta.errors.length);
};

export function fieldInfo(field: AnyFieldApi) {
  return validationTrigger(field)
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      field.state.meta.errors.map((err) => err.message).join(', ')
    : null;
}
