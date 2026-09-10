import { COMPANIES, PEOPLE } from "./seed.mjs";

export function normalizeQuery(value = "") {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

export function searchPeople(filters = {}) {
  const q = normalizeQuery(filters.q);
  const companyById = new Map(COMPANIES.map((company) => [company.id, company]));

  return PEOPLE.map((person) => ({ person, company: companyById.get(person.companyId) }))
    .filter(({ person, company }) => {
      if (!company) return false;
      const haystack = normalizeQuery([
        person.firstName, person.lastName, person.title, person.department,
        company.name, company.industry, company.technologies.join(" ")
      ].join(" "));

      if (q && !haystack.includes(q)) return false;
      if (filters.country && person.country !== filters.country) return false;
      if (filters.industry && company.industry !== filters.industry) return false;
      if (filters.seniority && person.seniority !== filters.seniority) return false;
      if (filters.verifiedOnly && person.verificationStatus !== "valid") return false;
      return true;
    })
    .sort((a, b) => b.person.confidence - a.person.confidence)
    .map(({ person, company }) => ({
      id: person.id,
      name: person.firstName + " " + person.lastName,
      title: person.title,
      seniority: person.seniority,
      department: person.department,
      country: person.country,
      city: person.city,
      company: {
        id: company.id,
        name: company.name,
        industry: company.industry,
        employeeRange: company.employeeRange,
        technologies: company.technologies
      },
      verificationStatus: person.verificationStatus,
      verifiedAt: person.verifiedAt,
      confidence: person.confidence,
      protected: true
    }));
}
