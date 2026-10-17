import { collectionRoutes } from '@/lib/adminCrud';

export const dynamic = 'force-dynamic';

const routes = collectionRoutes('articles');

export const GET = routes.GET;
export const POST = routes.POST;
