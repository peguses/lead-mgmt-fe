enum Permission {

    CREATE_USER = "ADD_USER",
    DELETE_USER = "DELETE_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_APPLICATION = "DELETE_APPLICATION",
    ASSIGN_APPLICATION = "ASSIGN_APPLICATION",
    VIEW_APPLICATION = "VIEW_APPLICATION",
    UPDATE_APPLICATION = "UPDATE_APPLICATION",
    UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT",
    
}

enum IRole {
    admin = "ADMIN",
    processingOfficer = "PROCESSING_OFFICER",
    referrer = "REFERRER"
}

export interface Role {
    role: IRole;
    permissions: Permission[]
}