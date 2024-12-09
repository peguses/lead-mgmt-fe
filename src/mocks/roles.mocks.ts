export const roles = [
  {
    name: "Admin",
    role: "ADMIN",
    permissions: [
      "ADD_USER",
      "DELETE_USER",
      "UPDATE_USER",
      "DELETE_APPLICATION",
      "ASSIGN_APPLICATION",
      "VIEW_APPLICATION",
      "UPDATE_APPLICATION",
      "UPLOAD_DOCUMENT",
    ],
  },
  {
    name: "Processing Officer",
    role: "PROCESSING_OFFICER",
    permissions: [
      "ASSIGN_APPLICATION",
      "VIEW_APPLICATION",
      "UPDATE_APPLICATION",
      "UPLOAD_DOCUMENT",
    ],
  },
  {
    name: "Referrer",
    role: "REFERRER",
    permissions: [
      "DELETE_APPLICATION",
      "ASSIGN_APPLICATION",
      "VIEW_APPLICATION",
      "UPDATE_APPLICATION",
      "UPLOAD_DOCUMENT",
    ],
  },
];
