import semver from 'semver';

import { latestReleaseUrl, libraryVersion } from './config';

interface LatestReleaseResponse {
  tag_name: string;
}

async function getLatestReleaseVersion() {
  return fetch(latestReleaseUrl).then(async (response) => {
    const json = (await response.json()) as LatestReleaseResponse;
    return json.tag_name.replace('v', '');
  });
}

const latestLibraryVersion = await getLatestReleaseVersion();

console.log(semver.gt(latestLibraryVersion, libraryVersion), {
  latestLibraryVersion,
  libraryVersion,
});
