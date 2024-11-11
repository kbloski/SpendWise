import { Router } from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import { UserRoles } from '../types/BudgetShareType';

const router = Router();

router.get(
    buildApiPath('roles'),
    async (req, res) => {
        try {
            const roles : {name: string, priority: number}[] =  [
                {
                    name: UserRoles[ UserRoles.ADMIN ],
                    priority: UserRoles.ADMIN
                },
                {
                    name: UserRoles[ UserRoles.EDITOR ],
                    priority: UserRoles.EDITOR
                },
                {
                    name: UserRoles[ UserRoles.VIEWER ],
                    priority: UserRoles.VIEWER
                },
            ]
            sendSuccessResponse(res, 200, { roles })
        } catch ( err ){
            sendErrorResponse(res, 500)
        }
    }
)


export default router;