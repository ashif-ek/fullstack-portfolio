import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Blog } from '../types';
import { blogs as MOCK_BLOGS } from '../data/mockData';

const fetchBlogs = async (): Promise<Blog[]> => {
    const { data } = await Api.get('/blogs/?_sort=date&_order=desc');
    return data;
};

export const useBlogs = () => {
    const query = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const displayData = query.data || (query.isError ? MOCK_BLOGS : []);

    return {
        ...query,
        data: displayData
    };
};
