export const cronCheck = async ({ nextMiddleware, store }) => {
  const user = store.getters["user/user"];

  const currentDateInSeconds = Date.now().toString().substring(0, 10);
  const lastActiveAtInSeconds = user.lastActiveAt
    ? user.lastActiveAt.seconds
    : currentDateInSeconds;
  const diff = +currentDateInSeconds - +lastActiveAtInSeconds;
  const timePassed = Math.round(diff / 60);

  console.log(timePassed);

  store.dispatch("user/updateLastActivityTime", user.uid).catch((error) => {
    console.log(error);
  });

  nextMiddleware();
};
