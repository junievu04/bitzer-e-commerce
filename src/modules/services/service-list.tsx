import type { Service } from "@/types/api";
import { Grid } from "@/vendors/styled-system/jsx";
import ServiceCard from "./service-card";

interface ServiceListProps {
  services: Service[] | null;
}

export default function ServiceList({ services }: ServiceListProps) {
  if (!services) return null;
  return (
    <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "8", md: "10" }}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </Grid>
  );
}
