export const apiEndpoints = {
  auth: {
    login: '/login',
    logout: '/logout',
    profile: '/profile',
  },
  members: {
    all: '/members/',
    detail: function (memberId: number) {
      return `${this.all}${memberId}/`;
    },
  },
};
