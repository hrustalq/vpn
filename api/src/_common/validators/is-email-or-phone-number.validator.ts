import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsEmailOrPhoneNumber(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEmailOrPhoneNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Simple regex for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          // Simple regex for phone number validation
          const phoneRegex = /^\+?[1-9]\d{1,14}$/;

          return emailRegex.test(value) || phoneRegex.test(value);
        },
        defaultMessage() {
          return 'Value must be a valid email or phone number';
        },
      },
    });
  };
}
