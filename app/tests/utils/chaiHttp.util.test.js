import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server.util.test';
import ENDPOINTS from '../../configs/api.config';
import { API_PATH } from '../../variables/common.variable';

chai.should();
chai.use(chaiHttp);

// props.apiPath will be default to /api/v1/finance
// add it from common variable if need other apiPath

export function GET(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const cookies = props.cookies || '';
  if (token) {
    return chai
      .request(server)
      .get(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `${token}`);
  }
  if (cookies) {
    return chai
      .request(server)
      .get(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies);
  }
  return chai
    .request(server)
    .get(apiPath + ENDPOINTS[endpoint] + params + query);
}

export function POST(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const cookies = props.cookies || '';
  if (token) {
    return chai
      .request(server)
      .post(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `Bearer ${token}`)
      .send(props.payload);
  }
  if (cookies) {
    return chai
      .request(server)
      .post(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies)
      .send(props.payload);
  }
  return chai
    .request(server)
    .post(apiPath + ENDPOINTS[endpoint] + params + query)
    .send(props.payload);
}

export function UPLOAD(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const cookies = props.cookies || '';
  if (token) {
    return chai
      .request(server)
      .post(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field(props.payload)
      .attach(props.attach.name, props.attach.file, 'samplefile.jpeg');
  }
  if (cookies) {
    return chai
      .request(server)
      .post(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field(props.payload)
      .attach(props.attach.name, props.attach.file, 'samplefile.jpeg');
  }
  return chai
    .request(server)
    .post(apiPath + ENDPOINTS[endpoint] + params + query)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field(props.payload)
    .attach(props.attach.name, props.attach.file, 'samplefile.jpeg');
}

export function PUT(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const payload = props.payload || '';
  const cookies = props.cookies || '';

  if (token) {
    return chai
      .request(server)
      .put(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  }
  if (cookies) {
    return chai
      .request(server)
      .put(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies)
      .send(payload);
  }
  return chai
    .request(server)
    .put(apiPath + ENDPOINTS[endpoint] + params + query)
    .send(payload);
}

export function PATCH(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const payload = props.payload || '';
  const cookies = props.cookies || '';

  if (token) {
    return chai
      .request(server)
      .patch(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  }
  if (cookies) {
    return chai
      .request(server)
      .patch(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies)
      .send(payload);
  }
  return chai
    .request(server)
    .patch(apiPath + ENDPOINTS[endpoint] + params + query)
    .send(payload);
}

export function DELETE(props) {
  const token = props.token || '';
  const apiPath = props.apiPath || API_PATH;
  const endpoint = props.endpoint || '';
  const params = props.params || '';
  const query = props.query || '';
  const payload = props.payload || '';
  const cookies = props.cookies || '';

  if (token) {
    return chai
      .request(server)
      .delete(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
  }
  if (cookies) {
    return chai
      .request(server)
      .delete(apiPath + ENDPOINTS[endpoint] + params + query)
      .set('Cookie', cookies)
      .send(payload);
  }
  return chai
    .request(server)
    .delete(apiPath + ENDPOINTS[endpoint] + params + query)
    .send(payload);
}
