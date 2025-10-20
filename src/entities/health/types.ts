export interface GetHealthApiResponse {
  status: 'open' | 'closed';
  maintenanceMessage?: string;
}
