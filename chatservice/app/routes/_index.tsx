
import createServerSupabase from "utils/supabase.server";
import { Form, useLoaderData } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import Login from "../components/login";
import RealtimeMessages from "../components/realtime-messages";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { message } = Object.fromEntries(await request.formData());
  const { error } = await supabase
    .from("messages")
    .insert({ content: String(message) });

  if (error) {
    console.log(error);
  }

  return json(null, { headers: response.headers });
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });
  const { data } = await supabase.from("messages").select();
  return json({ messages: data ?? [] }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <Login />
          <RealtimeMessages serverMessages={messages} />
          <Form method="post">
            <input type="text" name="message" />
            <button type="submit">Send</button>
          </Form>
        </nav>
       
      </div>
    </div>
  );
}
