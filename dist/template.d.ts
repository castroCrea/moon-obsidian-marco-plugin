export declare const DEFAULT_TEMPLATE = "\n# NOTE WITH TITLE\n\n{{START_NOTE}}\n{{PATH}}\n{{IF TITLE}}/Notes/{{TITLE}}.md {{END_IF TITLE}}\n{{END_PATH}}\n---\n{{IF SOURCE.DESCRIPTION}} description: \n{{IF SOURCE.published}} {{SOURCE.published}} - {{END_IF SOURCE.published}}\n{{IF SOURCE.TIMESTAMP.0}} [{{SOURCE.TIMESTAMP.0.timestamp}}]({{SOURCE.TIMESTAMP.0.URL}} {{END_IF SOURCE.TIMESTAMP.0}})\n{{SOURCE.DESCRIPTION}} \n{{END_IF SOURCE.DESCRIPTION}}\n{{IF SOURCE.url}} Url: {{SOURCE.url}} {{END_IF SOURCE.url}}\n{{IF PEOPLE.0.NAME}} author: \n- {{PEOPLE.0.NAME}} \n- {{IF PEOPLE.1.NAME}}{{PEOPLE.1.NAME}}{{END_IF PEOPLE.1.NAME}}\n- {{IF PEOPLE.2.NAME}}{{PEOPLE.2.NAME}}{{END_IF PEOPLE.2.NAME}}\n- {{IF PEOPLE.3.NAME}}{{PEOPLE.3.NAME}}{{END_IF PEOPLE.3.NAME}}\n{{END_IF PEOPLE.0.NAME}}\n{{IF SOURCE.TITLE}}Source: [[/Sources/{{SOURCE.TITLE}}.md]] {{END_IF SOURCE.TITLE}}\n---\n{{CONTENT}}\n\n{{END_NOTE}}\n\n# CLIP\n\n{{START_NOTE}}\n{{PATH}}\n{{IF SOURCE.TEXT}}{{IF SOURCE.TITLE}}/Sources/{{SOURCE.TITLE}}.md {{END_IF SOURCE.TITLE}}{{END_IF SOURCE.TEXT}}\n{{END_PATH}}\n---\n{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}\n---\n{{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}\n\n\n{{IF SOURCE.TEXT}}\n{{SOURCE.TEXT}}\n{{END_IF SOURCE.TEXT}}\n\n{{END_NOTE}}\n\n# CLIP DM\n\n{{START_NOTE}}\n{{PATH}}\n{{IF SOURCE.dmContent}}{{IF SOURCE.TITLE}}/DM/{{SOURCE.TITLE}}.md{{END_IF SOURCE.TITLE}}{{END_IF SOURCE.dmContent}}\n{{END_PATH}}\n---\n{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}\n---\n{{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}\n\n{{IF SOURCE.dmContent}}\n{{SOURCE.dmContent}}\n{{END_IF SOURCE.dmContent}}\n\n{{END_NOTE}}\n\n# People\n\n{{START_NOTE}}\n{{PATH}}\n{{IF PEOPLE.0.NAME}}/People/{{PEOPLE.0.NAME}}.md{{END_IF PEOPLE.0.NAME}}\n{{END_PATH}}\n---\n{{IF PEOPLE.0.picture}}picture: {{PEOPLE.0.picture}}{{END_IF PEOPLE.0.picture}}\n{{IF PEOPLE.0.job}}job: {{PEOPLE.0.job}}{{END_IF PEOPLE.0.job}}\n{{IF PEOPLE.0.email}}email: {{PEOPLE.0.email}}{{END_IF PEOPLE.0.email}}\n{{IF PEOPLE.0.about}}about: {{PEOPLE.0.about}}{{END_IF PEOPLE.0.about}}\n{{IF PEOPLE.0.linkedin}}linkedin: {{PEOPLE.0.linkedin}}{{END_IF PEOPLE.0.linkedin}}\n{{IF PEOPLE.0.twitter}}twitter: {{PEOPLE.0.twitter}}{{END_IF PEOPLE.0.twitter}}\n{{IF PEOPLE.0.tiktok}}tiktok: {{PEOPLE.0.tiktok}}{{END_IF PEOPLE.0.tiktok}}\n{{IF PEOPLE.0.instagram}}instagram: {{PEOPLE.0.instagram}}{{END_IF PEOPLE.0.instagram}}\n{{IF PEOPLE.0.substack}}substack: {{PEOPLE.0.substack}}{{END_IF PEOPLE.0.substack}}\n{{IF PEOPLE.0.github}}github: {{PEOPLE.0.github}}{{END_IF PEOPLE.0.github}}\n{{IF PEOPLE.0.mastodon}}mastodon: {{PEOPLE.0.mastodon}}{{END_IF PEOPLE.0.mastodon}}\n{{IF PEOPLE.0.youtube}}youtube: {{PEOPLE.0.youtube}}{{END_IF PEOPLE.0.youtube}}\n{{IF PEOPLE.0.website}}website: {{PEOPLE.0.website}}{{END_IF PEOPLE.0.website}}\n{{IF PEOPLE.0.names}}names: {{PEOPLE.0.names}}{{END_IF PEOPLE.0.names}}\n{{IF PEOPLE.0.anchor}}anchor: {{PEOPLE.0.anchor}}{{END_IF PEOPLE.0.anchor}}\n---\n{{IF SOURCE.TITLE}}[[/Sources/{{SOURCE.TITLE}}.md]]{{END_IF SOURCE.TITLE}}\n\n{{END_NOTE}}\n\n# JOURNAL\n\n{{START_NOTE}}\n{{PATH}}/Journal/01 - Daily/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}\n## Daily Tasks\n\n{{IF TASK}}{{CONTENT}}{{END_IF TASK}}\n## Notes\n- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}}) {{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}\n{{END_NOTE}}\n";
