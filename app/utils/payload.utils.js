import { isEmpty, result } from 'lodash';
import moment from 'moment';
import { colors, images } from '../variables/common.variable';

export function slackFormat(payload = {}) {
  const { req } = payload;
  let headers = {};
  if (!isEmpty(req) && result(req, 'headers', '')) {
    let ipAddr;

    // IP not available on localhost mode.
    // reference : https://stackoverflow.com/questions/10799346/get-remote-ip-adress-not-working-on-node
    if (process.env.NODE_ENV === 'dev') ipAddr = 'localhost';
    else ipAddr = req.headers['x-forwarded-for'];

    if (ipAddr) {
      const list = ipAddr.split(',');
      ipAddr = list[list.length - 1];
    }
    else ipAddr = req.connection.remoteAddress;
    headers = { ...headers, ...req.headers, ipAddr };
  }

  const fields = [
    ...(req.credentials ? [{
      title: 'Logged in Detail',
      value: `\`\`\`${JSON.stringify({ id: req.credentials.user._id, email: req.credentials.user.emailAddresses.join(', '), organizationName: result(req.credentials, 'organization.companyName', '-') }, null, 2)}\`\`\``,
      short: false
    }] : []),
    {
      title: 'Priority',
      value: `\`\`\`${payload.error.priority.toUpperCase()}\`\`\``,
      short: false
    }, {
      title: 'API Name',
      value: `\`\`\`${payload.error.name}\`\`\``,
      short: false
    }, {
      title: 'Error Message',
      value: `\`\`\`${JSON.stringify(payload.error.message)}\`\`\``,
      short: false
    }, {
      title: 'Request Body',
      value: `\`\`\`${JSON.stringify(payload.data)}\`\`\``,
      short: false
    }, {
      title: 'Request Headers',
      value: `\`\`\`${JSON.stringify(headers)}\`\`\``,
      short: false
    }];

  if (req.errorStack) {
    fields.push({
      title: 'Error Stack',
      value: `\`\`\`${req.errorStack}\`\`\``,
      short: false
    });
  }

  return {
    icon_url: images[payload.error.priority],
    username: 'Slack Bugs Notification',
    attachments: [{
      color: colors[payload.error.priority],
      pretext: `Finance API:\n${payload.method} <${payload.url}>`,
      fields,
      thumb_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
      footer: 'Rega Halma Ruzty',
      footer_icon: 'https://avatars.githubusercontent.com/u/90163540?s=48&v=4',
      ts: moment().unix()
    }]
  };
}

export function slackFormatNiumOnboardingJourney(payload = {}) {
  return {
    icon_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
    username: 'Nium Onboarding Journey Notification',
    attachments: [{
      color: '#18C1D3',
      pretext: 'Grof API ',
      fields: [
        {
          title: 'UEN',
          value: `\`\`\`${payload.uen}\`\`\``,
          short: false
        },
        {
          title: 'Organization Name',
          value: `\`\`\`${payload.organizationName}\`\`\``,
          short: false
        }, {
          title: 'Nium Response',
          value: `\`\`\`${JSON.stringify(payload.niumResponse)}\`\`\``,
          short: false
        }, {
          title: 'Metadata',
          value: `\`\`\`${JSON.stringify(payload.metadata)}\`\`\``,
          short: false
        }],
      thumb_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
      footer: 'Rega Halma Ruzty',
      footer_icon: 'https://avatars.githubusercontent.com/u/90163540?s=48&v=4',
      ts: moment().unix()
    }]
  };
}

export function slackFormatNiumError(payload = {}) {
  return {
    icon_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
    username: 'Nium Error Notification',
    attachments: [{
      color: '#18C1D3',
      pretext: 'Grof API ',
      fields: [
        {
          title: 'Organization Name',
          value: `\`\`\`${payload.organizationName}\`\`\``,
          short: false
        },
        {
          title: 'Nium API',
          value: `\`\`\`${payload.niumApi}\`\`\``,
          short: false
        }, {
          title: 'Nium Response',
          value: `\`\`\`${payload.niumResponse}\`\`\``,
          short: false
        }, {
          title: 'Metadata',
          value: `\`\`\`${JSON.stringify(payload.metadata)}\`\`\``,
          short: false
        }],
      thumb_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
      footer: 'Rega Halma Ruzty',
      footer_icon: 'https://avatars.githubusercontent.com/u/90163540?s=48&v=4',
      ts: moment().unix()
    }]
  };
}

export function noop() {}
