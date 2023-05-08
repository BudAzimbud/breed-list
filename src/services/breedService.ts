import axios from 'axios';

export async function getBreedListApi(params: {limit: number; page: number}) {
  return axios.get(
    `https://api.thecatapi.com/v1/breeds?limit=${params.limit}&page=${params.page}`,
  );
}

export async function getBreedImageApi(reference_image_id: string) {
  return axios.get('https://api.thecatapi.com/v1/images/' + reference_image_id);
}
