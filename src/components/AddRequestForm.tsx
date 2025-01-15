import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HEADER_ACTIONS, METHODS, Rule, ruleFormSchema } from "@/types/rule";
import { Toggle } from "@/components/ui/toggle";
import { Regex } from "lucide-react";

function AddRequestForm() {
  const form = useForm<Rule>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      url: "",
      useRegex: false,
      redirectTo: undefined,
      method: "GET",
      headers: [
        {
          action: "ADD",
          key: "",
          value: "",
        },
      ],
    },
  });

  const {
    fields: headerFields,
    append,
    remove,
  } = useFieldArray<Rule>({
    name: "headers",
    control: form.control,
  });

  function onSubmit(value: Rule) {
    console.log(value)
    // navigator.serviceWorker.controller?.postMessage({
    //   type: "ADD_MOCKER_RULE",
    //   payload: value,
    // });
    // setTimeout(() => {
    //   fetch("/api/mocker", {
    //     method: "get",
    //     // body: JSON.stringify(value),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   });
    // }, 3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>请求方法</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择请求方法" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {METHODS.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>请求url</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="url" {...field} />
                    <FormField
                      control={form.control}
                      name="useRegex"
                      render={({ field }) => (
                        <Toggle
                          defaultPressed={field.value}
                          onPressedChange={field.onChange}
                        >
                          <Regex className="size-4" />
                        </Toggle>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <FormField
          control={form.control}
          name="redirectTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>重定向</FormLabel>
              <FormControl>
                <Input placeholder="重定向" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-2">
          {headerFields.map((headerField, index) => (
            <div className="grid grid-cols-6 gap-8" key={headerField.id}>
              <FormField
                control={form.control}
                name={`headers.${index}.action`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>操作</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="请选择请求头操作" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {HEADER_ACTIONS.map((action) => (
                              <SelectItem key={action} value={action}>
                                {action}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`headers.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>请求头key</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入请求头key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`headers.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>value</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入请求头value" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <Button
                className="self-end"
                variant="ghost"
                onClick={() => remove(index)}
              >
                删除
              </Button>
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              append({ action: HEADER_ACTIONS[0], key: "", value: "" })
            }
          >
            添加请求头
          </Button>
        </div>
        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
}

export default AddRequestForm;
