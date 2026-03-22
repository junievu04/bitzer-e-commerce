export interface Service {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  brief?: string;
}
export interface ServiceDetail extends Service {
  images?: string[];
  description?: string[];
  features?: string[];
}
export interface ServicesDTO {
  data: Service[];
  next: string | null;
  isActive: boolean;
}
