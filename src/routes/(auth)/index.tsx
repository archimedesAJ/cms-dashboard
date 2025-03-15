import { config } from '@/config/app';
import { fieldInfo, validationTrigger } from '@/lib/form-errors';
import { ApiLoginPayload } from '@/schemas/auth';
import { useLoginMutation } from '@/utils/query-options';
import { Button, Input } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-dvh items-center bg-content3 p-4">
      <div className="mx-auto grid w-full max-w-screen-xl overflow-hidden rounded-xl bg-background md:grid-cols-2">
        <img
          src="/images/login.png"
          className="object-cover object-center max-md:hidden"
        />
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      username: config.isDev ? 'abrahamabbey' : '',
      password: config.isDev ? '22cuma@ASU' : '',
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value);
    },
    validators: {
      onChange: ApiLoginPayload,
    },
  });

  return (
    <div className="grid place-items-center">
      <div className="w-full max-w-sm space-y-12 max-lg:p-8 max-md:p-4">
        <div className="text-center">
          <h3>Admin Login</h3>
          <p>Enter your username & password to log in</p>
        </div>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="space-y-12">
            <form.Field name="username">
              {(field) => (
                <Input
                  label="Name"
                  labelPlacement="outside"
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your username"
                  isInvalid={validationTrigger(field)}
                  errorMessage={fieldInfo(field)}
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <Input
                  label="Password"
                  labelPlacement="outside"
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your password"
                  isInvalid={validationTrigger(field)}
                  errorMessage={fieldInfo(field)}
                />
              )}
            </form.Field>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => {
              const isPending = isSubmitting || loginMutation.isPending;

              return (
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  isLoading={isPending}
                  isDisabled={!canSubmit}
                >
                  {isPending ? null : 'Submit'}
                </Button>
              );
            }}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
