# Tools
## Display and compare variables in one/multiple variable libraries in DevOps

Generate a MD document to list variables of one or more libraries in DevOps. You must define the following environment variables or configure them interactivelly with the script:

* ORGANIZATION
* PROJECT
* PAT. Personal Access Token that requires "Variable Groups (Read)" permission
* LIBRARIES_TO_COMPARE. Coma separated list of the names of the libraries.

```bash
node ./compare-devops-variables.mjs
```