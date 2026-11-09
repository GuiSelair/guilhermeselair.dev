import type { AboutQuery } from "@generated/sdk";

import { basicInfos } from "@configs/basicInfos";

type AboutContent = AboutQuery["abouts"][0];

function clean(value?: string | null): string {
	return value?.trim() ?? "";
}

function buildCourses(courses: AboutContent["coursesSection"]): string {
	return courses
		.map((course) =>
			[
				`### ${clean(course.name)}`,
				"",
				`- Instituição: ${clean(course.educationalCompany)}`,
				`- Conclusão: ${clean(course.conclusion)}`,
			].join("\n")
		)
		.join("\n\n");
}

function buildCareer(experiences: AboutContent["experiencesSection"]): string {
	return experiences
		.map((experience) => {
			const lines = [`### ${clean(experience.office)}`, ""];
			const company = clean(experience.company);

			if (company) {
				const companyLine = experience.hasCompany
					? `- Empresa: ${company}`
					: `- ${company}`;

				lines.push(companyLine);
			}

			if (clean(experience.duration)) {
				lines.push(`- Duração: ${clean(experience.duration)}`);
			}

			if (experience.description) {
				const description = experience.description;

				if (description) {
					lines.push("", description);
				}
			}

			return lines.join("\n").trim();
		})
		.join("\n\n");
}

function buildEducation(educations: AboutContent["educationSection"]): string {
	return educations
		.map((education) =>
			[
				`### ${clean(education.name)}`,
				"",
				`- Nível: ${clean(education.level)}`,
				`- Instituição: ${clean(education.educationalCompany)}`,
			].join("\n")
		)
		.join("\n\n");
}

function buildLinks(): string {
	return [
		`- [Email](${basicInfos.email})`,
		`- [GitHub](${basicInfos.github})`,
		`- [DEV.to](${basicInfos.devto})`,
		`- [LinkedIn](${basicInfos.linkedin})`,
	].join("\n");
}

export function buildAboutMarkdown(about: AboutContent): string {
	const profile = clean(about.profile);
	const cvUrl = clean(about.cvUrl);
	const courses = buildCourses(about.coursesSection);
	const career = buildCareer(about.experiencesSection);
	const education = buildEducation(about.educationSection);

	const sections = [
		profile ? `## Perfil\n\n${profile}` : "",
		cvUrl ? `## Currículo\n\n[Baixar currículo](${cvUrl})` : "",
		`## Links\n\n${buildLinks()}`,
		courses ? `## Cursos e Certificações\n\n${courses}` : "",
		career ? `## Carreira\n\n${career}` : "",
		education ? `## Formação Educacional\n\n${education}` : "",
	];

	return sections.filter(Boolean).join("\n\n");
}
