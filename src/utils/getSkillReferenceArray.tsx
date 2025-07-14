const getSkillReferenceArray = (values: any) => {
    const consolidatedReferences: any[] = [];

    // Configuration for each reference type
    const referenceConfigs = [
        { key: 'reference_education_skills', dataKey: 'education', nameAccessor: (item: any) => item.institution, type: 'EDUCATION' },
        { key: 'reference_experience_skills', dataKey: 'experience', nameAccessor: (item: any) => item.employer.name, type: 'EXPERIENCE' },
        { key: 'reference_projects_skills', dataKey: 'projects', nameAccessor: (item: any) => item.title, type: 'PROJECT' },
        { key: 'reference_certifications_skills', dataKey: 'certifications', nameAccessor: (item: any) => item.name, type: 'CERTIFICATION' },
    ];

    // Iterate over each configuration
    referenceConfigs.forEach(({ key, dataKey, nameAccessor, type }) => {
        values[key]?.forEach((id) => {
            const matchedItem = values[dataKey]?.find((item: any) => item._id === id);
            if (matchedItem) {
                consolidatedReferences.push({
                    _id: matchedItem._id,
                    name: nameAccessor(matchedItem),
                    type,
                });
            }
        });
    });

    return consolidatedReferences;
};
export default getSkillReferenceArray;
