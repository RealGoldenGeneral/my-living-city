export const __prod__ = process.env.NODE_ENV === 'production';
export const API_BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:3001'

export const ROUTES = {
  LANDING: '/',
  CONVERSATIONS: '/ideas',
  SINGLE_IDEA: '/ideas/:ideaId',
  SUBMIT_IDEA: '/submit',
  LOGIN: '/login',
  REGISTER: '/register',
  USER_PROFILE: '/profile',
  TEST_PAGE: '/test',
  TEAM404: '/*',
}