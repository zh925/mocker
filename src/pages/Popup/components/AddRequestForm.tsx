import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
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

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

const HEADER_ACTIONS = ["ADD", "REMOVE", "MODIFY"] as const;

const formSchema = z.object({
  url: z.string().min(1, { message: "请输入请求url" }),
  redirectTo: z.string(),
  search: z.string(),
  method: z.string(),
  headers: z
    .object({
      action: z.enum(HEADER_ACTIONS),
      key: z.string(),
      value: z.string(),
    })
    .array(),
});

function AddRequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      redirectTo: "",
      search: "",
      method: METHODS[0],
      headers: [
        {
          action: HEADER_ACTIONS[0],
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
  } = useFieldArray<z.infer<typeof formSchema>>({
    name: "headers",
    control: form.control,
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 space-x-8">
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
                  <Input placeholder="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        {headerFields.map((headerField, index) => (
          <div className="grid grid-cols-6 space-x-8" key={headerField.id}>
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
                </FormItem>
              )}
            ></FormField>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`headers.${index}.key`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>key</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入请求头key" {...field} />
                    </FormControl>
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
                  </FormItem>
                )}
              ></FormField>
            </div>
            <Button
              onClick={() =>
                append({ action: HEADER_ACTIONS[0], key: "", value: "" })
              }
            >
              添加
            </Button>
          </div>
        ))}
        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
}

export default AddRequestForm;
