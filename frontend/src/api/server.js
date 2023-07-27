import { client } from './client';

const API_URL = 'http://localhost:3000/api/files';

export async function getTableData() {
    return await client.get(`${API_URL}/list`);
}

export async function getTableByFile(file) {
    return await client.get(`${API_URL}/data/${file}`);
}