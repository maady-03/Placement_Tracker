// Onboarding is considered done once these three fields exist.
export const isProfileComplete = (user) =>
  Boolean(
    user?.profile?.college &&
      user?.profile?.branch &&
      user?.profile?.graduationYear
  );