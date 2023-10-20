import moment from 'moment';
import { formatCurrency } from '../utils/currency.util';
import { removeTrailingChar } from '../utils/string.util';

export const IANService = {

  /**
   *
   * @param {object} dataBody
   * @param {string} dataBody.sourceModule
   * @param {string} dataBody.type
   * @param {object} dataBody.content
   * @param {string} dataBody.content.fullname
   * @param {string} dataBody.content.currency
   * @param {string} dataBody.content.billNumber
   * @param {string} dataBody.content.amount
   * @param {string} dataBody.content.contact
   * @param {string} dataBody.redirectTo
   */
  async setIAN(dataBody) {
    let message = '';
    let icon = '';
    switch (dataBody.type) {
      // ################# BUSINESS ACCOUNT MODULE ################
      case 'RECEIVE_FUNDS':
        if (dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.accountName !== '' && dataBody.content.payerName !== '') {
          const sanitizedPayerName = removeTrailingChar(dataBody.content.payerName, '.');
          message = `${dataBody.content.accountName} have received ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} from ${sanitizedPayerName}.`;
          icon = {
            imagePath: 'notification-money2.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'INSUFFICIENT_BALANCE':
        if (dataBody.content.currency !== '' && dataBody.content.amount !== '') {
          message = `This is a low balance reminder. Your ${dataBody.content.currency} balance is now ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)}. Please top-up your account.`;
          icon = {
            imagePath: 'notification-balance.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'RFI_REQUEST':
        message = 'We need additional information to process your KYB. Please look out for our email. ';
        icon = {
          imagePath: 'notification-eyes.svg',
          imageAlt: 'beanto'
        };
        break;
        // ################# END BUSINESS ACCOUNT MODULE ################

        // ################# TRANSFER MODULE ################
      case 'LOCAL_TRANSFER_REQUESTED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, needs your approval for initiated transfer of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'LOCAL_TRANSFER_APPROVED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, has approved the transaction of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'LOCAL_TRANSFER_DECLINED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, has declined the transaction of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request-red.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'LOCAL_TRANSFER_REJECTED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          message = 'Your transaction got rejected. Please try again.';
          icon = {
            imagePath: 'notification-request-red.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'LOCAL_TRANSFER_COMPLETED':
        if (dataBody.content.fullname !== ''
            && dataBody.content.sourceCurrency !== ''
            && dataBody.content.sourceAmount !== ''
            && dataBody.content.destinationCurrency !== ''
            && dataBody.content.destinationAmount !== ''
            && dataBody.content.balance !== ''
            && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `Congratulations! Your transfer to ${sanitizedContact} has been completed.\n\nHere is a summary of your transaction: You sent ${dataBody.content.sourceCurrency} ${formatCurrency(dataBody.content.sourceAmount)}\nRecipient gets ${dataBody.content.destinationCurrency} ${formatCurrency(dataBody.content.destinationAmount)}\n\nYour ${dataBody.content.sourceCurrency} balance is now ${formatCurrency(dataBody.content.balance)}`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'LOCAL_TRANSFER_SCHEDULE':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '' && dataBody.content.reference !== '' && dataBody.content.scheduledDate !== '') {
          message = `${dataBody.content.fullname.trim()}, has scheduled a transfer of  ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${dataBody.content.contact}, with reference ${dataBody.content.reference}, to be transferred on ${moment(dataBody.content.scheduledDate).format('DD MMM YYYY')}.`;
          icon = {
            imagePath: 'notification-card.svg',
            imageAlt: 'beanto'
          };
        }
        break;

      case 'LOCAL_TRANSFER_SCHEDULE_COMPLETED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          message = `${dataBody.content.fullname.trim()}, has made a transfer of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${dataBody.content.contact}.`;
          icon = {
            imagePath: 'notification-card.svg',
            imageAlt: 'beanto'
          };
        }
        break;

      case 'FX_TRANSFER_REQUESTED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, need your approval for initiated a FX transfer of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request-fx.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_APPROVED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, has approved the FX transaction of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request-fx.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_DECLINED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.fullname.trim()}, has declined the FX transaction of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}.`;
          icon = {
            imagePath: 'notification-request-fx-red.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_REJECTED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          message = 'Your transaction got rejected. Please try again.';
          icon = {
            imagePath: 'notification-request-fx-red.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_COMPLETED':
        if (dataBody.content.fullname !== ''
          && dataBody.content.sourceCurrency !== ''
          && dataBody.content.sourceAmount !== ''
          && dataBody.content.destinationCurrency !== ''
          && dataBody.content.destinationAmount !== ''
          && dataBody.content.contact !== ''
          && dataBody.content.fxRate !== ''
          && dataBody.content.balance !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `Congratulations! Your transfer to ${sanitizedContact}. has been completed.\n\nHere is a summary of your transaction:\nYou sent ${dataBody.content.sourceCurrency} ${formatCurrency(dataBody.content.sourceAmount)}\nRecipient gets ${dataBody.content.destinationCurrency} ${formatCurrency(dataBody.content.destinationAmount)}\nExchange rate: ${dataBody.content.fxRate}\n\nYour ${dataBody.content.sourceCurrency} balance is now ${formatCurrency(dataBody.content.balance)}`;
          icon = {
            imagePath: 'notification-request-fx.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_SCHEDULE':
        if (dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          message = `You have transferred  ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${dataBody.content.contact}. Click here to see receipt.`;
          icon = {
            imagePath: 'notification-handCash.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'FX_TRANSFER_SCHEDULE_COMPLETED':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          message = `You have transferred  ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${dataBody.content.contact}. Click here to see receipt.`;
          icon = {
            imagePath: 'notification-handCash.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'TRANSFER_RFI_REQUESTED':
        if (dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `We need additional information to process your transfer of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} to ${sanitizedContact}. Please try again and provide more details.`;
          icon = {
            imagePath: 'notification-rfi.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'DEPOSIT_RECEIVED':
        if (dataBody.content.currency && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedFullName = removeTrailingChar(dataBody.content.fullname, '.');
          message = `Check it out! You have received ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} from ${sanitizedFullName || 'Unknown'}.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'BILL_PAID':
        if (dataBody.content.fullname) {
          const sanitizedFullName = removeTrailingChar(dataBody.content.fullname.trim(), '.');
          if (dataBody.content.billNumber) {
            message = `Success! ${dataBody.content.billNumber} has been paid successfully to ${sanitizedFullName}.`;
          }
          else {
            message = `Success! Bill has been paid successfully to ${sanitizedFullName}.`;
          }
          icon = {
            imagePath: 'notification-bill.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'TRANSFER_SUBMITTED':
        if (dataBody.content.fullname !== ''
            && dataBody.content.sourceCurrency !== ''
            && dataBody.content.sourceAmount !== ''
            && dataBody.content.destinationCurrency !== ''
            && dataBody.content.destinationAmount !== ''
            && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `Your transfer to ${sanitizedContact} has been submitted.\n\nHere is a summary of your transaction: You sent ${dataBody.content.sourceCurrency} ${formatCurrency(dataBody.content.sourceAmount)}\nRecipient gets ${dataBody.content.destinationCurrency} ${formatCurrency(dataBody.content.destinationAmount)}.\n\nKindly note that the transfer is still pending approval.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'ACTION_ON_SUBMITTED_TRANSFER':
        if (dataBody.content.fullname !== '' && dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `You have a pending transfer approval request from ${dataBody.content.fullname.trim()} of ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)} payable to ${sanitizedContact}.\nPlease review the transfer submission and take appropriate action.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
        // ################# END TRANSFER MODULE ################
        // ################# BILL MODULE ########################
      case 'BILL_PAY_SUBMITTED':
        if (dataBody.content.currency !== '' && dataBody.content.amount !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `Your bill payment to ${sanitizedContact} has been submitted. Here is a summary of your transaction: ${dataBody.content.currency} ${formatCurrency(dataBody.content.amount)}\nKindly note that the bill payment is still pending approval.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'ACTION_ON_SUBMITTED_BILL_PAY':
        if (dataBody.content.fullname !== ''
            && dataBody.content.billNumber !== ''
            && dataBody.content.sourceCurrency !== ''
            && dataBody.content.sourceAmount !== ''
            && dataBody.content.destinationCurrency !== ''
            && dataBody.content.destinationAmount !== ''
            && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `You have a pending bill pay approval request from ${dataBody.content.fullname.trim()} for ${dataBody.content.billNumber} payable to ${sanitizedContact}.\n\nHere is a summary of the transaction: We pay ${dataBody.content.sourceCurrency} ${formatCurrency(dataBody.content.sourceAmount)}.\nRecipient gets ${dataBody.content.destinationCurrency} ${formatCurrency(dataBody.content.destinationAmount)}.\n\nPlease review the bill pay submission and take appropriate action.`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'BILL_PAY_APPROVED':
        if (dataBody.content.billNumber !== '' && dataBody.content.contact !== '') {
          const sanitizedContact = removeTrailingChar(dataBody.content.contact, '.');
          message = `${dataBody.content.billNumber} to ${sanitizedContact} has been approved`;
          icon = {
            imagePath: 'notification-request.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'NEW_ONBOARDED':
        if (dataBody.content.fullname !== '' && dataBody.content.user !== '') {
          message = `${dataBody.content.fullname.trim()} added ${dataBody.content.newUser} as a user. Click here to see details.`;
          icon = {
            imagePath: 'notification-user.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'RESET_PIN_SUCCESS':
        message = 'You have successfully reset your PIN.';
        icon = {
          imagePath: 'notification-user.svg',
          imageAlt: 'beanto'
        };
        break;

      case 'WEEKLY_INVOICE_REPORT':
        if (dataBody.content.accountName !== '' && dataBody.content.numberOverdueInvoice !== '' && dataBody.content.totalOverdueInvoiceAccount !== '') {
          message = `${dataBody.content.accountName} has ${dataBody.content.numberOverdueInvoice} overdue invoices for a total of ${formatCurrency(dataBody.content.totalOverdueInvoiceAccount)}.`;
          icon = {
            imagePath: 'notification-money.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'WEEKLY_BILL_REPORT':
        if (dataBody.content.accountName !== '' && dataBody.content.numberActionRequiredBills !== '' && dataBody.content.numberDraftBill !== '') {
          message = `${dataBody.content.accountName} has ${dataBody.content.numberActionRequiredBills}${dataBody.content.numberDraftBill} bills requiring your action.`;
          icon = {
            imagePath: 'notification-card.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'CONTACT_UPDATED':
        if (dataBody.content.fullname && dataBody.content.contact) {
          const sanitizedContactName = removeTrailingChar(dataBody.content.contact.generalInfoDetail.contactName, '.');
          message = `${dataBody.content.fullname.trim()} has updated the bank details on payee ${sanitizedContactName}.`;
          icon = {
            imagePath: 'notification-contact.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      case 'CONTACT_ADDED':
        if (dataBody.content.fullname && dataBody.content.contact) {
          const sanitizedContactName = removeTrailingChar(dataBody.content.contact.generalInfoDetail.contactName, '.');
          message = `${dataBody.content.fullname.trim()} has added a New Payee ${sanitizedContactName}.`;
          icon = {
            imagePath: 'notification-contact.svg',
            imageAlt: 'beanto'
          };
        }
        break;
      default:
        break;
    }
    return { message, icon };
  }

};

export function noop() {}
