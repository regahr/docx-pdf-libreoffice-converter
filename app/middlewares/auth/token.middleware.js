import jwt from 'jsonwebtoken';
import errorsConfig from '../../configs/auth/errors.config';
import envConfig from '../../configs/env.config';
import { OrganizationFunc } from '../../functions/auth/organization.function';
import { UsersFunc } from '../../functions/auth/users.function';
import { DocumentFunc } from '../../functions/general/document.function';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';

export const TokenMid = {
  async verifyToken(req, res, next) {
    const name = 'Verify Token';

    // Allow webhook for Bluesheets
    if (req.url.includes('/processing-done/')) {
      next();
    }
    else {
      try {
        let token = req.cookies.access_token;
        const agent = req.headers['user-agent'];
        if (agent && agent.toLowerCase().includes('mobile') && !token) {
          const { authorization } = req.headers;
          if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
          token = authorization;
        }
        if (!token || token === 'invalid-token') throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
        const credentials = jwt.verify(token, envConfig.app.jwtSecret);
        if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
        if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
        if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
        if (!credentials.organizationId) {
          throw new Error(errorsConfig.AUTH_MISSING_ORGANIZATION_ID.message);
        }
        const user = await UsersFunc.findOneByEmail(credentials.email);
        if (!user) throw new Error(`Critical! possible hacking attempt! attempted email: ${credentials.email}`);
        const organization = await OrganizationFunc.findOne(credentials.organizationId);
        if (!organization) throw new Error(`Critical! possible hacking attempt! attempted organization id: ${credentials.organizationId}`);
        user.emailAddress = credentials.email;
        req.credentials = { user, organization };
        next();
      }
      catch (error) {
        const metaResponse = errorsGenerator(error, [
          errorsConfig.AUTH_TOKEN_NOT_PRESENT,
          errorsConfig.AUTH_TOKEN_INVALID,
          errorsConfig.AUTH_MISSING_EMAIL,
          errorsConfig.AUTH_MISSING_PHONE,
          errorsConfig.AUTH_MISSING_ORGANIZATION_ID
        ]);
        res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
          metaResponse.code,
          metaResponse.message));
        if (process.env.NODE_ENV !== 'test') {
          postError(req, name, metaResponse.level, metaResponse.message);
        }
      }
    }
  },

  async verifyTokenWithoutOrganization(req, res, next) {
    const name = 'Verify Token Without Organization';
    try {
      let token = req.cookies.access_token;
      const agent = req.headers['user-agent'];
      if (agent && agent.toLowerCase().includes('mobile') && !token) {
        const { authorization } = req.headers;
        if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
        token = authorization;
      }
      if (!token || token === 'invalid-token') throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
      const credentials = jwt.verify(token, envConfig.app.jwtSecret);
      if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
      if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
      if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
      const user = await UsersFunc.findOneByEmail(credentials.email);
      if (!user) throw new Error(`Critical! possible hacking attempt! attempted email: ${credentials.email}`);
      user.emailAddress = credentials.email;
      req.credentials = { user };
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE,
        errorsConfig.AUTH_MISSING_ORGANIZATION_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },

  async verifyTokenForDownload(req, res, next) {
    try {
      const { token: tokenQuery, user_token: userToken } = req.query;
      const { access_token: tokenSession } = req.cookies;
      const { documentId } = req.params;

      const tokenWithOrganization = userToken || tokenSession;

      if (tokenQuery) {
        const credentials = jwt.verify(tokenQuery, envConfig.doc.secret);
        if (documentId !== credentials.id) {
          // to prevent using access token for another document
          throw new Error(errorsConfig.DOWNLOAD_LINK_INVALID.message);
        }
        req.credentials = credentials;
      }
      else if (tokenWithOrganization) {
        const credentials = jwt.verify(tokenWithOrganization, envConfig.app.jwtSecret);
        // to prevent using access token for another organization's document
        const document = await DocumentFunc
          .getOneByOrganizationIdAndId(documentId, credentials.organizationId);
        if (!document) {
          throw new Error(errorsConfig.DOWNLOAD_LINK_INVALID.message);
        }
        req.credentials = credentials;
      }
      else throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);

      next();
    }
    catch (error) {
      if (error.message === 'jwt expired') {
        res.status(errorsConfig.DOWNLOAD_LINK_EXPIRED.httpStatus)
          .json(errorResponse(
            'ERROR',
            errorsConfig.DOWNLOAD_LINK_EXPIRED.code,
            errorsConfig.DOWNLOAD_LINK_EXPIRED.message
          ));
        return;
      }
      if (error.message === 'invalid signature') {
        res.status(errorsConfig.DOWNLOAD_LINK_INVALID.httpStatus)
          .json(errorResponse(
            'ERROR',
            errorsConfig.DOWNLOAD_LINK_INVALID.code,
            errorsConfig.DOWNLOAD_LINK_INVALID.message
          ));
        return;
      }
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.DOWNLOAD_LINK_INVALID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
    }
  }
};

export function noop() {}
