FROM openjdk:8-alpine


# Install Atlassian JIRA and helper tools and setup initial home
# directory structure.
RUN set -x \
    && apk add --no-cache curl xmlstarlet bash ttf-dejavu libc6-compat \
    && mkdir -p                "/var/atlassian/jira" \
    && mkdir -p                "/var/atlassian/jira/caches/indexes" \
    && mkdir -p                "/opt/atlassian/jira/conf/Catalina"
	
COPY "lib/atlassian-jira-software-8.1.0-standalone/" "/opt/atlassian/jira"
COPY "lib/mysql-connector-java-5.1.38-bin.jar" "/opt/atlassian/jira/lib/mysql-connector-java-5.1.38-bin.jar"
COPY "lib/postgresql-42.2.1.jar" "/opt/atlassian/jira/lib/postgresql-42.2.1.jar"
	
COPY "docker-entrypoint.sh" "/opt/atlassian/jira/work"


RUN set -x \
	&& rm -f "/opt/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2.jar"
	
COPY "lib/atlassian-extras-3.2.jar" "/opt/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2.jar"

RUN set -x \
    && chmod -R 700            "/var/atlassian/jira" \
    && chmod -R 700            "/opt/atlassian/jira" \
# && chown -R daemon:daemon  "/var/atlassian/jira" \
# && chown -R daemon:daemon  "{/opt/atlassian/jira" \
    && sed --in-place          "s/java version/openjdk version/g" "/opt/atlassian/jira/bin/check-java.sh" \
    && echo -e                 "\njira.home=/var/atlassian/jira" >> "/opt/atlassian/jira/atlassian-jira/WEB-INF/classes/jira-application.properties" \
    && touch -d "@0"           "/opt/atlassian/jira/conf/server.xml"


# Use the default unprivileged account. This could be considered bad practice
# on systems where multiple processes end up being executed by 'daemon' but
# here we only ever run one process anyway.
USER root:root


# Set volume mount points for installation and home directory. Changes to the
# home directory needs to be persisted as well as parts of the installation
# directory due to eg. logs.
VOLUME ["/var/atlassian/jira", "/opt/atlassian/jira/logs"]

# Set the default working directory as the installation directory.
WORKDIR "/var/atlassian/jira"



# Expose default HTTP connector port.
EXPOSE 8080

	
ENTRYPOINT ["/opt/atlassian/jira/work/docker-entrypoint.sh"]

# Run Atlassian JIRA as a foreground process by default.
CMD ["/opt/atlassian/jira/bin/start-jira.sh", "-fg"]
