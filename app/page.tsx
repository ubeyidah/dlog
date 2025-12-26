import { caller } from "@/trpc/server";

export default async function Page() {
  const data = await caller.hello({ text: "Hello from tRPC" });
  return <div>{data.greeting}</div>;
}
