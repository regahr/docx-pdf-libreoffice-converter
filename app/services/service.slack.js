import config from '../configs/env.config';
import httpUtil from '../utils/http.util';
import { slackFormat, slackFormatNiumError } from '../utils/payload.utils';
import { protocol } from '../variables/common.variable';

export async function postError(req, name, priority, message) {
  const payload = {
    error: {
      name,
      priority,
      message
    },
    data: {
      params: req.params, query: req.query, body: req.body, file: req.file
    },
    url: `${protocol.HTTP
    }${config.app.host
    }:${config.app.port
    }${req.originalUrl}`,
    method: req.method,
    req
  };
  return httpUtil.POST(config.slack.url,
    'SLACK_INTEGRATION',
    slackFormat(payload),
    `/${config.slack.idOne}/${config.slack.idTwo}/${config.slack.accessToken}`)
    .catch(() => { });
}

export async function postNiumError({
  organizationId,
  organizationName,
  niumWalletId,
  niumApi,
  niumResponse
}) {
  const payload = {
    organizationName: typeof organizationName === 'function' ? organizationName() : organizationName,
    niumApi,
    niumResponse,
    metadata: {
      organizationId: typeof organizationId === 'function' ? organizationId() : organizationId,
      niumWalletId
    }
  };
  return httpUtil.POST(config.slack.url,
    'SLACK_INTEGRATION',
    slackFormatNiumError(payload),
    `/${config.slack.idOne}/${config.slack.niumError.channelId}/${config.slack.niumError.accessToken}`)
    .catch(() => {});
}

export function noop() { }
