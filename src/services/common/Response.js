const json = (messages, code = 200, success = true) => ({
  success: success,
  status_code: code,
  [success ? 'data' : 'error']: messages,
});

const Response = {
  success: (messages, code) => json(messages, code),
  error: (messages, code) => json(messages, code, false),
};

export default Response;
