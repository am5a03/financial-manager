import { z } from "zod";
import { Context, GenericContext } from "./context";

/// begin generic
export type GenericAction<
  Context extends GenericContext,
  Input,
> = Input extends z.ZodType
  ? {
      ctx: Context;
      input: z.infer<Input>;
    }
  : {
      ctx: Context;
    };

export type Action<Input = undefined> = GenericAction<Context, Input>;
