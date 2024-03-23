import ROLES from "~/constants/roles";

function roleIdGenerator(idPermissions: number[]) {
    let roleId: number = 0;
    ROLES.forEach((role) => {
        if (role.idPermissions.length === idPermissions.length) {
            roleId = role.id;
        }
    });
    return roleId;
}

export default roleIdGenerator;
