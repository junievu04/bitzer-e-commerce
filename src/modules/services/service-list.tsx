"use client";

import { Grid } from "@/vendors/styled-system/jsx";
import { ServiceCard } from "./service-card";
import { Service } from "./types";

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "8", md: "10" }}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </Grid>
  );
}
