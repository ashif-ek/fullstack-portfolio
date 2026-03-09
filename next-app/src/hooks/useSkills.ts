import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Skill, Tool } from '../types';
import { MOCK_SKILLS, MOCK_TOOLS } from '../data/mock';

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
        staleTime: 0,
    });

    if (query.isError) return { ...query, data: MOCK_SKILLS };
    return query;
};

export const useTools = () => {
    const query = useQuery({
        queryKey: ['tools'],
        queryFn: fetchTools,
        staleTime: 0,
    });

    if (query.isError) return { ...query, data: MOCK_TOOLS };
    return query;
};
