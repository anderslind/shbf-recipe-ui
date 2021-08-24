curl https://repo.maven.apache.org/maven2/io/swagger/swagger-codegen-cli/2.4.21/swagger-codegen-cli-2.4.21.jar -o swagger-codegen-cli.jar
chmod u+x swagger-codegen-cli.jar
java -jar swagger-codegen-cli.jar generate -i https://oxidapi-skpamglgeq-ey.a.run.app/v2/api-docs -l javascript --additional-properties useES6=true -o ./generated/web_api_client/