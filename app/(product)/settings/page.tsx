import { caller } from "@/trpc/server";
import { SettingsHome } from "./_components/settings-home";

const Page = async () => {
  const workspace = await caller.workspace.get();

  return <SettingsHome workspace={workspace} />;
};

export default Page;
