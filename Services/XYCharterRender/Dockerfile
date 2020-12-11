FROM adoptopenjdk/openjdk11-openj9:alpine-slim
RUN apk add --update ttf-dejavu && rm -rf /var/cache/apk/*
COPY target/XYCharterRender.jar /usr/spring/XYCharterRender.jar

EXPOSE 4040

CMD ["java","-Xscmx50M","-Xmx50m","-Xshareclasses","-Xtune:virtualized","-Xquickstart","-jar", "/usr/spring/XYCharterRender.jar"]
