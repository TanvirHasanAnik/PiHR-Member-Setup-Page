import { FormProvider, useForm } from "react-hook-form";
import { memberSetupSchema,memberSetupDefaultValue } from "../../schemas/memberSetupSchema";
import type { MemberSetupSchemaType } from '../../schemas/memberSetupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import HookFormItem from "../hookForm";
import { VKInput } from "@vivakits/react-components";
import CustomDatePicker from "../common/ui/customDatePicker";
import langfmt from "../../langfmt";
import SaveBtn from "../buttons/saveBtn";

const MemberSetupForm = () => {

    const form = useForm<MemberSetupSchemaType>({
        resolver: zodResolver(memberSetupSchema()),
        defaultValues: memberSetupDefaultValue
    })
    function onSubmit(data: MemberSetupSchemaType) {
        console.log("Form Values:", data);
    }
    return (
        <div className="w-full">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="p-5 space-y-5 bg-gray-50 rounded-xl w-full">
                    <div className="flex gap-5">
                        <HookFormItem name="employee_pf_id" className="w-full">
                            <VKInput label={"PF ID"} isRequired rounded="md" size="sm"/>
                        </HookFormItem>
                        <HookFormItem name="pf_join_date" className="w-full">
                            <CustomDatePicker
                            isRequired
                            label={"PF Join Date"}
                            placeholder={langfmt}
                            selected={form.watch("pf_join_date")}
                            popperClassName="block"
                            //disabled={currentPfStatus?.pf_join_date_string}
                            />
                        </HookFormItem>
                        <HookFormItem name="pf_effective_date" className="w-full">
                            <CustomDatePicker
                            isRequired
                            label={"PF Effective Date"}
                            placeholder={langfmt}
                            selected={form.watch("pf_effective_date")}
                            />
                        </HookFormItem>
                    </div>
                    <div className="flex gap-5">
                        <HookFormItem name="own_contribution_balance" className="w-full">
                            <VKInput
                            isRequired
                            label={"Own Contribution Balance"}
                            size="sm"
                            rounded="md"
                            type="number"
                            preventSigned={true}
                            preventExponents
                            />
                        </HookFormItem>
                        <HookFormItem name="org_contribution_balance" className="w-full">
                            <VKInput
                            isRequired
                            label={"Org Contribution Balance"}
                            size="sm"
                            rounded="md"
                            type="number"
                            preventSigned={true}
                            preventExponents
                            />
                        </HookFormItem>
                        <HookFormItem name="own_interest_balance" className="w-full">
                            <VKInput
                            isRequired
                            label={"Own Interest Balance"}
                            size="sm"
                            rounded="md"
                            type="number"
                            preventSigned={true}
                            preventExponents
                            />
                        </HookFormItem>
                        <HookFormItem name="org_interest_balance" className="w-full">
                            <VKInput
                            isRequired
                            label={"Org Interest Balance"}
                            size="sm"
                            rounded="md"
                            type="number"
                            preventSigned={true}
                            preventExponents
                            />
                        </HookFormItem>
                    </div>
                    <div className="flex gap-5 items-center justify-end">
                        <SaveBtn
                            className={`!text-sm`}
                            title={"Save"}
                            //isLoading={createPfMemberSetupLoading}
                        />
                    </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default MemberSetupForm