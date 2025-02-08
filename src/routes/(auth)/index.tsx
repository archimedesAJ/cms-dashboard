import { Button, Input } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as z from 'zod';

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
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      return new Promise(() => {
        setTimeout(() => {
          console.log(value);
          form.reset();
          void navigate({ to: '/dashboard' });
        }, 3000);
      });
    },
    validators: {
      onChange: Auth,
    },
  });

  return (
    <div className="grid place-items-center">
      <div className="w-full max-w-sm space-y-12 max-lg:p-8 max-md:p-4">
        <div className="text-center">
          <h3>Admin Login</h3>
          <p>Enter your email & password to log in</p>
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
            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email"
                  labelPlacement="outside"
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your email"
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
          </div>

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
        </form>
      </div>
    </div>
  );
}

const Auth = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
type Auth = z.infer<typeof Auth>;
