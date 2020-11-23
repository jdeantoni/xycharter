FROM adoptopenjdk/openjdk11-openj9:alpine-slim

COPY target/render.jar /usr/spring/render.jar

EXPOSE 4040

CMD ["java","-Xscmx50M","-Xmx50m","-Xshareclasses","-Xtune:virtualized","-Xquickstart","-jar", "/usr/spring/render.jar"]
