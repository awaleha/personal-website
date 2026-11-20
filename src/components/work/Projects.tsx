import { getPosts } from "@/utils/utils";
import { Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  variant?: "default" | "compact";
}

export function Projects({ range, exclude, variant = "default" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (variant === "compact") {
    return (
      <Column fillWidth gap="16" marginBottom="40" paddingX="l">
        {displayedProjects.map((post) => (
          <Column
            key={post.slug}
            fillWidth
            border="neutral-medium"
            radius="l"
            padding="16"
            gap="8"
          >
            <Row fillWidth horizontal="between" vertical="center" gap="16">
              <Heading as="h3" variant="heading-strong-m">
                {post.metadata.title}
              </Heading>
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={`/work/${post.slug}`}
              >
                <Text variant="label-default-s">Case study</Text>
              </SmartLink>
            </Row>
            {post.metadata.summary && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {post.metadata.summary}
              </Text>
            )}
            {post.metadata.link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={post.metadata.link}
              >
                <Text variant="label-default-s">View project</Text>
              </SmartLink>
            )}
          </Column>
        ))}
      </Column>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
