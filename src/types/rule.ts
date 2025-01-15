import { z } from "zod";

export const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export const HEADER_ACTIONS = ["ADD", "REMOVE", "MODIFY"] as const;

export const ruleFormSchema = z.object({
  url: z.string().min(1, { message: "请输入请求url" }),
  useRegex: z.boolean().optional(),
  redirectTo: z.string().optional(),
  // search: z.string(),
  method: z.enum(METHODS),
  headers: z
    .object({
      action: z.enum(HEADER_ACTIONS),
      key: z.string().min(1, { message: "请输入请求头key" }),
      value: z.string().min(1, { message: "请输入请求头value" }),
    })
    .array(),
  // params: z.object({
  //   key: z.string().min(1, { message: "请输入参数key" }),
  //   value: z.string().min(1, { message: "请输入参数value" }),
  // }),
});

export type Rule = z.infer<typeof ruleFormSchema>;
