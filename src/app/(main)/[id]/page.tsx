import { PageParams } from "@/types/core";
import Details from "@/views/details/Details";

export default async function Page({ params }: PageParams) {
  const id = (await params).id;
  if (Number.isNaN(Number(id))) {
    return <div>Invalid ID</div>;
  }
  return <Details id={Number(id)} />;
}
