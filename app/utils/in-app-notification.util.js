import _ from 'lodash';
import { UsersFunc } from '../functions/auth/users.function';
import { InAppNotificationFunc } from '../functions/notification/in-app-notification.function';
import { OrganizationFunc } from '../functions/auth/organization.function';
import { formatCurrency } from './currency.util';

export const IAN_EVENT_TYPE = {
  CARD_ISSUED: 'CARD_ISSUED',
  CARD_FROZEN: 'CARD_FROZEN',
  CARD_UNFROZEN: 'CARD_UNFROZEN',
  CARD_LIMIT_CHANGED: 'CARD_LIMIT_CHANGED',
  CARD_POS_APPROVED: 'CARD_POS_APPROVED',
  CARD_TRANSACTION_FAILED: 'CARD_TRANSACTION_FAILED'
};

// the type that need to be stored to database and consumed by frontend
const IAN_TYPE = {
  CARD_UPDATED: 'CARD_UPDATED',
  CARD_ISSUED: 'CARD_ISSUED',
  CARD_TRANSACTION: 'CARD_TRANSACTION'
};

const IAN_RECEIVER = {
  OWNER: 'OWNER',
  ROLE_APPROVER: 'ROLE_APPROVER',
  ROLE_BASIC: 'ROLE_BASIC',
  ROLE_FINANCE: 'ROLE_FINANCE'
};

const IAN_SOURCE_MODULE = {
  CARD_MODULE: 'Card Module'
};
// can be stored to database later
const IAN_RULES = [
  {
    eventType: IAN_EVENT_TYPE.CARD_ISSUED,
    type: IAN_TYPE.CARD_ISSUED,
    receivers: [IAN_RECEIVER.ROLE_APPROVER, IAN_RECEIVER.ROLE_FINANCE],
    template: '{currentUser.fullName} has issued a card ending {payload.card.lastFourDigits} to {owner.fullName}',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards',
    targetId: null,
    isExcludeWhenOwner: false
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_FROZEN,
    type: IAN_TYPE.CARD_UPDATED,
    receivers: [IAN_RECEIVER.ROLE_APPROVER, IAN_RECEIVER.ROLE_FINANCE],
    template: '{owner.fullName}\'s card ending {payload.card.lastFourDigits} has been Frozen',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '#',
    targetId: null,
    isExcludeWhenOwner: true
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_FROZEN,
    type: IAN_TYPE.CARD_UPDATED,
    receivers: [IAN_RECEIVER.OWNER],
    template: 'Your card ending {payload.card.lastFourDigits} has been Frozen',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id'
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_UNFROZEN,
    type: IAN_TYPE.CARD_UPDATED,
    receivers: [IAN_RECEIVER.ROLE_APPROVER, IAN_RECEIVER.ROLE_FINANCE],
    template: '{owner.fullName}\'s card ending {payload.card.lastFourDigits} has been successfully unfrozen',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id',
    isExcludeWhenOwner: true
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_UNFROZEN,
    type: IAN_TYPE.CARD_UPDATED,
    receivers: [IAN_RECEIVER.OWNER],
    template: 'Your card ending {payload.card.lastFourDigits} has been successfully unfrozen',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id'
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_LIMIT_CHANGED,
    type: IAN_TYPE.CARD_UPDATED,
    receivers: [IAN_RECEIVER.OWNER],
    template: 'Your card limit for card ending {payload.card.lastFourDigits} has been changed to {payload.card.currency} {formatCurrency(payload.card.monthlyLimit)}',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id'
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_POS_APPROVED,
    type: IAN_TYPE.CARD_TRANSACTION,
    receivers: [IAN_RECEIVER.OWNER],
    template: 'You have paid {payload.card.currency} {formatCurrency(payload.transaction.sourceAmount)} to {payload.transaction.merchantName} on card ending {payload.card.lastFourDigits}.\n\nYour card balance is now {payload.card.currency} {formatCurrency(payload.transaction.walletBalance)}',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id'
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_POS_APPROVED,
    type: IAN_TYPE.CARD_TRANSACTION,
    receivers: [IAN_RECEIVER.ROLE_APPROVER, IAN_RECEIVER.ROLE_FINANCE],
    template: '{payload.cardHolderName} has paid {payload.card.currency} {formatCurrency(payload.transaction.sourceAmount)} to {payload.transaction.merchantName} on card ending {payload.card.lastFourDigits}.',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '/cards/details/{payload.card._id}',
    targetId: 'payload.card._id',
    isExcludeWhenOwner: true
  },
  {
    eventType: IAN_EVENT_TYPE.CARD_TRANSACTION_FAILED,
    type: IAN_TYPE.CARD_TRANSACTION,
    receivers: [IAN_RECEIVER.OWNER],
    template: 'Opps! Your payment of {payload.card.currency} {formatCurrency(payload.transaction.sourceAmount)} to {payload.transaction.merchantName} on card ending {payload.card.lastFourDigits} has failed. Please try again.',
    iconName: 'notification-card.svg',
    sourceModule: IAN_SOURCE_MODULE.CARD_MODULE,
    redirectToTemplate: '#',
    targetId: null
  }
];
export const InAppNotificationUtil = {
  sendIAN: async ({
    eventType, currentUser, ownerId, payload, organization, organizationId
  }) => {
    const regex = /{([^}]+)}/g;
    const regexFunction = /{(\w+)\(([\w.,\s]+)\)}/g;
    let currentOrganization = organization;
    if (!currentOrganization && organizationId) {
      currentOrganization = await OrganizationFunc.findById(organizationId);
    }

    const registeredFunction = {
      formatCurrency
    };

    const data = {
      currentUser,
      payload,
      organization: currentOrganization
    };
    if (ownerId) {
      data.owner = await UsersFunc.findOne(ownerId);
    }

    const inAppNotifications = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const rule of IAN_RULES) {
      let parsedTemplate = rule.template;
      if (rule.eventType === eventType) {
        // parse message template
        // parse function
        let matchFunction = regexFunction.exec(parsedTemplate);
        // Remove this line: let match;
        while (matchFunction) {
          const functionName = matchFunction[1];
          const argument = matchFunction[2];
          if (registeredFunction[functionName]) {
            const parameters = [];
            const argumentList = argument.split(',');
            // eslint-disable-next-line no-restricted-syntax
            for (const arg of argumentList) {
              const trimmedArg = arg.trim();
              const value = _.get(data, trimmedArg, null);
              parameters.push(value);
            }
            const result = registeredFunction[functionName](...parameters);
            parsedTemplate = parsedTemplate.replace(matchFunction[0], result);
          }
          matchFunction = regexFunction.exec(parsedTemplate);
        }
        let matches = parsedTemplate.match(regex);
        if (matches) {
          matches = matches.map((match) => match.slice(1, -1));
          // eslint-disable-next-line no-restricted-syntax
          for (const match of matches) {
            const value = _.get(data, match, null);
            parsedTemplate = parsedTemplate.replace(`{${match}}`, value);
          }
        }

        // parse redirectToTemplate
        let parsedRedirectToTemplate = rule.redirectToTemplate;
        let matchesRedirectToTemplate = parsedRedirectToTemplate.match(regex);
        if (matchesRedirectToTemplate) {
          matchesRedirectToTemplate = parsedRedirectToTemplate
            .match(regex).map((match) => match.slice(1, -1));
          // eslint-disable-next-line no-restricted-syntax
          for (const match of matchesRedirectToTemplate) {
            const value = _.get(data, match, null);
            parsedRedirectToTemplate = parsedRedirectToTemplate.replace(`{${match}}`, value);
          }
        }

        // generate receiverIds
        const receiverIds = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const receiver of rule.receivers) {
          if (receiver === IAN_RECEIVER.OWNER) {
            receiverIds.push(ownerId.toString());
          }
          else if (receiver.startsWith('ROLE_')) {
            // receiver is role based
            const roleName = receiver.slice(5);
            if (rule.isExcludeWhenOwner && ownerId) {
              data.organization.users.forEach((user) => {
                if (
                  user.role === roleName
                  && user.userId.toString() !== ownerId.toString()
                  && user.status === 'ACTIVE'
                ) {
                  receiverIds.push(user.userId.toString());
                }
              });
            }
            else {
              data.organization.users.forEach((user) => {
                if (user.role === roleName && user.status === 'ACTIVE') {
                  receiverIds.push(user.userId.toString());
                }
              });
            }
          }
        }

        const createdBy = currentUser ? currentUser.emailAddress : 'null@mail.com';
        const result = {
          message: parsedTemplate,
          sourceModule: rule.sourceModule,
          type: rule.type,
          redirectTo: parsedRedirectToTemplate,
          icon: {
            imagePath: rule.iconName,
            imageAlt: 'beanto'
          },
          targetId: rule.targetId ? _.get(data, rule.targetId, null) : null,
          usersId: receiverIds,
          createdBy,
          organizationId: data.organization._id.toString()
        };

        inAppNotifications.push(result);
      }
    }

    await InAppNotificationFunc.createMany(inAppNotifications);
  }
};

export default InAppNotificationUtil;
