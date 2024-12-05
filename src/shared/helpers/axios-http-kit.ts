import axios, { AxiosInstance } from 'axios';

import MockAdapter from 'axios-mock-adapter';
import { data } from '../../mocks/applications.mocks';
import { users } from '../../mocks/users.mock';
import { roles } from '../../mocks/roles.mocks';

const mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/applications/1').reply(200, { ...data.find((a) => a.applicationId === 1)});
mock.onPatch('http://localhost:8080/applications/1').reply(200, { ...data.find((a) => a.applicationId === 1)});
mock.onGet('http://localhost:8080/applications').reply(200,  data);
mock.onGet('http://localhost:8080/users').reply(200,  users);
mock.onGet('http://localhost:8080/users/1').reply(200,  users.find((u) => u.id === 1));
mock.onPost('http://localhost:8080/users').reply(200,  users.find((u) => u.id === 1));
mock.onPost('http://localhost:8080/login').reply(200,  users.find((u) => u.id === 1));
mock.onGet('http://localhost:8080/roles').reply(200,  roles);
export const baseUrl = "http://localhost:8080";

const userName = "test";
const password = "test";
const credentials = `${userName}:${password}`;

const encodedCredentials = btoa(credentials);

const httpApiKit: AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Authorization': `Basic ${encodedCredentials}`,
  },
  timeout: 20000
});

export default httpApiKit;
