export async function getProvinces() {
  const url = "https://psgc.gitlab.io/api/provinces";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data); // This will log the list of regions in the Philippines
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
}

export async function getMunicipal() {
  const url = "https://psgc.gitlab.io/api/municipalities";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data); // This will log the list of regions in the Philippines
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
}

export async function getBrgy() {
  const url = "https://psgc.gitlab.io/api/barangays";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data); // This will log the list of regions in the Philippines
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
  }
}
