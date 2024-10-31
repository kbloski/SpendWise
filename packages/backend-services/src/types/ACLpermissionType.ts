import RolesEnum from "../enum/RolesEnum";

type ACLpermissionType = {
    role: RolesEnum;
    allows: {
        resource: string;
        methods:
            | "*"
            | "GET"
            | "POST"
            | "PUT"
            | "PATCH"
            | "DELETE"
            | ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")[];
    }[];
};

export default ACLpermissionType;
