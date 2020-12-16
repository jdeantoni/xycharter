FROM adoptopenjdk/openjdk11-openj9:alpine-slim
RUN apk add --update ttf-dejavu && rm -rf /var/cache/apk/*
COPY target/render.jar /usr/spring/render.jar

EXPOSE 4040


HEALTHCHECK  --interval=5s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4040/ping || exit 1

CMD ["java","-Xscmx50M","-Xmx50m","-Xshareclasses","-Xtune:virtualized","-Xquickstart","-jar", "/usr/spring/render.jar"]
