import { 
  dehydrate, 
  HydrationBoundary, 
  QueryClient 
} from '@tanstack/react-query';
import { DataService } from '../../services/dataService';
import HomeClient from '../../components/pages/HomeClient';
import prisma from '../../lib/prisma';

export const revalidate = 3600;

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['settings'],
      queryFn: () => DataService.getSettings(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['profile'],
      queryFn: () => DataService.getProfile(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['about'],
      queryFn: () => DataService.getAbout(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: () => DataService.getProjects(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['skills'],
      queryFn: () => DataService.getSkills(),
    })
  ]);

  const settings = await DataService.getSettings();
  
  const creativeLabItems = await prisma.creativeLabItem.findMany({
    where: { published: true, featured: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 6
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient settings={settings} creativeLabItems={creativeLabItems} />
    </HydrationBoundary>
  );
}
