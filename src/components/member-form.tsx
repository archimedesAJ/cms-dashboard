import {
  ApiMemberPayload,
  COMMITTEES,
  DEPARTMENTS,
  DESIGNATIONS,
  GENDERS,
  TITLES,
} from '@/schemas/members';
import { useCreateMemberMutation } from '@/utils/query-options';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import * as React from 'react';

export default function MemberForm({
  formMode = 'create',
}: {
  formMode?: 'create' | 'update';
}) {
  const [resetSelectField, setResetSelectField] = React.useState(Date.now());

  const createMemberMutation = useCreateMemberMutation();

  const form = useForm({
    defaultValues: {
      image: undefined,
      title: '',
      full_name: '',
      gender: '',
      designation: 'none',
      location: '',
      contact_no: '',
      email: '',
      birthday: '',
      committee: 'none',
      department: 'none',
    },
    onSubmit: ({ value }) => {
      const formData = new FormData();
      for (const key in value) {
        // @ts-expect-error file type
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append(key, value[key]);
      }

      createMemberMutation.mutate(formData);

      form.reset();
      setResetSelectField(Date.now());
    },
    validators: {
      onChange: ApiMemberPayload,
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
            <form.Field name="image">
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  onChange={(e) => field.handleChange(e.target.value)}
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors.join(', ')}
                >
                  {DESIGNATIONS.map((designation) => (
                    <SelectItem key={designation}>{designation}</SelectItem>
                  ))}
                </Select>
              )}
            </form.Field>
            <form.Field name="full_name">
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  errorMessage={field.state.meta.errors.join(', ')}
                />
              )}
            </form.Field>
            <form.Field name="contact_no">
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  onChange={(e) => field.handleChange(e.target.value)}
                  defaultSelectedKeys={[COMMITTEES[0]]}
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors.join(', ')}
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
                  onChange={(e) => field.handleChange(e.target.value)}
                  isInvalid={
                    !!(
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                    )
                  }
                  errorMessage={field.state.meta.errors.join(', ')}
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
