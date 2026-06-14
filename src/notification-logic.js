(function notificationLogicModule(root, factory) {
  const notificationLogic = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = notificationLogic;
  } else {
    root.NotificationLogic = notificationLogic;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createNotificationLogic() {
  "use strict";

  function createSuccessfulCreationAnnouncement(previousSequence = 0) {
    const sequence = previousSequence + 1;

    return {
      sequence,
      visualMessage: "Academic Task added successfully.",
      accessibleMessage: `Academic Task added successfully. Confirmation ${sequence}.`
    };
  }

  function createSuccessfulDeletionAnnouncement(previousSequence = 0) {
    const sequence = previousSequence + 1;

    return {
      sequence,
      visualMessage: "Academic Task deleted successfully.",
      accessibleMessage: `Academic Task deleted successfully. Confirmation ${sequence}.`
    };
  }

  return {
    createSuccessfulCreationAnnouncement,
    createSuccessfulDeletionAnnouncement
  };
}));
