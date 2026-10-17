import { itemRoutes } from '@/lib/adminCrud';

export const dynamic = 'force-dynamic';

const routes = itemRoutes('articles');

export const GET = routes.GET;
export const PATCH = routes.PATCH;
export const DELETE = routes.DELETE;
