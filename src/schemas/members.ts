import { parsePhoneNumber } from 'libphonenumber-js/min';
import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const TITLES = [
  'Mr',
  'Mrs',
  'Miss',
  'Dr',
  'Rev',
  'Bishop',
  'Ps',
] as const;

export const GENDERS = ['male', 'female'] as const;

export const DESIGNATIONS = [
  'none',
  'Deaconess',
  'Elder',
  'Pastor/Bishop',
] as const;

export const COMMITTEES = ['none', 'Welfare'] as const;

export const DEPARTMENTS = [
  'none',
  'Music',
  'IT & Media',
  'Prayer',
  'Protocol & Security',
] as const;

export const ApiMemberPayload = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max image size is 10MB',
    })
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpeg, .jpg, .png, .webp formats are supported',
    ),
  title: z.string().trim().min(1, { message: 'Please select title' }),
  full_name: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters long' }),
  gender: z.string().trim().min(1, { message: 'Please select gender' }),
  designation: z.string().default('none'),
  location: z
    .string()
    .trim()
    .min(2, { message: 'Location must be at least 2 characters long' }),
  contact_no: z
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
  email: z.string().email('Invalid email address'),
  birthday: z.string().date('Invalid date format'),
  committee: z.string().default('none'),
  department: z.string().default('none'),
});

export type ApiMemberPayload = z.infer<typeof ApiMemberPayload>;

const ApiMemberResponseData = ApiMemberPayload.extend({
  id: z.number(),
  member_no: z.string(),
  image: z.string(), // override image type
});

export const ApiCreateMemberResponse = z.object({
  message: z.string(),
  data: ApiMemberResponseData,
});

export const ApiGetMembersResponse = z.object({
  count: z.number(),
  next: z.number().nullable(),
  previous: z.number().nullable(),
  results: z.array(ApiMemberResponseData),
});
