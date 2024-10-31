import RolesEnum from "../enum/RolesEnum"

type ACLpermissionType = {
    role: RolesEnum;
    allows: {
        resource: string;
        methods:
            | "*"
            | "GET"
            | "PATCH"
            | "POST"
            | "DELETE"
            | ("GET" | "PATCH" | "POST" | "DELETE")[];
    }[];
};

export default ACLpermissionType