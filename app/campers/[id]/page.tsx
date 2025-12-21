import { getCamperById } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CardDetailsClient from "./CardDetailsClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function IdPage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getCamperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardDetailsClient id={id} />
    </HydrationBoundary>
  );
}
