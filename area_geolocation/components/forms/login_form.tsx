import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { z } from "zod";

export default function LoginForm() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password invalid must contains at least 6 chars " })
      .max(24),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-6 pb-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder={field.name}
                    className="w-full rounded-none border-b border-black/50 shadow-none focus:rounded-md focus:border-none focus:outline-none focus:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder={field.name}
                    className="w-full rounded-none border-b border-black/50 shadow-none focus:rounded-md focus:border-none focus:outline-none focus:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            );
          }}
        />
        <section className="w-full flex-col space-y-6">
          <Button className="w-full" type="submit">
            Accedi
          </Button>
          <span className="flex items-center space-x-4">
            <Separator className="h-[0.8px] flex-1 bg-black/25" />
            <p className="flex-2 text-sm text-black/50">
              Non hai ancora un account?
            </p>
            <Separator className="h-[0.8px] flex-1 bg-black/25" />
          </span>
          <Button variant="outline" className="w-full border-primary">
            Registrati
          </Button>
        </section>
      </form>
    </Form>
  );
}
