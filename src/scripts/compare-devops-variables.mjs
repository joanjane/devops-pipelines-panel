import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const promptVariable = async (rl, variableName) => {
  const value = await new Promise((resolve) => {
    rl.question(
      `\n${variableName} is not set in environment variables. Please enter it: `,
      resolve
    );
  });
  if (!value.trim()) {
    console.error(`${variableName} cannot be empty. Exiting...`);
    process.exit(1);
  }
  return value;
};

const buildConfig = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let organization = process.env.ORGANIZATION;
  let project = process.env.PROJECT;
  let librariesToCompareParam = process.env.LIBRARIES_TO_COMPARE;
  let pat = process.env.PAT;

  if (!organization) {
    organization = await promptVariable(rl, 'ORGANIZATION');
  }

  if (!project) {
    project = await promptVariable(rl, 'PROJECT');
  }

  if (!pat) {
    pat = await promptVariable(rl, 'PAT');
  }

  if (!librariesToCompareParam) {
    librariesToCompareParam = await promptVariable(rl, 'LIBRARIES_TO_COMPARE');
  }

  const librariesToCompare = librariesToCompareParam.split(',');

  return {
    organization,
    project,
    pat,
    librariesToCompare,
  };
};

const listLibraries = async ({ organization, project, pat }) => {
  const url = `https://dev.azure.com/${organization}/${project}/_apis/distributedtask/variablegroups?api-version=6.0`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(`:${pat}`),
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText);
  }

  return response.json();
};

const getVariableComparisonData = (libraries, librariesToCompare) => {
  const filteredLibraries = libraries.value.filter((library) =>
    librariesToCompare.includes(library.name)
  );

  if (filteredLibraries.length !== librariesToCompare.length) {
    throw new Error('One or more libraries were not found.');
  }

  // Collect all unique variable names from all libraries
  const allVariableKeys = new Set();
  filteredLibraries.sort(
    (a, b) =>
      librariesToCompare.indexOf(a.name) - librariesToCompare.indexOf(b.name)
  );

  filteredLibraries.forEach((library) => {
    Object.keys(library.variables).forEach((key) => allVariableKeys.add(key));
  });

  const headerValues = [
    'Variable Name',
    ...filteredLibraries.map((lib) => lib.name),
  ];
  const gridValues = Array.from(allVariableKeys).map((key) => {
    return {
      key,
      values: filteredLibraries.map((library) => {
        const variable = library.variables[key];
        const isSecret = variable?.isSecret ?? false;
        return isSecret ? `***** (secret)` : `${variable?.value || 'N/A'}`;
      }),
      equalValues: !filteredLibraries.some(
        (library) =>
          library.variables[key]?.value !==
          filteredLibraries[0].variables[key]?.value
      ),
    };
  });
  return { headerValues, gridValues };
};

const renderMarkdownFile = async (headerValues, gridValues) => {
  const outputFilePath = path.join(path.resolve(), 'variables-comparison.md');

  let markdownContent = '|' + headerValues.join('|') + '|\n';
  markdownContent += '|' + headerValues.map(() => '---').join('|') + '|\n';
  gridValues.forEach((row) => {
    markdownContent +=
      '|' +
      [
        `${!row.equalValues ? '**' + row.key + '**' : row.key}`,
        ...row.values,
      ].join('|') +
      '|\n';
  });

  // Write the content to a file
  await fs.writeFile(outputFilePath, markdownContent, 'utf8');
  console.log(`Markdown table written to ${outputFilePath}`);
};

const configuration = await buildConfig();
console.log('Configuration:', configuration);

const libraries = await listLibraries(configuration);

const { headerValues, gridValues } = getVariableComparisonData(
  libraries,
  configuration.librariesToCompare
);

await renderMarkdownFile(headerValues, gridValues);

process.exit(0);