import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { apiGet } from "~/services/api.server";
import ClientsMain from "~/components/Clients/ClientsMain";
import type { ClientsResponse } from "~/components/Clients/hooks/useClients";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const search = url.searchParams.get("search") || "";
  
  try {
    const response = await apiGet(
      request, 
      `/tenants?page=${page}&limit=20&search=${encodeURIComponent(search)}`
    );
    
    if (!response.ok) {
      throw new Error("Error al cargar clientes");
    }

    const data: ClientsResponse = await response.json();
    
    return json({ clients: data });
  } catch (error) {
    console.error("Error loading clients:", error);
    return json({ 
      clients: { data: [], total: 0, page: 1, totalPages: 0 } 
    });
  }
}

export default function ClientsRoute() {
  const { clients } = useLoaderData<typeof loader>();
  return <ClientsMain initialData={clients} />;
}