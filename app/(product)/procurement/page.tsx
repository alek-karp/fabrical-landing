import { caller } from "@/trpc/server";
import { ProcurementHome } from "./_components/procurement-home";

const ProcurementPage = async () => {
  const [projects, requests] = await Promise.all([
    caller.projects.list(),
    caller.procurement.list({}),
  ]);

  return <ProcurementHome projects={projects} requests={requests} />;
};

export default ProcurementPage;
