import { FormProvider, useForm } from "react-hook-form";
import { memberSetupSchema,memberSetupDefaultValue } from "../../schemas/memberSetupSchema";
import type { MemberSetupSchemaType } from '../../schemas/memberSetupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import HookFormItem from "../hookForm";
import { VKInput } from "@vivakits/react-components";
import CustomDatePicker from "../common/ui/customDatePicker";
import langfmt from "../../langfmt";
import SaveBtn from "../buttons/saveBtn";
import { useEffect } from "react";
import moment from "moment";
import {
  useCreatePfMemberSetupMutation,
  useGetCurrentPfStutusQuery,
  useGetMemerSetupHistoryQuery,
  useGetPfStutusDropdownQuery} from "../../services/memberSetupService"

const MemberSetupForm = () => {

    const form = useForm<MemberSetupSchemaType>({
        resolver: zodResolver(memberSetupSchema()),
        defaultValues: memberSetupDefaultValue
    })
    
    const { data: currentPfStatus } = useGetCurrentPfStutusQuery(
        form.watch("employee_id")?.value ?? "",
        {
            skip: !form.watch("employee_id")?.value,
        },
    )
    console.log(currentPfStatus)
    function onSubmit(data: MemberSetupSchemaType) {
        console.log("Form Values:", data);
    }

    const parseDate = (dateString: string, dateFormat?: string) => {
    if (dateString) {
        return moment(dateString, dateFormat ?? "DD/MM/YYYY").toDate();
    } else {
        return null;
    }
    };
    const date = new Date()
    useEffect(() => {
      form.setValue("employee_pf_id", currentPfStatus?.employee_pf_id ?? "");
      const pfJoinDate = currentPfStatus?.pf_join_date_string
        ? parseDate(currentPfStatus?.pf_join_date_string, langfmt)
        : undefined;
      form.setValue("pf_join_date", pfJoinDate ?? date);
      const pfEffectiveDate = currentPfStatus?.pf_effected_date_string
        ? parseDate(
            currentPfStatus?.pf_effected_date_string,langfmt,
          )
        : undefined;
      form.setValue("pf_effective_date", pfEffectiveDate ?? date);
        if (currentPfStatus) {
        const ownContributionBal =
            currentPfStatus?.own_contribution_bal?.toString() ?? "0.00";
        form.setValue("own_contribution_balance", ownContributionBal);
        const orgContributionBal =
            currentPfStatus?.org_contribution_bal?.toString() ?? "0.00";
        form.setValue("org_contribution_balance", orgContributionBal);
        const ownInterestBal =
            currentPfStatus?.own_interest_bal?.toString() ?? "0.00";
        form.setValue("own_interest_balance", ownInterestBal);
        const orgInterestBal =
            currentPfStatus?.org_interest_bal?.toString() ?? "0.00";
        form.setValue("org_interest_balance", orgInterestBal);
        form.clearErrors();
        }
        //eslint-disable-next-line
    }, [currentPfStatus]);

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
                            disabled={currentPfStatus?.pf_join_date_string !== undefined}
                            />
                        </HookFormItem>
                        <HookFormItem name="pf_effective_date" className="w-full">
                            <CustomDatePicker
                            isRequired
                            label={"PF Effective Date"}
                            placeholder={langfmt.toLowerCase()}
                            selected={form.watch("pf_effective_date")}
                            disabled={currentPfStatus?.pf_effected_date_string !== undefined}
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
                            disabled={currentPfStatus?.own_contribution_bal !== undefined}
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
                            disabled={currentPfStatus?.org_contribution_bal !== undefined}
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
                            disabled={currentPfStatus?.own_interest_bal !== undefined}
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
                            disabled={currentPfStatus?.org_interest_bal !== undefined}
                            />
                        </HookFormItem>
                    </div>
                    <div>
                        <h1 onClick={() => {form.setValue("employee_id", {value:"32",label:"asd"}); console.log(form.getValues("employee_id"))}}>Employee id</h1>
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