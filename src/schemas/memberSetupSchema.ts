import {z} from 'zod'

const memberSetupSchema = ()=> z.object({
    employee_id: z
      .object({
        value: z.string().nullable(),
        label: z.string().nullable(),
      }),
    employee_pf_id: z.string().min(1,{message: "PF ID is required"}),
    pf_join_date: z.date().optional().nullable().refine((value)=> value !== null && value !== undefined, {message: "PF Effective date is required"}),
    pf_effective_date: z.date().optional().nullable().refine((value)=> value !== null && value !== undefined, {message: "PF Effective date is required"}),
    pf_status: z.object({
        label: z.string().nullable(),
        value: z.string().nullable()
    }).optional(),
    own_contribution_balance: z.string().min(1,{message: "Own contribution balance is required"}),
    org_contribution_balance: z.string().min(1,{message: "Org contribution balance is required"}),
    own_interest_balance: z.string().min(1,{message: "Own interest balance is required"}),
    org_interest_balance: z.string().min(1,{message: "Org interest balance is required"}),
})

const memberSetupType = memberSetupSchema()

type MemberSetupSchemaType = z.infer<typeof memberSetupType>

const memberSetupDefaultValue: MemberSetupSchemaType = { 
  employee_id: {value: "", label: ""},
  employee_pf_id: "",
  pf_join_date: new Date(),
  pf_effective_date: undefined,
  pf_status: {
    label: null,
    value: null,
  },
  own_contribution_balance: "0.00",
  org_contribution_balance: "0.00",
  own_interest_balance: "0.00",
  org_interest_balance: "0.00",
};

export {memberSetupSchema,memberSetupDefaultValue}
export type {MemberSetupSchemaType}