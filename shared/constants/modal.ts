export const MSG_COLOR = [
  {
    color: '#860A35',
  },
  {
    color: '#860A35',
  },
  {
    color: '#AF2655',
  },
  {
    color: '#FF0000',
  },
  {
    color: '#EE9322',
  },
  {
    color: '#ffae00',
  },
  {
    color: '#c8cf5c',
  },
  {
    color: '#95af54',
  },
  {
    color: '#1f831f',
  },
  {
    color: '#016A70',
  },
  {
    color: '#22668D',
  },
  {
    color: '#0E21A0',
  },
  {
    color: '#313866',
  },
  {
    color: '#504099',
  },
  {
    color: '#974EC3',
  },
  {
    color: '#9F0D7F',
  },
] as const;

const MODAL_TYPE = {
  INTRODUCE: 'Intro',
  MESSAGE: 'Message',
  FORM: 'Form',
  ALL_MESSAGE: 'AllMessage',
  PRIVATE: 'Private',
  MESSAGE_SUBMIT: 'MessageSubmit',
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export default MODAL_TYPE;
