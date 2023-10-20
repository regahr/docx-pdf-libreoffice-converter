import globalErrors from '../../configs/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';
import Roles from '../../models/auth/Roles.model';
import { RolePermissionValue } from '../../variables/enum.variable';

export const PermissionMid = {
  checkPermission: ({
    name,
    code
  }) => async (req, res, next) => {
    try {
      const {
        credentials: {
          user,
          organization
        }
      } = req;

      const userRole = organization.users
        .find((u) => u.userId.toString() === user._id.toString() && u.status === 'ACTIVE');
      if (!userRole) {
        throw new Error(globalErrors.UNAUTHORIZED_ACCESS.message);
      }

      const role = await Roles.findOne({ roleName: userRole.role });

      let permission;
      const permissions = {};
      const selectedPermission = {};

      if (Array.isArray(code)) {
        role.permissions.forEach((p) => {
          if (
            code.includes(p.code)
              && (p.value === RolePermissionValue.ALL || p.value === RolePermissionValue.OWN)) {
            selectedPermission[p.code] = p;
          }
          permissions[p.code] = p.value;
        });
      }
      else {
        role.permissions.forEach((p) => {
          if (
            p.code === code
              && (p.value === RolePermissionValue.ALL || p.value === RolePermissionValue.OWN)) {
            permission = p;
          }
          permissions[p.code] = p.value;
        });
      }

      if (!permission && Object.keys(selectedPermission).length === 0) {
        throw new Error(globalErrors.UNAUTHORIZED_ACCESS.message);
      }

      req.permissions = permissions;

      if (Array.isArray(code)) {
        req.credentials.permission = Object.values(selectedPermission).reduce((curr, p) => {
          const permissionObject = curr;
          permissionObject[p.code] = {
            name: p.name,
            code: p.code,
            value: p.value,
            userId: user._id,
            userEmailAddress: user.emailAddress
          };
          return permissionObject;
        },
        {});
      }
      else {
        req.credentials.permission = {
          name: permission.name,
          code: permission.code,
          value: permission.value,
          userId: user._id,
          userEmailAddress: user.emailAddress
        };
      }
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        globalErrors.UNAUTHORIZED_ACCESS
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  }
};

export function noop() { }
