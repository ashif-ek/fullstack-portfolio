import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Skill, Tool } from '../types';
import { skills as MOCK_SKILLS, tools as MOCK_TOOLS } from '../data/mockData';

const fetchSkills = async (): Promise<Skill[]> => {
    const { data } = await Api.get('/skills/');
    return data;
};

const fetchTools = async (): Promise<Tool[]> => {
    const { data } = await Api.get('/tools/');
    return data;
};

export const useSkills = () => {
    const query = useQuery({
        queryKey: ['skills'],
        queryFn: fetchSkills,
        staleTime: 1000 * 60 * 5,
    });

    const displayData = query.data || (query.isError ? MOCK_SKILLS : []);
    return { ...query, data: displayData };
};

export const useTools = () => {
    const query = useQuery({
        queryKey: ['tools'],
        queryFn: fetchTools,
        staleTime: 1000 * 60 * 5,
    });

    const displayData = query.data || (query.isError ? MOCK_TOOLS : []);
    return { ...query, data: displayData };
};
