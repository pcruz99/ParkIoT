// const BACKEND_SERVER = 'http://127.0.0.1:8000';
const BACKEND_SERVER = 'http://10.10.10.104:8000';
// const BACKEND_SERVER = 'http://192.168.1.8:8000';
const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '',
  defaultPath: '/',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  API_SERVER: BACKEND_SERVER
};

export default config;
