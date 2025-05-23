import { FormProvider, useForm } from "react-hook-form";
import { memberSetupSchema,memberSetupDefaultValue } from "../../schemas/memberSetupSchema";
import type { MemberSetupSchemaType } from '../../schemas/memberSetupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import HookFormItem from "../hookForm";
import { VKInput } from "@vivakits/react-components";

const MemberSetupForm = () => {

    const form = useForm<MemberSetupSchemaType>({
        resolver: zodResolver(memberSetupSchema()),
        defaultValues: memberSetupDefaultValue
    })
    function onSubmit(){};
    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(() => onSubmit())}>
                <HookFormItem name="employee_pf_id" className="w-full">
                  <VKInput label={"PF ID"} isRequired rounded="md"/>
                </HookFormItem>
                </form>
            </FormProvider>
        </div>
    )
}

export default MemberSetupForm