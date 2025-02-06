import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { parsePhoneNumber } from 'libphonenumber-js/min';
import * as React from 'react';
import * as z from 'zod';

export default function MemberForm({
  formMode = 'create',
}: {
  formMode?: 'create' | 'update';
}) {
  const [resetSelectField, setResetSelectField] = React.useState(Date.now());

  const form = useForm({
    defaultValues: {
      avatar: undefined,
      title: '',
      fullName: '',
      gender: '',
      designation: 'None',
      location: '',
      contact: '',
      email: '',
      birthday: '',
      committee: 'None',
      department: 'None',
    },
    onSubmit: async ({ value }) => {
      return new Promise(() => {
        setTimeout(() => {
          console.log(value);
          form.reset();
          setResetSelectField(Date.now());
        }, 3000);
      });
    },
    validators: {
      onChange: Auth,
    },
  });

  return (
    <div className="space-y-4">
      <h3>{formMode === 'create' ? 'Create New Member' : 'Edit Member'}</h3>
      <div className="flex max-w-screen-xl flex-col rounded-md bg-background p-4">
        <form
          className="flex flex-col space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-6">
            <form.Field name="avatar">
              {(field) => (
                <Input
                  key={resetSelectField}
                  label="Avatar"
                  labelPlacement="outside"
                  type="file"
                  id={field.name}
                  name={field.name}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.handleChange(file);
                  }}
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="title">
              {(field) => (
                <Select
                  key={resetSelectField}
                  label="Title"
                  labelPlacement="outside"
                  selectionMode="single"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Select title"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                >
                  {TITLES.map((title) => (
                    <SelectItem key={title}>{title}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
            <form.Field name="gender">
              {(field) => (
                <Select
                  key={resetSelectField}
                  label="Gender"
                  labelPlacement="outside"
                  selectionMode="single"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Select gender"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                >
                  {GENDERS.map((gender) => (
                    <SelectItem key={gender}>{gender}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
            <form.Field name="designation">
              {(field) => (
                <Select
                  key={resetSelectField}
                  label="Designation"
                  labelPlacement="outside"
                  selectionMode="single"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  defaultSelectedKeys={[DESIGNATIONS[0]]}
                  onChange={(e) =>
                    field.handleChange(e.target.value as Designation)
                  }
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                >
                  {DESIGNATIONS.map((designation) => (
                    <SelectItem key={designation}>{designation}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
            <form.Field name="fullName">
              {(field) => (
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter full name"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="location">
              {(field) => (
                <Input
                  label="Location"
                  labelPlacement="outside"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter location"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="contact">
              {(field) => (
                <Input
                  label="Contact"
                  labelPlacement="outside"
                  type="tel"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter contact"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email"
                  labelPlacement="outside"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter email"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="birthday">
              {(field) => (
                <Input
                  label="Birthday"
                  labelPlacement="outside"
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter birthday"
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            <form.Field name="committee">
              {(field) => (
                <Select
                  key={resetSelectField}
                  label="Committee"
                  labelPlacement="outside"
                  selectionMode="single"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value as Committee)
                  }
                  defaultSelectedKeys={[COMMITTEES[0]]}
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                >
                  {COMMITTEES.map((committee) => (
                    <SelectItem key={committee}>{committee}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
            <form.Field name="department">
              {(field) => (
                <Select
                  key={resetSelectField}
                  label="Department"
                  labelPlacement="outside"
                  selectionMode="single"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  defaultSelectedKeys={[DEPARTMENTS[0]]}
                  onChange={(e) =>
                    field.handleChange(e.target.value as Department)
                  }
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors[0]}
                >
                  {DEPARTMENTS.map((department) => (
                    <SelectItem key={department}>{department}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
          </div>
          <div className="ml-auto inline-flex justify-end gap-4">
            <Button
              onPress={() => {
                form.reset();
                setResetSelectField(Date.now());
              }}
            >
              Reset
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  isDisabled={!canSubmit}
                >
                  {isSubmitting ? null : 'Submit'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const TITLES = ['Mr', 'Mrs', 'Miss', 'Dr', 'Rev', 'Bishop', 'Ps'] as const;

const GENDERS = ['Male', 'Female'] as const;

const DESIGNATIONS = ['None', 'Deaconess', 'Elder', 'Pastor/Bishop'] as const;

const COMMITTEES = ['None', 'Welfare'] as const;

const DEPARTMENTS = [
  'None',
  'Music',
  'IT & Media',
  'Prayer',
  'Protocol & Security',
] as const;

const Auth = z.object({
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max image size is 10MB',
    })
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpeg, .jpg, .png, .webp formats are supported',
    ),
  title: z.string().trim().min(1, { message: 'Select title' }),
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters long' }),
  gender: z.string().trim().min(1, { message: 'Select gender' }),
  designation: z.enum(DESIGNATIONS).default('None'),
  location: z
    .string()
    .trim()
    .min(2, { message: 'Location must be at least 2 characters long' }),
  contact: z
    .string()
    .trim()
    .min(1, { message: 'Invalid phone number' })
    .transform((value, ctx) => {
      try {
        const phoneNumber = parsePhoneNumber(value, {
          defaultCountry: 'GH',
          extract: false,
        });

        if (!phoneNumber?.isValid()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number',
          });
          return z.NEVER;
        }

        return phoneNumber.formatInternational();
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid phone number',
        });
        return z.NEVER;
      }
    }),
  email: z.string().email('Invalid email'),
  birthday: z.string().date('Invalid date'),
  committee: z.enum(COMMITTEES).default('None'),
  department: z.enum(DEPARTMENTS).default('None'),
});

type Auth = z.infer<typeof Auth>;
type Designation = z.infer<typeof Auth.shape.designation>;
type Committee = z.infer<typeof Auth.shape.committee>;
type Department = z.infer<typeof Auth.shape.department>;
