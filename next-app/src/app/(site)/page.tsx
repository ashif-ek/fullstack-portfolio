import { 
  dehydrate, 
  HydrationBoundary, 
  QueryClient 
} from '@tanstack/react-query';
import { DataService } from '../../services/dataService';
import HomeClient from '../../components/pages/HomeClient';

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch core settings and profile data on the server
  // This ensures they are available immediately on the client
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient settings={settings} />
    </HydrationBoundary>
  );
}
