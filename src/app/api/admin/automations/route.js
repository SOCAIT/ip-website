import { collectionRoutes } from '@/lib/adminCrud';

export const dynamic = 'force-dynamic';

const routes = collectionRoutes('automations');

export const GET = routes.GET;
export const POST = routes.POST;
